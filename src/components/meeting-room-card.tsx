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
import { Meeting } from "@/types/meeting";

const standardDurations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

interface MeetingRoomCardProps {
  room: MeetingRoom;
  onRefresh?: () => Promise<MeetingRoom | null>;
  onReserve?: (room: MeetingRoom) => Promise<MeetingRoom | null>;
}

export default function MeetingRoomCard({
  room,
  onRefresh,
  onReserve,
}: MeetingRoomCardProps) {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(20);
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState<MeetingRoom>(room);

  const status = getRoomStatus(currentRoom.meetings);
  const now = new Date();

  // Find next meeting
  const nextMeeting = currentRoom.meetings
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

  const handleRefresh = async () => {
    if (!onRefresh) return;

    try {
      setIsLoading(true);
      const updatedRoom = await onRefresh();
      if (updatedRoom) setCurrentRoom(updatedRoom);
    } catch (error) {
      console.error("Failed to refresh room data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReserve = async () => {
    if (!onReserve || !selectedDuration) return;

    try {
      const id = Date.now().toString();

      const meetingNames = [
        "Team Sync",
        "Project Review",
        "Brainstorming",
        "Sprint Planning",
        "Client Call",
        "Retrospective",
        "1:1 Meeting",
      ];
      const randomName =
        meetingNames[Math.floor(Math.random() * meetingNames.length)];

      const organizer = "john.doe@company.com";

      const startTime = new Date(); // Now
      const endTime = new Date(startTime.getTime() + selectedDuration * 60000);

      const newMeeting: Meeting = {
        id,
        name: randomName,
        startTime,
        endTime,
        organizer,
      };

      // Create updated room with new meeting
      const updatedRoom = {
        ...currentRoom,
        meetings: [...(currentRoom.meetings || []), newMeeting],
      };

      const resultRoom = await onReserve(updatedRoom);
      if (resultRoom) setCurrentRoom(resultRoom);

      console.log("Meeting created:", newMeeting);
    } catch (error) {
      console.error("Failed to reserve room:", error);
    }
  };

  return (
    <CardLayout
      status={status}
      header={<CardHeader title={currentRoom.name} onRefresh={handleRefresh} />}
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

              {/* currentRoom details */}
              <DetailRow icon={<MapPinIcon size={24} />}>
                {currentRoom.location}
              </DetailRow>

              <DetailRow icon={<UsersIcon size={24} />}>
                Capacity: {currentRoom.capacity} people
              </DetailRow>

              {/* Amenities */}
              <DetailRow icon={<StarIcon size={24} />}>
                <ul className={styles.amenitiesList}>
                  {currentRoom.amenities.map((amenity, index) => (
                    <li key={index}>{amenity}</li>
                  ))}
                </ul>
              </DetailRow>
            </div>

            {/* currentRoom image */}
            {currentRoom.image && (
              <Image
                src={currentRoom.image}
                alt={currentRoom.name}
                width={500}
                height={280}
                className={styles.roomImage}
                loading="eager" //LCP Image - shouldn't be lazy loaded
                priority={true}
              />
            )}

            <ReserveSection
              isLoading={isLoading}
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
      rightColumn={
        <CalendarView meetings={currentRoom.meetings} status={status} />
      }
    />
  );
}
