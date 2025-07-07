import { meetingRooms } from "@/data/meetingRooms";
import { NextResponse } from "next/server";

export async function GET() {
  return new Promise<NextResponse>((resolve) => {
    setTimeout(() => {
      try {
        resolve(NextResponse.json(meetingRooms, { status: 200 }));
      } catch (err) {
        console.error("Failed to fetch rooms:", err);
        resolve(
          NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 })
        );
      }
    }, 2000);
  });
}
