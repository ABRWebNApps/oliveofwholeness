import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
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

  const { data: overrides, error: overridesError } = await supabase
    .from("availability_overrides")
    .select("*")
    .order("override_date", { ascending: true });

  if (availError || configError || blackoutError || overridesError) {
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }

  return NextResponse.json({ availability, configs, blackout, overrides });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { override_date, start_time, end_time, is_available } = body;

  const { error } = await supabase.from("availability_overrides").upsert({
    override_date,
    start_time,
    end_time,
    is_available,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("availability_overrides")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const supabase = await createClient();
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
