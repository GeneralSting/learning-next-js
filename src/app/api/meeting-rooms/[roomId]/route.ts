import { MeetingRoomRequest } from "@/types/meetingRoomRequest";
import { logApiMessage } from "@/utils/logApiMessage";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;

  try {
    const response = await fetch(`http://localhost:3100/${roomId}`);
    const meetingRoomResponse: MeetingRoomRequest = await response.json();

    if (!meetingRoomResponse.message.success) {
      await logApiMessage({
        success: false,
        details: `Failed to fetch meeting room for ID: ${roomId}, ${meetingRoomResponse.message.details}`,
      });
    }

    return NextResponse.json(meetingRoomResponse.meetingRoom, { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    await logApiMessage({
      success: false,
      details: `API Error: Failed to fetch room - ${error}`,
    });

    return NextResponse.json(
      { error: "Failed to fetch rooms" },
      { status: 500 }
    );
  }
}
