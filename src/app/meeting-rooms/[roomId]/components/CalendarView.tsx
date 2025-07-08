"use client";

import styles from "@/styles/modular/meeting-room-card.module.css";
import { Meeting } from "@/types/meeting";

interface CalendarViewProps {
  meetings: Meeting[];
  status?: "available" | "pending" | "inUse" | "default";
}

export function CalendarView({
  meetings,
  status = "default",
}: CalendarViewProps) {
  const now = new Date();

  return (
    <>
      <h3>Today&apos;s Schedule</h3>
      <div className={styles.calendar}>
        {/* Timeline indicator */}
        <div
          className={`${styles.timeline} ${
            status === "available"
              ? styles["available-timeline"]
              : status === "pending"
              ? styles["pending-timeline"]
              : status === "inUse"
              ? styles["inUse-timeline"]
              : styles["default-timeline"]
          }`}
          style={{
            top: `${((now.getHours() * 60 + now.getMinutes()) / 1440) * 100}%`,
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
        {meetings.map((meeting) => {
          const start = new Date(meeting.startTime);
          const end = new Date(meeting.endTime);
          const top =
            ((start.getHours() * 60 + start.getMinutes()) / 1440) * 100;
          const height =
            ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) * 100;

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
              <span style={{ marginLeft: "4px" }}>
                (
                {start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
                -
                {end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
                )
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
