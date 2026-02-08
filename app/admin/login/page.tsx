"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // No initial auth check needed - middleware handles this
    setError(null);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    try {
      // Sign in
      const { data: signInData, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (signInError) {
        throw new Error("Invalid email or password");
      }

      if (!signInData?.user) {
        throw new Error("No user data returned");
      }

      // Check admin status
      const { data: adminProfile, error: profileError } = await supabase
        .from("admin_profiles")
        .select("*")
        .eq("id", signInData.user.id)
        .single();

      if (profileError || !adminProfile) {
        await supabase.auth.signOut();
        throw new Error("Access denied. Admin privileges required.");
      }

      // Success - redirect to dashboard
      // Wait for cookies to be set
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Set session cookies explicitly
      const {
        data: { session: newSession },
      } = await supabase.auth.getSession();

      if (newSession?.access_token) {
        document.cookie = `sb-access-token=${newSession.access_token}; path=/; max-age=${60 * 60 * 24}`;
        if (newSession.refresh_token) {
          document.cookie = `sb-refresh-token=${newSession.refresh_token}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }

        // Navigate to dashboard
        window.location.href = "/admin/dashboard";
      } else {
        throw new Error("Session not established");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      setError(error instanceof Error ? error.message : "An error occurred");

      // Clear any existing auth cookies and sign out
      document.cookie =
        "sb-access-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "sb-refresh-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      await supabase.auth.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80"
          >
            <Image
              src="/logo.jpg"
              alt="Olives of Wholeness Logo"
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="font-semibold text-lg">Olive of Wholeness</span>
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <CardDescription>
              Access the administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {error && (
                <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                  {error}
                </p>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
