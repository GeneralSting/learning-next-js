// components/RoomDetails.tsx
import { MeetingRoom } from "@/types/meetingRoom";
import styles from "@/styles/modular/meeting-room-card.module.css";

interface RoomDetailsProps {
  room: MeetingRoom;
  status: string;
  now: Date;
  onReserve?: () => void;
}

export default function RoomCardDetails({
  room,
  status,
  now,
  onReserve,
}: RoomDetailsProps) {
  // Find next meeting
  const nextMeeting = room.meetings
    .filter((meeting) => new Date(meeting.endTime) > now)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )[0];

  return (
    <>
      {/* Status badge */}
      <div className={styles.statusBadge}>
        {status === "available" && "Available"}
        {status === "pending" && "Pending"}
        {status === "inUse" && "In Use"}
      </div>

      {/* Next meeting info */}
      {nextMeeting && (
        <div className={styles.nextMeeting}>
          <h3>Next Meeting</h3>
          <p>{nextMeeting.name}</p>
          <p>
            {new Date(nextMeeting.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            -
            {new Date(nextMeeting.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </p>
        </div>
      )}

      {/* Room details */}
      <div className={styles.roomDetails}>
        <h3>Details</h3>
        <p>Location: {room.location}</p>
        <p>Capacity: {room.capacity} people</p>
      </div>

      {/* Amenities */}
      <div className={styles.amenities}>
        <h3>Amenities</h3>
        <ul>
          {room.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>

      {/* Reserve button */}
      <button onClick={onReserve} className={styles.reserveButton}>
        Reserve Room
      </button>
    </>
  );
}
