"use client";

import styles from "@/styles/modular/meeting-room-card.module.css";
import { Meeting } from "@/types/meeting";

interface StatusBadgeProps {
  status: "available" | "pending" | "inUse" | "default";
  nextMeeting?: Meeting;
}

export function StatusBadge({ status, nextMeeting }: StatusBadgeProps) {
  return (
    <div className={`${styles.statusBadge}`}>
      <span>
        {status === "available" && "Available"}
        {status === "pending" && "Pending"}
        {status === "default" && "Status..."}
        {status === "inUse" &&
          nextMeeting &&
          `In Use (${new Date(nextMeeting.startTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })} - ${new Date(nextMeeting.endTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })})`}
      </span>
    </div>
  );
}
