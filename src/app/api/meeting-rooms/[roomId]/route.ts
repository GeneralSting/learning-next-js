import { MeetingRoom } from "@/types/meetingRoom";
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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ roomId: string }> }
) {
  const { roomId } = await params;
  const room: MeetingRoom = await request.json();

  try {
    const response = await fetch(`http://localhost:3100/${roomId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        meetingRoom: room,
        message: {
          success: true,
          details: "Room reservation updated via API",
        },
      }),
    });

    if (!response.ok) {
      await logApiMessage({
        success: false,
        details: `Failed to update reservation for room ID: ${roomId}`,
      });
      return NextResponse.json(
        { error: "Failed to update reservation" },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result.meetingRoom, { status: 200 });
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    await logApiMessage({
      success: false,
      details: `API Error: Failed to update reservation - ${error}`,
    });

    return NextResponse.json(
      { error: "Failed to update reservation" },
      { status: 500 }
    );
  }
}
