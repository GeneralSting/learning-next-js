import styles from "@/styles/modular/meeting-room-card.module.css";
import { Skeleton } from "@mui/material";

export default function MeetingRoomCardLoading() {
  const status = "default";
  const now = new Date();

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      {/* Top row with name, refresh button, and time */}
      <div className={styles.header}>
        <Skeleton variant="text" sx={{ fontSize: "2rem", width: "20%" }} />
        <div className={styles.headerRight}>
          <button className={styles.refreshButton}>
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
            <Skeleton variant="rectangular" width={80} height={30} />
          </div>

          {/* Room details */}
          <div className={styles.roomDetails}>
            <h3>Details</h3>
            <p>Location: {"room.location"}</p>
            <p>Capacity: {"room.capacity"} people</p>
          </div>

          {/* Amenities */}
          <div className={styles.amenities}>
            <h3>Amenities</h3>
            <ul>
              <li>AMAINTES</li>
            </ul>
          </div>

          {/* Reserve button */}
          <button className={styles.reserveButton}>Reserve Room</button>
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
          </div>
        </div>
      </div>
    </div>
  );
}

// Simple refresh icon component
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
