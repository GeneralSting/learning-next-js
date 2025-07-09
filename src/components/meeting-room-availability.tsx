"use client";

import { EventAvailable, EventBusy } from "@mui/icons-material";
import { Meeting } from "@/types/meeting";
import { useMemo } from "react";
import isCurrentlyOccupied from "@/utils/isCurrentlyOccupied";

interface Props {
  meetingRoomEvents: Meeting[];
}

export default function MeetingRoomAvailability({ meetingRoomEvents }: Props) {
  const { occupied, meeting } = useMemo(
    () => isCurrentlyOccupied(meetingRoomEvents),
    [meetingRoomEvents]
  );

  return (
    <div
      style={{
        marginTop: "8px",
        display: "flex",
        alignItems: "center",
      }}
    >
      {occupied ? (
        <>
          <EventBusy style={{ marginRight: "4px", color: "#f44336" }} />
          <span style={{ color: "#f44336" }}>
            Busy:{" "}
            {new Date(meeting!.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}{" "}
            -{" "}
            {new Date(meeting!.endTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </>
      ) : (
        <>
          <EventAvailable style={{ marginRight: "4px", color: "#4caf50" }} />
          <span style={{ color: "#4caf50" }}>Available</span>
        </>
      )}
    </div>
  );
}
