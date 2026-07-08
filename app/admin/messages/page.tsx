"use client";

import { useState, useEffect, useRef } from "react";
import AdminProtection from "@/components/admin-protection";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Send,
  Loader2,
  Mail,
  Bold,
  Italic,
  List,
  Heading,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  customer_name: string;
  customer_email: string;
  appointment_date: string;
  start_time: string;
  appointment_types: { name: string };
}

export default function AdminMessages() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingEmails, setLoadingEmails] = useState(true);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await fetch("/api/admin/appointments");
      const data = await res.json();
      setAppointments(data);
    } catch {
      toast.error("Failed to load client emails");
    } finally {
      setLoadingEmails(false);
    }
  };

  const uniqueEmails = Array.from(
    new Map(
      appointments.map((a) => [
        a.customer_email,
        {
          email: a.customer_email,
          name: a.customer_name,
        },
      ])
    ).values()
  );

  const handleSelectEmail = (email: string) => {
    setTo(email);
  };

  const wrapSelection = (before: string, after: string) => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = body.substring(start, end);
    const wrapped = before + selected + after;
    const newBody = body.substring(0, start) + wrapped + body.substring(end);
    setBody(newBody);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + selected.length);
    }, 0);
  };

  const insertLine = (prefix: string) => {
    const ta = bodyRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const lineStart = body.lastIndexOf("\n", start - 1) + 1;
    const before = body.substring(0, lineStart);
    const after = body.substring(lineStart);
    const newBody = before + prefix + " " + after;
    setBody(newBody);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(lineStart + prefix.length + 1, lineStart + prefix.length + 1);
    }, 0);
  };

  const handleSend = async () => {
    if (!to.trim() || !subject.trim() || !body.trim()) {
      toast.error("Please fill in email, subject, and message");
      return;
    }

    let emailTo = to.trim();
    if (!emailTo.includes("@")) {
      toast.error("Invalid email address");
      return;
    }

    setSending(true);
    try {
      const htmlContent = body
        .replace(/\n/g, "<br/>")
        .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.+?)\*/g, "<em>$1</em>");

      const styledHtml = `
        <div style="font-family: Georgia, 'Times New Roman', serif; line-height: 1.8; color: #2d2d2d; max-width: 600px; margin: 0 auto;">
          ${htmlContent}
          <hr style="border: 0; border-top: 1px solid #e0d6c8; margin: 30px 0;" />
          <p style="font-size: 14px; color: #777; font-style: italic;">With warmth,<br/><span style="font-weight: bold; color: #2e7d32;">Olive of Wholeness</span></p>
        </div>
      `;

      const res = await fetch("/api/admin/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: emailTo,
          subject: subject.trim(),
          html: styledHtml,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      toast.success("Email sent successfully!");
      setSubject("");
      setBody("");
      setTo("");
    } catch (err: any) {
      toast.error(err.message || "Failed to send email");
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminProtection>
      <div className="p-8 space-y-8 animate-in fade-in duration-700 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">
              Compose Message
            </h1>
            <p className="text-muted-foreground mt-1">
              Send a manual email to a client who has booked an appointment.
            </p>
          </div>
        </div>

        <Card className="border-0 shadow-xl rounded-2xl bg-card/50 backdrop-blur-sm">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="text-xl flex items-center">
              <Mail className="w-5 h-5 mr-2 text-primary" />
              New Message
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-5">
            {/* Email selector */}
            <div className="space-y-2">
              <Label htmlFor="email-select">Recipient</Label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Select onValueChange={handleSelectEmail} value={to}>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loadingEmails
                            ? "Loading clients..."
                            : "Select a client or type an email..."
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {uniqueEmails.map((e) => (
                        <SelectItem key={e.email} value={e.email}>
                          {e.name} — {e.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Input
                placeholder="Or type a custom email address..."
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1"
              />
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Subject..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            {/* Mini toolbar */}
            <div className="flex items-center gap-1 p-1.5 border rounded-md bg-muted/20 w-fit">
              <button
                type="button"
                onClick={() => wrapSelection("<strong>", "</strong>")}
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => wrapSelection("<em>", "</em>")}
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <span className="w-px h-5 bg-border mx-1" />
              <button
                type="button"
                onClick={() => insertLine("•")}
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Bullet point"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertLine("##")}
                className="p-1.5 rounded hover:bg-muted transition-colors"
                title="Heading"
              >
                <Heading className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="space-y-2">
              <Label htmlFor="body">Message</Label>
              <Textarea
                ref={bodyRef}
                id="body"
                placeholder="Write your message here... Use **bold** and *italic* markup."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="min-h-[280px] leading-relaxed"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 px-6 py-4 flex justify-end">
            <Button
              onClick={handleSend}
              disabled={sending || !to || !subject || !body}
              className="gap-2"
            >
              {sending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
              {sending ? "Sending..." : "Send Message"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </AdminProtection>
  );
}