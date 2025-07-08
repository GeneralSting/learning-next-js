"use client";

import { useState } from "react";
import { MeetingRoom } from "@/types/meetingRoom";
import { getRoomStatus } from "@/utils/roomStatus";
import Image from "next/image";
import { CalendarIcon, MapPinIcon, UsersIcon, StarIcon } from "lucide-react";
import styles from "@/styles/modular/meeting-room-card.module.css";
import { CardLayout } from "@/app/meeting-rooms/[roomId]/components/CardLayout";
import { CardHeader } from "@/app/meeting-rooms/[roomId]/components/CardHeader";
import { StatusBadge } from "@/app/meeting-rooms/[roomId]/components/StatusBadge";
import { DetailRow } from "@/app/meeting-rooms/[roomId]/components/DetailRow";
import { ReserveSection } from "@/app/meeting-rooms/[roomId]/components/ReserveSection";
import { CalendarView } from "@/app/meeting-rooms/[roomId]/components/CalendarView";

const standardDurations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

interface MeetingRoomCardProps {
  room: MeetingRoom;
  onRefresh?: () => void;
  onReserve?: (duration: number) => void;
}

export default function MeetingRoomCard({
  room,
  onRefresh,
  onReserve,
}: MeetingRoomCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(20);
  const status = getRoomStatus(room.meetings);
  const now = new Date();

  // Find next meeting
  const nextMeeting = room.meetings
    .filter((meeting) => new Date(meeting.endTime) > now)
    .sort(
      (a, b) =>
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
    )[0];

  // Calculate available time if pending
  const minutesUntilNextMeeting = nextMeeting
    ? Math.floor(
        (new Date(nextMeeting.startTime).getTime() - now.getTime()) /
          (1000 * 60)
      )
    : 0;

  // Get available durations based on status
  const getAvailableDurations = () => {
    if (status !== "pending") return standardDurations;

    const remainingTime = minutesUntilNextMeeting;
    if (remainingTime < 5) return [];

    // Filter standard durations that fit in remaining time
    const available = standardDurations.filter((d) => d <= remainingTime);
    // Add remaining time as last option if it's different
    if (
      available.length === 0 ||
      available[available.length - 1] !== remainingTime
    ) {
      available.push(remainingTime);
    }
    return available;
  };

  const availableDurations = getAvailableDurations();
  const isTimeLimited =
    status === "inUse" || (status === "pending" && minutesUntilNextMeeting < 5);

  const handleReserve = () => {
    if (selectedDuration && onReserve) {
      onReserve(selectedDuration);
    }
  };

  return (
    <CardLayout
      status={status}
      header={<CardHeader title={room.name} onRefresh={onRefresh} />}
      leftColumn={
        <>
          <StatusBadge status={status} nextMeeting={nextMeeting} />
          <div className={styles.leftColumnPadding}>
            <div className={styles.detailsSection}>
              {/* Next meeting info */}
              {nextMeeting && (
                <DetailRow icon={<CalendarIcon size={24} />}>
                  {status === "inUse" ? <>Current: </> : <>Next: </>}
                  {nextMeeting.name}, duration:{" "}
                  {new Date(nextMeeting.startTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                  -
                  {new Date(nextMeeting.endTime).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </DetailRow>
              )}

              {/* Room details */}
              <DetailRow icon={<MapPinIcon size={24} />}>
                {room.location}
              </DetailRow>

              <DetailRow icon={<UsersIcon size={24} />}>
                Capacity: {room.capacity} people
              </DetailRow>

              {/* Amenities */}
              <DetailRow icon={<StarIcon size={24} />}>
                <ul className={styles.amenitiesList}>
                  {room.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </DetailRow>
            </div>

            {/* Room image */}
            {room.image && (
              <Image
                src={room.image}
                alt={room.name}
                width={500}
                height={280}
                className={styles.roomImage}
                loading="eager" //LCP Image - shouldn't be lazy loaded
              />
            )}

            <ReserveSection
              isTimeLimited={isTimeLimited}
              selectedDuration={selectedDuration}
              availableDurations={availableDurations}
              minutesUntilNextMeeting={minutesUntilNextMeeting}
              status={status}
              onReserve={handleReserve}
              onDurationSelect={setSelectedDuration}
            />
          </div>
        </>
      }
      rightColumn={<CalendarView meetings={room.meetings} status={status} />}
    />
  );
}
