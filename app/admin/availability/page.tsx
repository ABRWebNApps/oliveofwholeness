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
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

interface TimeSlot {
  start: string;
  end: string;
}

interface AvailableDate {
  id: string;
  date: string;
  is_available: boolean;
  start_time?: string;
  end_time?: string;
  time_slots?: TimeSlot[];
}

export default function AvailabilitySettings() {
  const [availableDates, setAvailableDates] = useState<AvailableDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Time configuration state
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([
    { start: "09:00", end: "17:00" },
  ]);
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

      // Prefer time_slots, fallback to start_time/end_time
      if (existing.time_slots && existing.time_slots.length > 0) {
        setTimeSlots(existing.time_slots);
      } else if (existing.start_time && existing.end_time) {
        setTimeSlots([
          {
            start: existing.start_time.substring(0, 5),
            end: existing.end_time.substring(0, 5),
          },
        ]);
      } else {
        setTimeSlots([{ start: "09:00", end: "17:00" }]);
      }

      setIsDialogOpen(true);
    } else {
      // If new, open dialog to add
      setCurrentDateId(null);
      setTimeSlots([{ start: "09:00", end: "17:00" }]);
      setIsDialogOpen(true);
    }
  };

  const addTimeSlot = () => {
    setTimeSlots([...timeSlots, { start: "09:00", end: "17:00" }]);
  };

  const removeTimeSlot = (index: number) => {
    const newSlots = [...timeSlots];
    newSlots.splice(index, 1);
    setTimeSlots(newSlots);
  };

  const updateTimeSlot = (
    index: number,
    field: "start" | "end",
    value: string
  ) => {
    const newSlots = [...timeSlots];
    newSlots[index] = { ...newSlots[index], [field]: value };
    setTimeSlots(newSlots);
  };

  const saveAvailability = async () => {
    if (!selectedDate) return;

    try {
      setSaving(true);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");

      // Validate times
      if (timeSlots.length === 0) {
        toast.error("At least one time slot is required");
        setSaving(false);
        return;
      }

      for (const slot of timeSlots) {
        if (slot.start >= slot.end) {
          toast.error("Start time must be before end time for all slots");
          setSaving(false);
          return;
        }
      }

      // Overlap check (optional but good)
      // For now, let's just save.

      const payload = {
        date: formattedDate,
        is_available: true,
        // Keep these for backward compatibility if needed, using the first slot or overall range
        start_time: timeSlots[0].start,
        end_time: timeSlots[timeSlots.length - 1].end,
        time_slots: timeSlots,
      };

      const method = currentDateId ? "PATCH" : "POST";

      const res = await fetch("/api/admin/availability", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = errData.error || "Failed to save";
        console.error("Save availability error:", msg);
        throw new Error(msg);
      }

      await fetchAvailability();
      setIsDialogOpen(false);
      toast.success(
        currentDateId ? "Availability updated" : "Date added to availability"
      );
    } catch (error: any) {
      toast.error(error?.message || "Failed to save availability");
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
                        new Date(a.date + "T00:00:00").getTime() -
                        new Date(b.date + "T00:00:00").getTime()
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
                              {format(
                                new Date(item.date + "T00:00:00"),
                                "MMMM d, yyyy"
                              )}
                            </p>
                            <div className="text-xs text-muted-foreground">
                              {item.time_slots && item.time_slots.length > 0 ? (
                                item.time_slots.map((slot, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-1"
                                  >
                                    <Clock className="w-3 h-3" />
                                    {slot.start} - {slot.end}
                                  </div>
                                ))
                              ) : (
                                <div className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {item.start_time?.substring(0, 5)} -{" "}
                                  {item.end_time?.substring(0, 5)}
                                </div>
                              )}
                            </div>
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
            <div className="space-y-4">
              {timeSlots.map((slot, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-xs text-muted-foreground">
                      Slot {index + 1}
                    </Label>
                    {timeSlots.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-destructive"
                        onClick={() => removeTimeSlot(index)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor={`start-time-${index}`}>Start</Label>
                      <Input
                        id={`start-time-${index}`}
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          updateTimeSlot(index, "start", e.target.value)
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor={`end-time-${index}`}>End</Label>
                      <Input
                        id={`end-time-${index}`}
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          updateTimeSlot(index, "end", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="w-full"
                onClick={addTimeSlot}
              >
                <Plus className="mr-2 h-3 w-3" />
                Add Time Slot
              </Button>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            {currentDateId && (
              <Button
                variant="destructive"
                onClick={() => currentDateId && removeDate(currentDateId)}
                disabled={saving}
              >
                Remove Date
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
