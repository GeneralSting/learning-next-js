import Link from "next/link";
import styles from "@/styles/modular/meeting-room-page.module.css";
import { MeetingRoom } from "@/types/meetingRoom";
import { getRoomById } from "@/services/meetingRooms";
import LoadingSpinner from "@/components/loading-spinner";
import MeetingRoomCard from "@/components/meeting-room-card";

interface RoomPageProps {
  params: {
    roomId: string;
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { roomId } = params;
  let room: MeetingRoom | null = null;
  let error: string | null = null;

  try {
    room = await getRoomById(roomId);
  } catch (err) {
    console.error("Error fetching room:", err);
    error = err instanceof Error ? err.message : "Failed to load room";
  }

  if (!room && !error) {
    return (
      <div className={styles.container}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>{error}</p>
          <Link href="/" className={styles.backLink}>
            &larr; Back to all rooms
          </Link>
        </div>
      </div>
    );
  }

  if (room) return <MeetingRoomCard room={room} />;
}
