import { MeetingRoom } from "@/types/meetingRoom";
import { getRoomStatus } from "@/utils/roomStatus";
import styles from "@/styles/modular/meeting-room-card.module.css";
import { Suspense } from "react";
import LoadingSpinner from "./loading-spinner";

interface MeetingRoomCardProps {
  room: MeetingRoom;
  onRefresh?: () => void;
  onReserve?: () => void;
}

export default function MeetingRoomCard({
  room,
  onRefresh,
  onReserve,
}: MeetingRoomCardProps) {
  const status = getRoomStatus(room.meetings);
  const now = new Date();

  // Find next meeting
  const nextMeeting = room.meetings
    .filter((meeting) => new Date(meeting.endTime) > now)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )[0];

  // Filter today's meetings for the calendar
  const todaysMeetings = room.meetings.filter((meeting) => {
    const meetingDate = new Date(meeting.startTime);
    return (
      meetingDate.getDate() === now.getDate() &&
      meetingDate.getMonth() === now.getMonth() &&
      meetingDate.getFullYear() === now.getFullYear()
    );
  });

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header}>
        <Suspense fallback={<LoadingSpinner />}>
          <h2 className={styles.roomName}>{room.name}</h2>
        </Suspense>
        <div className={styles.headerRight}>
          <button onClick={onRefresh} className={styles.refreshButton}>
            <RefreshIcon />
          </button>
          <div className={styles.currentTime}>
            {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className={styles.content}>
        {/* Left column (60%) */}
        <div className={styles.leftColumn}>
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
                })}{" "}
                -
                {new Date(nextMeeting.endTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
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
        </div>

        {/* Right column (40%) - Calendar */}
        <div className={styles.rightColumn}>
          <h3>Today&apos;s Schedule</h3>
          <div className={styles.calendar}>
            {/* Timeline indicator */}
            <div
              className={styles.timeline}
              style={{
                top: `${
                  ((now.getHours() * 60 + now.getMinutes()) / 1440) * 100
                }%`,
              }}
            />

            {/* Calendar grid */}
            <div className={styles.calendarGrid}>
              {Array.from({ length: 24 }).map((_, hour) => (
                <div key={hour} className={styles.calendarHour}>
                  <div className={styles.hourLabel}>{hour}:00</div>
                  <div className={styles.hourSlot} />
                </div>
              ))}
            </div>

            {/* Meeting blocks */}
            {todaysMeetings.map((meeting) => {
              const start = new Date(meeting.startTime);
              const end = new Date(meeting.endTime);
              const top =
                ((start.getHours() * 60 + start.getMinutes()) / 1440) * 100;
              const height =
                ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) *
                100;

              return (
                <div
                  key={meeting.id}
                  className={styles.meetingBlock}
                  style={{
                    top: `${top}%`,
                    height: `${height}%`,
                  }}
                >
                  <span>{meeting.name}</span>
                  <span>
                    {start.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -
                    {end.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RefreshIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path d="M23 4v6h-6" />
      <path d="M1 20v-6h6" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
    </svg>
  );
}
