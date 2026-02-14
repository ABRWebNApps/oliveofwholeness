"use client";

import { useState, useEffect } from "react";
import AdminProtection from "@/components/admin-protection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Loader2, Calendar as CalendarIcon, Check, X } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface AvailableDate {
  id: string;
  date: string;
  is_available: boolean;
}

export default function AvailabilitySettings() {
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await fetch("/api/admin/availability");
      const json = await res.json();

      // Handle both old and new data formats
      if (json.availability_dates) {
        setAvailableDates(json.availability_dates);
      } else if (json.dates) {
        setAvailableDates(json.dates);
      } else {
        setAvailableDates([]);
      }
    } catch (error) {
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  const toggleDate = async (date: Date) => {
    const formattedDate = format(date, "yyyy-MM-dd");

    // Check if date already exists
    const existing = availableDates.find((d) => d.date === formattedDate);

    try {
      setSaving(true);

      if (existing) {
        // Toggle existing date
        await fetch("/api/admin/availability", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formattedDate,
            is_available: !existing.is_available,
          }),
        });
      } else {
        // Add new available date
        await fetch("/api/admin/availability", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: formattedDate,
            is_available: true,
          }),
        });
      }

      fetchAvailability();
      toast.success("Availability updated");
    } catch (error) {
      toast.error("Failed to update availability");
    } finally {
      setSaving(false);
    }
  };

  const removeDate = async (id: string) => {
    try {
      setSaving(true);
      await fetch(`/api/admin/availability?id=${id}`, {
        method: "DELETE",
      });
      fetchAvailability();
      toast.success("Date removed");
    } catch (error) {
      toast.error("Failed to remove date");
    } finally {
      setSaving(false);
    }
  };

  // Get set of available date strings for calendar highlighting
  const availableDateStrings = new Set(
    availableDates.filter((d) => d.is_available).map((d) => d.date)
  );

  const unavailableDateStrings = new Set(
    availableDates.filter((d) => !d.is_available).map((d) => d.date)
  );

  if (loading) {
    return (
      <AdminProtection>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </AdminProtection>
    );
  }

  return (
    <AdminProtection>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Availability Settings
          </h1>
          <p className="text-muted-foreground">
            Click dates on the calendar to mark them as available or unavailable
            for bookings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Card */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" />
                Select Dates
              </CardTitle>
              <CardDescription>
                Click a date to toggle its availability status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date);
                      toggleDate(date);
                    }
                  }}
                  className="rounded-2xl border p-4"
                  modifiers={{
                    available: (date) =>
                      availableDateStrings.has(format(date, "yyyy-MM-dd")),
                    unavailable: (date) =>
                      unavailableDateStrings.has(format(date, "yyyy-MM-dd")),
                  }}
                  modifiersStyles={{
                    available: {
                      backgroundColor: "rgb(34 197 94 / 0.2)",
                      color: "rgb(22 163 74)",
                      fontWeight: "bold",
                    },
                    unavailable: {
                      backgroundColor: "rgb(239 68 68 / 0.2)",
                      color: "rgb(220 38 38)",
                      fontWeight: "bold",
                      textDecoration: "line-through",
                    },
                  }}
                  disabled={saving}
                />
              </div>

              {/* Legend */}
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-600"></div>
                  <span className="text-muted-foreground">Available</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-4 h-4 rounded-full bg-red-500/20 border border-red-600"></div>
                  <span className="text-muted-foreground">Unavailable</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dates List */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Marked Dates</CardTitle>
              <CardDescription>
                All dates you've marked as available or unavailable
              </CardDescription>
            </CardHeader>
            <CardContent className="max-h-[500px] overflow-y-auto">
              {availableDates.length > 0 ? (
                <div className="space-y-2">
                  {availableDates
                    .sort(
                      (a, b) =>
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                    )
                    .map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-xl border bg-card/50 hover:bg-card transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          {item.is_available ? (
                            <div className="p-2 rounded-lg bg-green-500/10">
                              <Check className="h-4 w-4 text-green-600" />
                            </div>
                          ) : (
                            <div className="p-2 rounded-lg bg-red-500/10">
                              <X className="h-4 w-4 text-red-600" />
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-sm">
                              {format(new Date(item.date), "MMMM d, yyyy")}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {item.is_available
                                ? "Available for booking"
                                : "Unavailable"}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeDate(item.id)}
                          disabled={saving}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-sm">No dates marked yet</p>
                  <p className="text-xs mt-1">
                    Click dates on the calendar to get started
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminProtection>
  );
}
