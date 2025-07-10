import { API_MEETING_ROOM_PATH } from "@/data/apiRoutes";
import { MeetingRoom } from "@/types/meetingRoom";

const API_BASE_URL =
  typeof window === "undefined"
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${API_MEETING_ROOM_PATH}` // For server-side
    : API_MEETING_ROOM_PATH;

export const getAllRooms = async (): Promise<MeetingRoom[]> => {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return response.json();
};

export const getRoomById = async (id: string): Promise<MeetingRoom | null> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch room: ${response.statusText}`);
  }

  return response.json();
};

export const reserveRoom = async (room: MeetingRoom): Promise<MeetingRoom> => {
  const response = await fetch(`http://localhost:3100/${room.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      meetingRoom: room,
      message: {
        success: true,
        details: "Room reservation updated",
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to reserve room: ${response.statusText}`);
  }

  const result = await response.json();
  return result.meetingRoom;
};
