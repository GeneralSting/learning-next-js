import { MeetingRoom } from "@/types/meetingRoom";
import { getRoomById, reserveRoom } from "@/services/meetingRooms";
import MeetingRoomCard from "@/components/meeting-room-card";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface RoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export const generateMetadata = async ({
  params,
}: RoomPageProps): Promise<Metadata> => {
  const roomId = (await params).roomId;
  const formattedTitle = roomId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  return {
    title: `Meeting Room - ${formattedTitle}`,
    description: `NextJS ${formattedTitle} Metadata description`,
  };
};

export default async function RoomPage({ params }: RoomPageProps) {
  let room: MeetingRoom | null = null;

  const handleRefresh = async () => {
    "use server";

    const { roomId } = await params;
    return await getRoomById(roomId);
  };

  const handleReserve = async (room: MeetingRoom) => {
    "use server";
    const { roomId } = await params;
    await reserveRoom(room);

    return await getRoomById(roomId);
  };

  try {
    const { roomId } = await params;
    room = await getRoomById(roomId);

    if (!room) {
      notFound();
    }

    return (
      <MeetingRoomCard
        room={room}
        onRefresh={handleRefresh}
        onReserve={handleReserve}
      />
    );
  } catch (err) {
    console.error("Unexpected error fetching room:", err);
    throw err;
  }
}
