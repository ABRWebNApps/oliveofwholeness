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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Clock,
  Calendar as CalendarIcon,
  Save,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { format as fnsFormat } from "date-fns";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function AvailabilitySettings() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [newOverride, setNewOverride] = useState({
    start_time: "09:00",
    end_time: "17:00",
    is_available: true,
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/availability");
      const json = await res.json();
      setData(json);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const updateAvailability = async (id: string, value: boolean) => {
    try {
      setSaving(true);
      await fetch("/api/admin/availability", {
        method: "PATCH",
        body: JSON.stringify({ type: "availability", id, value }),
      });
      fetchSettings();
      toast.success("Availability updated");
    } catch (error) {
      toast.error("Failed to update availability");
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = async (key: string, value: string) => {
    try {
      setSaving(true);
      await fetch("/api/admin/availability", {
        method: "PATCH",
        body: JSON.stringify({ type: "config", key, value }),
      });
      fetchSettings();
      toast.success("Settings updated");
    } catch (error) {
      toast.error("Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  const addOverride = async () => {
    if (!selectedDate) return;
    try {
      setSaving(true);
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        body: JSON.stringify({
          override_date: fnsFormat(selectedDate, "yyyy-MM-dd"),
          ...newOverride,
        }),
      });
      if (!res.ok) throw new Error();
      fetchSettings();
      toast.success("Override added");
    } catch (error) {
      toast.error("Failed to add override");
    } finally {
      setSaving(false);
    }
  };

  const deleteOverride = async (id: string) => {
    try {
      setSaving(true);
      const res = await fetch(`/api/admin/availability?id=${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      fetchSettings();
      toast.success("Override removed");
    } catch (error) {
      toast.error("Failed to remove override");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminProtection>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
        </div>
      </AdminProtection>
    );
  }

  const bufferMinutes =
    data?.configs?.find((c: any) => c.key === "buffer_minutes")?.value || "15";

  return (
    <AdminProtection>
      <div className="p-8 space-y-8 animate-in fade-in duration-700">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-balance">
            Availability Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Configure your working hours and session gaps.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Weekly Schedule */}
          <div className="xl:col-span-5 space-y-8">
            <Card className="border-0 shadow-2xl rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  Weekly Schedule
                </CardTitle>
                <CardDescription>
                  Enable or disable booking days.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {data?.availability?.map((day: any) => (
                  <div
                    key={day.id}
                    className="flex items-center justify-between p-5 bg-gradient-to-r from-secondary/40 to-secondary/20 rounded-2xl hover:from-primary/10 hover:to-primary/5 transition-all duration-300 group border border-transparent hover:border-primary/10 shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <Checkbox
                        id={day.id}
                        checked={day.is_active}
                        onCheckedChange={(checked) =>
                          updateAvailability(day.id, !!checked)
                        }
                      />
                      <Label
                        htmlFor={day.id}
                        className="text-lg font-medium cursor-pointer"
                      >
                        {DAYS[day.day_of_week]}
                      </Label>
                    </div>
                    <div className="text-sm font-bold text-primary bg-background px-4 py-2 rounded-xl border-2 border-primary/5 shadow-inner">
                      {day.start_time.substring(0, 5)} -{" "}
                      {day.end_time.substring(0, 5)}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl rounded-[2rem] overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 italic border-l-4 border-l-primary/30">
              <CardContent className="p-8">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/20 p-2 rounded-lg">
                    <Plus className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-sm text-balance leading-relaxed">
                    <span className="font-bold block mb-1">Pro Tip</span>
                    Date overrides take priority over weekly settings. Use them
                    for one-off availability changes or blocking days.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Date-Specific Overrides */}
          <div className="xl:col-span-7 space-y-8">
            <Card className="border-0 shadow-2xl rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="bg-muted/30 border-b p-8">
                <CardTitle className="flex items-center text-2xl">
                  <CalendarIcon className="w-6 h-6 mr-3 text-primary" />
                  Date Overrides
                </CardTitle>
                <CardDescription className="text-base">
                  Set specific availability for a single day.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-10">
                <div className="flex flex-col lg:flex-row gap-10">
                  <div className="flex-1 space-y-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-3xl border shadow-xl bg-background p-6"
                    />
                  </div>
                  <div className="flex-1 space-y-8">
                    <div className="space-y-3">
                      <Label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                        Schedule For Date
                      </Label>
                      <div className="text-lg font-bold p-5 bg-primary/5 border-2 border-primary/10 rounded-2xl shadow-inner text-primary">
                        {selectedDate
                          ? fnsFormat(selectedDate, "PPPP")
                          : "Select a date"}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-semibold">Start Time</Label>
                        <Input
                          type="time"
                          value={newOverride.start_time}
                          className="h-14 bg-background border-2 focus:ring-primary rounded-xl text-lg font-medium"
                          onChange={(e) =>
                            setNewOverride({
                              ...newOverride,
                              start_time: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-semibold">End Time</Label>
                        <Input
                          type="time"
                          value={newOverride.end_time}
                          className="h-14 bg-background border-2 focus:ring-primary rounded-xl text-lg font-medium"
                          onChange={(e) =>
                            setNewOverride({
                              ...newOverride,
                              end_time: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-secondary/20 rounded-2xl border border-secondary/30">
                      <Checkbox
                        id="avail"
                        className="w-6 h-6 rounded-lg"
                        checked={newOverride.is_available}
                        onCheckedChange={(checked) =>
                          setNewOverride({
                            ...newOverride,
                            is_available: !!checked,
                          })
                        }
                      />
                      <Label
                        htmlFor="avail"
                        className="text-base font-semibold cursor-pointer"
                      >
                        Available for Booking
                      </Label>
                    </div>
                    <Button
                      className="w-full h-14 text-lg font-bold rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/20"
                      disabled={!selectedDate || saving}
                      onClick={addOverride}
                    >
                      {saving ? (
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      ) : (
                        <Plus className="w-5 h-5 mr-2" />
                      )}
                      Add Override Rule
                    </Button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground/60 flex items-center">
                    <div className="h-px flex-1 bg-border mr-4" />
                    Active Overrides
                    <div className="h-px flex-1 bg-border ml-4" />
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {data?.overrides && data.overrides.length > 0 ? (
                      data.overrides.map((ov: any) => (
                        <div
                          key={ov.id}
                          className="flex items-center justify-between p-4 bg-background border-2 border-secondary/40 rounded-[1.5rem] group hover:border-primary/30 transition-all duration-300 shadow-sm"
                        >
                          <div>
                            <p className="font-black text-base text-primary">
                              {fnsFormat(
                                new Date(ov.override_date),
                                "MMM dd, yyyy"
                              )}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              {ov.is_available ? (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider">
                                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                  Available
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-bold uppercase tracking-wider">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                  Blocked
                                </div>
                              )}
                              <span className="text-xs font-bold text-muted-foreground">
                                {ov.start_time.substring(0, 5)} -{" "}
                                {ov.end_time.substring(0, 5)}
                              </span>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-10 w-10 p-0 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                            onClick={() => deleteOverride(ov.id)}
                          >
                            <Trash2 className="w-5 h-5" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="sm:col-span-2 text-center py-10 bg-muted/10 rounded-3xl border-2 border-dashed border-muted">
                        <CalendarIcon className="w-10 h-10 mx-auto text-muted-foreground/30 mb-3" />
                        <p className="text-sm font-medium text-muted-foreground">
                          No custom date rules yet.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-2xl rounded-[2rem] overflow-hidden bg-white/50 backdrop-blur-sm">
              <CardHeader className="bg-muted/30 border-b p-8">
                <CardTitle className="flex items-center text-2xl">
                  <Save className="w-6 h-6 mr-3 text-primary" />
                  Global Configuration
                </CardTitle>
                <CardDescription className="text-base">
                  Manage buffer times and session spacing.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-4">
                  <Label htmlFor="buffer" className="text-lg font-bold">
                    Buffer Time (Minutes)
                  </Label>
                  <div className="flex gap-4">
                    <Input
                      id="buffer"
                      type="number"
                      defaultValue={bufferMinutes}
                      className="bg-background border-2 border-primary/10 text-2xl font-black h-16 rounded-2xl flex-1 px-6 shadow-inner"
                      onBlur={(e) =>
                        updateConfig("buffer_minutes", e.target.value)
                      }
                    />
                    <div className="bg-primary/10 px-8 flex items-center rounded-2xl text-primary font-black tracking-widest text-sm">
                      MINUTES
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium italic mt-2">
                    Minimum rest period between consecutive appointments to
                    ensure quality and preparation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminProtection>
  );
}
