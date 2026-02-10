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
import { Clock, Calendar as CalendarIcon, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

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

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Weekly Schedule */}
          <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
            <CardHeader className="bg-muted/30 border-b">
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2 text-primary" />
                Weekly Schedule
              </CardTitle>
              <CardDescription>Enable or disable booking days.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {data?.availability?.map((day: any) => (
                <div
                  key={day.id}
                  className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
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
                  <div className="text-sm font-medium text-muted-foreground bg-background px-3 py-1 rounded-full border">
                    {day.start_time.substring(0, 5)} -{" "}
                    {day.end_time.substring(0, 5)}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Configuration */}
          <div className="space-y-8">
            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden">
              <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="flex items-center">
                  <Save className="w-5 h-5 mr-2 text-primary" />
                  Global Settings
                </CardTitle>
                <CardDescription>
                  Manage buffer times and session spacing.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="buffer">Buffer Time (Minutes)</Label>
                  <div className="flex gap-2 text-balance">
                    <Input
                      id="buffer"
                      type="number"
                      defaultValue={bufferMinutes}
                      className="bg-secondary/30 border-0 text-lg font-medium h-12"
                      onBlur={(e) =>
                        updateConfig("buffer_minutes", e.target.value)
                      }
                    />
                    <div className="bg-secondary/30 px-4 flex items-center rounded-xl text-muted-foreground font-medium">
                      MINS
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground italic">
                    Rest period between back-to-back appointments.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg rounded-2xl overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 italic border-l-4 border-l-primary/30">
              <CardContent className="p-6">
                <p className="text-sm text-balance">
                  Tip: Set your global availability above. Only the hours
                  defined here will be visible to users on the booking calendar.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminProtection>
  );
}
