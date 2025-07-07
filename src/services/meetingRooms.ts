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

export const getRoomById = async (id: string): Promise<MeetingRoom> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("404 - Room not found");
    }
  }

  return response.json();
};
