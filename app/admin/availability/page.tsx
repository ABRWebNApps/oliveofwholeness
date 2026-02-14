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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Calendar as CalendarIcon,
  Check,
  X,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface AvailableDate {
  id: string;
  date: string;
  is_available: boolean;
  start_time: string;
  end_time: string;
}

export default function AvailabilitySettings() {
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Time configuration state
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [currentDateId, setCurrentDateId] = useState<string | null>(null);

  useEffect(() => {
    fetchAvailability();
  }, []);

  const fetchAvailability = async () => {
    try {
      const res = await fetch("/api/admin/availability");
      const json = await res.json();

      if (json.availability_dates) {
        setAvailableDates(json.availability_dates);
      } else {
        setAvailableDates([]);
      }
    } catch (error) {
      toast.error("Failed to load availability");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    setSelectedDate(date);
    const formattedDate = format(date, "yyyy-MM-dd");
    const existing = availableDates.find((d) => d.date === formattedDate);

    if (existing) {
      // If already exists, open dialog to edit/remove
      setCurrentDateId(existing.id);
      setStartTime(existing.start_time?.substring(0, 5) || "09:00");
      setEndTime(existing.end_time?.substring(0, 5) || "17:00");
      setIsDialogOpen(true);
    } else {
      // If new, open dialog to add
      setCurrentDateId(null);
      setStartTime("09:00");
      setEndTime("17:00");
      setIsDialogOpen(true);
    }
  };

  const saveAvailability = async () => {
    if (!selectedDate) return;

    try {
      setSaving(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Validate times
      if (startTime >= endTime) {
        toast.error("Start time must be before end time");
        setSaving(false);
        return;
      }

      const payload = {
        date: formattedDate,
        is_available: true,
        start_time: startTime,
        end_time: endTime,
      };

      const method = currentDateId ? "PATCH" : "POST";

      const res = await fetch("/api/admin/availability", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save");

      await fetchAvailability();
      setIsDialogOpen(false);
      toast.success(
        currentDateId ? "Availability updated" : "Date added to availability"
      );
    } catch (error) {
      toast.error("Failed to save availability");
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
      await fetchAvailability();
      setIsDialogOpen(false); // Close dialog if open
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
            Select dates to set availability hours. Click an existing date to
            edit times.
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
                Click a date to configure available hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-2xl border p-4"
                  modifiers={{
                    available: (date) =>
                      availableDateStrings.has(format(date, "yyyy-MM-dd")),
                  }}
                  modifiersStyles={{
                    available: {
                      backgroundColor: "rgb(34 197 94 / 0.2)",
                      color: "rgb(22 163 74)",
                      fontWeight: "bold",
                    },
                  }}
                  disabled={saving}
                />
              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center gap-2 text-sm">
                <div className="w-4 h-4 rounded-full bg-green-500/20 border border-green-600"></div>
                <span className="text-muted-foreground">Available</span>
              </div>
            </CardContent>
          </Card>

          {/* Dates List */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle>Marked Dates</CardTitle>
              <CardDescription>
                Upcoming available dates and times
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
                          <div className="p-2 rounded-lg bg-green-500/10">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">
                              {format(new Date(item.date), "MMMM d, yyyy")}
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {item.start_time?.substring(0, 5)} -{" "}
                              {item.end_time?.substring(0, 5)}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setSelectedDate(new Date(item.date));
                              handleDateSelect(new Date(item.date));
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeDate(item.id);
                            }}
                            disabled={saving}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p className="text-sm">No dates marked yet</p>
                  <p className="text-xs mt-1">
                    Click dates on the calendar to set availability
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Time Configuration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedDate
                ? format(selectedDate, "MMMM d, yyyy")
                : "Set Availability"}
            </DialogTitle>
            <DialogDescription>
              Set the available hours for this date.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="start-time">Start Time</Label>
                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="end-time">End Time</Label>
                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            {currentDateId && (
              <Button
                variant="destructive"
                onClick={() => currentDateId && removeDate(currentDateId)}
                disabled={saving}
              >
                Remove
              </Button>
            )}
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={saveAvailability} disabled={saving}>
                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminProtection>
  );
}
