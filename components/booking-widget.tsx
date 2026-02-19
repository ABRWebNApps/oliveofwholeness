"use client";

import { useState, useEffect } from "react";
import { format, startOfToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Loader2,
  AlertCircle,
  Clock3,
  CalendarCheck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Step = "service" | "datetime" | "details" | "confirmation";

interface AppointmentType {
  id: string;
  name: string;
  description: string;
  duration_minutes: number;
}

interface Slot {
  startTime: string;
  endTime: string;
  available: boolean;
}

export function BookingWidget() {
  const [step, setStep] = useState<Step>("service");
  const [types, setTypes] = useState<AppointmentType[]>([]);
  const [selectedType, setSelectedType] = useState<AppointmentType | null>(
    null
  );
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    startOfToday()
  );
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availableDates, setAvailableDates] = useState<Set<string>>(new Set());

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });

  // Fetch Appointment Types
  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch("/api/appointment-types");
        if (!res.ok) throw new Error("Failed to load services");
        const data = await res.json();
        setTypes(data);
      } catch (error) {
        toast.error("Could not load booking services");
      }
    }
    fetchTypes();
  }, []);

  // Fetch Available Dates from Admin Settings
  useEffect(() => {
    async function fetchAvailableDates() {
      try {
        const res = await fetch("/api/admin/availability");
        if (!res.ok) throw new Error("Failed to load availability");
        const data = await res.json();

        // Extract dates that are marked as available
        const dates = new Set(
          (data.availability_dates || [])
            .filter((d: any) => d.is_available)
            .map((d: any) => d.date)
        );
        setAvailableDates(dates);
      } catch (error) {
        console.error("Could not load available dates:", error);
      }
    }
    fetchAvailableDates();
  }, []);

  // Fetch Availability when Type or Date changes
  useEffect(() => {
    if (selectedType && selectedDate) {
      fetchAvailability();
    }
  }, [selectedDate, selectedType]);

  const fetchAvailability = async () => {
    if (!selectedDate || !selectedType) return;
    setLoading(true);
    setSelectedSlot(null);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const res = await fetch(
        `/api/availability?date=${formattedDate}&typeId=${selectedType.id}`
      );
      const data = await res.json();
      setSlots(data);
    } catch (error) {
      toast.error("Failed to load available slots");
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedType || !selectedDate || !selectedSlot) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          typeId: selectedType.id,
          date: format(selectedDate, "yyyy-MM-dd"),
          startTime: selectedSlot.startTime,
          endTime: selectedSlot.endTime,
          ...formData,
        }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Booking failed");
      }
      setStep("confirmation");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case "service":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-col items-center text-center space-y-1 mb-6">
              <h3 className="text-xl font-bold tracking-tight">
                Select a Service
              </h3>
              <p className="text-sm text-muted-foreground max-w-[350px]">
                Choose the session that best fits your journey.
              </p>
            </div>
            <div className="grid gap-3">
              {types.length > 0 ? (
                types.map((t) => (
                  <div
                    key={t.id}
                    onClick={() => {
                      setSelectedType(t);
                      setStep("datetime");
                    }}
                    className="flex items-center justify-between p-4 rounded-xl border bg-card/50 backdrop-blur-sm hover:shadow-md hover:border-primary/30 hover:bg-white dark:hover:bg-accent/10 transition-all cursor-pointer group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-base group-hover:text-primary transition-colors truncate">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {t.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          <Clock className="w-3 h-3 mr-1" />
                          {t.duration_minutes} Min
                        </span>
                      </div>
                    </div>
                    <div className="ml-4 p-2 rounded-full bg-secondary/10 group-hover:bg-primary transition-colors">
                      <ChevronRight className="w-4 h-4 text-primary group-hover:text-white transition-colors" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-secondary/5 rounded-2xl border-2 border-dashed border-muted-foreground/10">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-muted-foreground">
                    Loading services...
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case "datetime":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-500">
            <div className="flex flex-col items-start gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="pl-0 text-muted-foreground hover:text-primary h-8"
                onClick={() => setStep("service")}
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Back
              </Button>
              <h3 className="text-xl font-bold tracking-tight">
                Select Date & Time
              </h3>
            </div>

            <div className="flex flex-col gap-6">
              <div className="p-4 rounded-2xl bg-muted/30 border">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={(date) => {
                    const dateStr = format(date, "yyyy-MM-dd");
                    const isPast = date < startOfToday();
                    const isNotAvailable = !availableDates.has(dateStr);
                    return isPast || isNotAvailable;
                  }}
                  modifiers={{
                    available: (date) =>
                      availableDates.has(format(date, "yyyy-MM-dd")),
                  }}
                  modifiersStyles={{
                    available: {
                      backgroundColor: "rgb(34 197 94 / 0.15)",
                      color: "rgb(22 163 74)",
                      fontWeight: "bold",
                      border: "2px solid rgb(34 197 94 / 0.3)",
                    },
                  }}
                  className="p-0"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock3 className="w-4 h-4 text-primary" />
                    <span className="font-bold text-sm">Available Slots</span>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {selectedDate ? format(selectedDate, "MMM d") : "Today"}
                  </span>
                </div>

                {loading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">
                      Updating schedule...
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 overflow-y-auto max-h-[200px] scrollbar-hide pr-1">
                    {slots.length > 0 ? (
                      slots.map((slot) => (
                        <Button
                          key={slot.startTime}
                          variant={
                            selectedSlot?.startTime === slot.startTime
                              ? "default"
                              : "outline"
                          }
                          disabled={!slot.available}
                          className={cn(
                            "h-10 text-xs font-bold rounded-lg transition-all border",
                            !slot.available &&
                              "opacity-50 cursor-not-allowed bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground hover:border-border",
                            selectedSlot?.startTime === slot.startTime
                              ? "bg-primary text-primary-foreground border-primary shadow-sm"
                              : slot.available &&
                                  "hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                          )}
                          onClick={() =>
                            slot.available && setSelectedSlot(slot)
                          }
                        >
                          {slot.startTime.substring(0, 5)}
                        </Button>
                      ))
                    ) : (
                      <div className="col-span-full py-8 text-center text-muted-foreground bg-secondary/5 rounded-xl border border-dashed">
                        <p className="text-xs font-medium">
                          No slots available for this date.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <Button
                  className="w-full h-12 text-sm font-bold rounded-xl shadow-md group"
                  disabled={!selectedSlot || loading}
                  onClick={() => setStep("details")}
                >
                  {selectedSlot ? (
                    <>
                      Next: Your Details
                      <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  ) : (
                    "Pick a Time Slot"
                  )}
                </Button>
              </div>
            </div>
          </div>
        );

      case "details":
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-2 duration-500">
            <div className="flex flex-col items-start gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="pl-0 text-muted-foreground hover:text-primary h-8"
                onClick={() => setStep("datetime")}
              >
                <ChevronLeft className="w-3 h-3 mr-1" />
                Back
              </Button>
              <h3 className="text-xl font-bold tracking-tight">Your Details</h3>
            </div>

            <div className="flex flex-col gap-6">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="h-10 rounded-lg bg-background/50 border-muted focus:border-primary"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="h-10 rounded-lg bg-background/50 border-muted focus:border-primary"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label
                    htmlFor="notes"
                    className="text-xs font-bold uppercase tracking-wider text-muted-foreground/70"
                  >
                    Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="Brief details about your request..."
                    className="min-h-[100px] rounded-lg bg-background/50 border-muted focus:border-primary resize-none text-sm"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="bg-primary px-6 py-5 rounded-2xl shadow-xl text-primary-foreground space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground/50 border-b border-primary-foreground/10 pb-2">
                  Summary
                </p>

                <div className="grid gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-primary-foreground/40 leading-none mb-1">
                        Service
                      </p>
                      <p className="text-xs font-bold truncate">
                        {selectedType?.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-primary-foreground/40 leading-none mb-1">
                        Date
                      </p>
                      <p className="text-xs font-bold">
                        {selectedDate
                          ? format(selectedDate, "MMM d, yyyy")
                          : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 shrink-0 text-primary-foreground/60" />
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-primary-foreground/40 leading-none mb-1">
                        Time
                      </p>
                      <p className="text-xs font-bold">
                        {selectedSlot?.startTime.substring(0, 5)} (
                        {selectedType?.duration_minutes} min)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    className="w-full h-12 text-sm font-bold bg-white text-primary hover:bg-white/90 shadow-lg rounded-xl transition-all"
                    disabled={!formData.name || !formData.email || submitting}
                    onClick={handleBooking}
                  >
                    {submitting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case "confirmation":
        return (
          <div className="text-center space-y-6 py-4 animate-in zoom-in-95 duration-700">
            <div className="mx-auto w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(217,119,6,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">Scheduled!</h3>
              <p className="text-sm text-muted-foreground">
                Sent your details to{" "}
                <span className="font-bold text-primary">{formData.email}</span>
              </p>
            </div>

            <div className="p-6 bg-muted/30 border rounded-2xl text-left space-y-4">
              <div className="grid gap-3">
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">
                    Service
                  </p>
                  <p className="text-sm font-bold">{selectedType?.name}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">
                    Date & Time
                  </p>
                  <p className="text-sm font-bold">
                    {selectedDate && format(selectedDate, "MMM d")} @{" "}
                    {selectedSlot?.startTime.substring(0, 5)}
                  </p>
                </div>
              </div>

              <Button
                onClick={() => window.location.reload()}
                variant="outline"
                size="sm"
                className="w-full rounded-lg font-bold"
              >
                Finish
              </Button>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="border shadow-2xl rounded-3xl overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl max-w-lg mx-auto overflow-hidden">
      <CardContent className="p-6 sm:p-8">{renderStep()}</CardContent>
    </Card>
  );
}
