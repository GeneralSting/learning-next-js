import { MeetingRoomsRequest } from "@/types/meetingRoomsRequest";
import { logApiMessage } from "@/utils/logApiMessage";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:3100/meetingRoomsRequest");
    const data: MeetingRoomsRequest = await res.json();

    if (!data.message.success) {
      await logApiMessage({
        success: false,
        details: `Failed to fetch rooms: ${data.message.details}`,
      });
    }

    return NextResponse.json(data.meetingRooms, { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    await logApiMessage({
      success: false,
      details: `API Error: Failed to fetch rooms - ${error}`,
    });

    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
