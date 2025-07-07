"use client";

import { useState } from "react";
import { MeetingRoom } from "@/types/meetingRoom";
import { getRoomStatus } from "@/utils/roomStatus";
import styles from "@/styles/modular/meeting-room-card.module.css";
import { Suspense } from "react";
import LoadingSpinner from "./loading-spinner";
import {
  RefreshCwIcon,
  ChevronDownIcon,
  CalendarIcon,
  MapPinIcon,
  UsersIcon,
  StarIcon,
} from "lucide-react";
import { Modal, Box, Button, Typography } from "@mui/material";
import Image from "next/image";

interface MeetingRoomCardProps {
  room: MeetingRoom;
  onRefresh?: () => void;
  onReserve?: (duration: number) => void;
}

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 500,
  maxWidth: 800,
  bgcolor: "#272d36",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const standardDurations = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60];

export default function MeetingRoomCard({
  room,
  onRefresh,
  onReserve,
}: MeetingRoomCardProps) {
  const [openModal, setOpenModal] = useState(false);
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

  console.log(room);

  const availableDurations = getAvailableDurations();
  const isTimeLimited =
    status === "inUse" || (status === "pending" && minutesUntilNextMeeting < 5);

  const handleOpenModal = () => {
    if (!isTimeLimited) {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDurationSelect = (minutes: number) => {
    setSelectedDuration(minutes);
    handleCloseModal();
  };

  const handleReserve = () => {
    if (selectedDuration && onReserve) {
      onReserve(selectedDuration);
    }
  };

  return (
    <div className={`${styles.card} ${styles[status]}`}>
      <div className={styles.header}>
        <Suspense fallback={<LoadingSpinner />}>
          <h2 className={styles.roomName}>{room.name}</h2>
        </Suspense>
        <div className={styles.headerRight}>
          <button onClick={onRefresh} className={styles.refreshButton}>
            <RefreshCwIcon size={20} />
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
            <div className={styles.statusGradient}></div>
            <span>
              {status === "available" && "Available"}
              {status === "pending" && "Pending"}
              {status === "inUse" &&
                `In Use (${new Date(nextMeeting.startTime).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
                    -
                    ${new Date(nextMeeting.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })})`}
            </span>
          </div>
          <div className={styles.leftColumnPadding}>
            <div className={styles.detailsSection}>
              {/* Next meeting info */}
              {nextMeeting && (
                <div className={styles.detailRow}>
                  <div className={styles.detailIcon}>
                    <CalendarIcon size={24} />
                  </div>
                  <div className={styles.detailValue}>
                    {status === "inUse" ? <>Current: </> : <>Next: </>}
                    {nextMeeting.name}, duration:{" "}
                    {new Date(nextMeeting.startTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    -
                    {new Date(nextMeeting.endTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              )}

              {/* Room details */}
              <div className={styles.detailRow}>
                <div className={styles.detailIcon}>
                  <MapPinIcon size={24} />
                </div>
                <div className={styles.detailValue}>{room.location}</div>
              </div>

              <div className={styles.detailRow}>
                <div className={styles.detailIcon}>
                  <UsersIcon size={24} />
                </div>
                <div className={styles.detailValue}>
                  Capacity: {room.capacity} people
                </div>
              </div>

              {/* Amenities */}
              <div className={styles.detailRow}>
                <div className={styles.detailIcon}>
                  <StarIcon size={24} />
                </div>
                <div className={styles.detailValue}>
                  <ul className={styles.amenitiesList}>
                    {room.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Room image */}
            {room.image && (
              <Image
                src={room.image}
                alt={room.name}
                width={500}
                height={280}
                className={styles.roomImage}
              />
            )}

            {/* Reserve section */}
            <div className={styles.reserveSection}>
              <button
                onClick={handleReserve}
                className={styles.reserveButton}
                disabled={isTimeLimited || !selectedDuration}
              >
                Reserve Room
                {selectedDuration && (
                  <span className={styles.durationBadge}>
                    {selectedDuration} min
                  </span>
                )}
              </button>

              <button
                onClick={handleOpenModal}
                className={styles.timeSelectButton}
                disabled={isTimeLimited}
              >
                <ChevronDownIcon size={16} />
              </button>

              {isTimeLimited && (
                <div className={styles.timeLimitWarning}>
                  {status === "inUse" ? (
                    <>Currently in use</>
                  ) : (
                    <>Not enough time before next meeting</>
                  )}
                </div>
              )}
            </div>

            {/* Time Selection Modal */}
            <Modal
              open={openModal}
              onClose={handleCloseModal}
              aria-labelledby="time-selection-modal"
            >
              <Box sx={modalStyle}>
                <Typography variant="h6" component="h2" mb={2}>
                  Select Meeting Duration{" "}
                  {status === "pending" && (
                    <span style={{ fontSize: "1rem" }}>
                      (Next meeting starts in {minutesUntilNextMeeting} minutes)
                    </span>
                  )}
                </Typography>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(2, 1fr)",
                      sm: "repeat(3, 1fr)",
                    },
                    gap: 2,
                  }}
                >
                  {availableDurations.map((minutes) => (
                    <Button
                      key={minutes}
                      fullWidth
                      variant={
                        selectedDuration === minutes ? "contained" : "outlined"
                      }
                      onClick={() => handleDurationSelect(minutes)}
                      sx={{
                        justifyContent: "flex-start",
                        textTransform: "none",
                      }}
                      className={`${
                        status === "available"
                          ? styles["available-timeline"]
                          : status === "pending"
                          ? styles["pending-timeline"]
                          : status === "inUse"
                          ? styles["inUse-timeline"]
                          : styles["default-timeline"]
                      }`}
                    >
                      {minutes} minutes{" "}
                      {minutes === minutesUntilNextMeeting &&
                        status === "pending" && (
                          <span style={{ fontSize: "1rem", marginLeft: "4px" }}>
                            (remaining time)
                          </span>
                        )}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Modal>
          </div>
        </div>

        {/* Right column (40%) - Calendar */}
        <div className={styles.rightColumn}>
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
            {room.meetings.map((meeting) => {
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
