import { meetingRooms } from "@/data/meetingRooms";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { roomId: string } }
) {
  const { roomId } = await params;

  try {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const room = meetingRooms.find((room) => room.id === roomId);

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (err) {
    console.error("Failed to fetch room:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
