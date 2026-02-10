"use client";

import { useState, useEffect } from "react";
import AdminProtection from "@/components/admin-protection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Check,
  X,
  Calendar as CalendarIcon,
  User,
  Mail,
  FileText,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  notes: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: string;
  appointment_types: {
    name: string;
  };
}

export default function AdminBookings() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      toast.error("Failed to load appointments");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/appointments", {
        method: "PATCH",
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        toast.success(`Appointment marked as ${status}`);
        fetchAppointments();
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">Confirmed</Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-600 border-yellow-600"
          >
            Pending
          </Badge>
        );
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminProtection>
      <div className="p-8 space-y-8 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Manage Bookings
            </h1>
            <p className="text-muted-foreground mt-1">
              Review and manage your incoming appointments.
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-xl rounded-2xl overflow-hidden bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-xl flex items-center">
              <CalendarIcon className="w-5 h-5 mr-2 text-primary" />
              Appointment Schedule
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse">
                  Fetching latest schedule...
                </p>
              </div>
            ) : appointments.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Customer</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {appointments.map((app) => (
                      <TableRow
                        key={app.id}
                        className="group hover:bg-muted/30 transition-colors"
                      >
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-bold flex items-center">
                              <User className="w-3 h-3 mr-1 text-muted-foreground" />
                              {app.customer_name}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Mail className="w-3 h-3 mr-1" />
                              {app.customer_email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {format(
                                new Date(app.appointment_date),
                                "MMM dd, yyyy"
                              )}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {app.start_time.substring(0, 5)} -{" "}
                              {app.end_time.substring(0, 5)}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="font-medium">
                            {app.appointment_types?.name}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(app.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            {app.status === "pending" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-green-600 hover:text-green-700 hover:bg-green-50"
                                onClick={() =>
                                  updateStatus(app.id, "confirmed")
                                }
                              >
                                <Check className="w-4 h-4" />
                              </Button>
                            )}
                            {app.status !== "cancelled" && (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() =>
                                  updateStatus(app.id, "cancelled")
                                }
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <CalendarIcon className="w-10 h-10 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg">
                  No appointments found.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminProtection>
  );
}
