import styles from "@/styles/modular/meeting-rooms-list.module.css";
import { getAllRooms } from "@/services/meetingRooms";
import { MeetingRoom } from "@/types/meetingRoom";
import { HoverPrefetchLink } from "./hover-prefetch-link";
import { MEETING_ROOM_PATH } from "@/data/routes";
import { LocationIcon } from "./icons/location-icons";

export default async function MeetingRoomsList() {
  let rooms: MeetingRoom[] = [];

  try {
    rooms = await getAllRooms();
  } catch (error) {
    console.error("Failed to load rooms:", error);
  }

  return (
    <div className={styles.roomsGrid}>
      {rooms.map((room: MeetingRoom) => (
        <HoverPrefetchLink
          key={room.id}
          href={`/${MEETING_ROOM_PATH}${room.id}`}
        >
          <div className={styles.roomCard}>
            <h2 className={styles.roomName}>{room.name}</h2>
            <p className={styles.roomDescription}>{room.description}</p>
            <div className={styles.roomLocation}>
              <LocationIcon />
              {room.location}
            </div>
            <div className={styles.roomLocation}>
              <LocationIcon />
              {`Today Meetings: ${room.meetings.length}`}
            </div>
          </div>
        </HoverPrefetchLink>
      ))}
    </div>
  );
}
