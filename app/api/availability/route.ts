import { NextResponse } from "next/server";
import { getAvailableSlots } from "@/lib/appointments";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const typeId = searchParams.get("typeId");

  if (!date || !typeId) {
    return NextResponse.json(
      { error: "Missing date or typeId" },
      { status: 400 }
    );
  }

  try {
    const slots = await getAvailableSlots(date, typeId);
    return NextResponse.json(slots);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
