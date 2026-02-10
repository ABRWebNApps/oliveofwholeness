import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = createClient();
  const { data: availability, error: availError } = await supabase
    .from("availability_settings")
    .select("*")
    .order("day_of_week", { ascending: true });

  const { data: configs, error: configError } = await supabase
    .from("booking_configs")
    .select("*");

  const { data: blackout, error: blackoutError } = await supabase
    .from("blackout_dates")
    .select("*")
    .order("blackout_date", { ascending: true });

  if (availError || configError || blackoutError) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }

  return NextResponse.json({ availability, configs, blackout });
}

export async function PATCH(request: Request) {
  const supabase = createClient();
  const body = await request.json();
  const { type, id, value, key } = body;

  if (type === "availability") {
    const { error } = await supabase
      .from("availability_settings")
      .update({ is_active: value })
      .eq("id", id);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (type === "config") {
    const { error } = await supabase
      .from("booking_configs")
      .update({ value })
      .eq("key", key);
    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
