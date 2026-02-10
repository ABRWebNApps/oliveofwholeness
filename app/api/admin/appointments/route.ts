import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// List all appointments
export async function GET() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("appointments")
    .select("*, appointment_types(name)")
    .order("appointment_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// Update appointment status
export async function PATCH(request: Request) {
  const supabase = await createClient();
  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json(
      { error: "Missing id or status" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("appointments")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
