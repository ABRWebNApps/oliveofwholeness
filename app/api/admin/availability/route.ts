import { createAdminClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createAdminClient();

  const { data: dates, error } = await supabase
    .from("available_dates")
    .select("*")
    .order("date", { ascending: true });

  if (error) {
    console.error("Error fetching available dates:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability", availability_dates: [] },
      { status: 500 }
    );
  }

  return NextResponse.json({ availability_dates: dates || [] });
}

export async function POST(request: Request) {
  const supabase = await createAdminClient();
  const body = await request.json();
  const { date, is_available, start_time, end_time, time_slots } = body;

  if (!date) {
    return NextResponse.json({ error: "Date required" }, { status: 400 });
  }

  const { error } = await supabase.from("available_dates").upsert(
    {
      date,
      is_available: is_available !== false,
      start_time: start_time || "09:00:00",
      end_time: end_time || "17:00:00",
      time_slots: time_slots || [],
    },
    {
      onConflict: "date",
    }
  );

  if (error) {
    console.error("Error adding/updating date:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request) {
  const supabase = await createAdminClient();
  const body = await request.json();
  const { date, is_available, start_time, end_time, time_slots } = body;

  if (!date) {
    return NextResponse.json({ error: "Date required" }, { status: 400 });
  }

  const { error } = await supabase.from("available_dates").upsert(
    {
      date,
      is_available: is_available !== false,
      start_time: start_time || "09:00:00",
      end_time: end_time || "17:00:00",
      time_slots: time_slots || [],
    },
    {
      onConflict: "date",
    }
  );

  if (error) {
    console.error("Error upserting date via PATCH:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: Request) {
  const supabase = await createAdminClient();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("available_dates")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting date:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}