import { MeetingRoom } from "@/types/meetingRoom";

const API_BASE_URL =
  typeof window === "undefined"
    ? "http://localhost:3002/api/meeting-rooms" // For server-side
    : "/api/meeting-rooms";

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
