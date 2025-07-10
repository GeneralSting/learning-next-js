"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import { Modal, Box, Button, Typography } from "@mui/material";
import styles from "@/styles/modular/meeting-room-card.module.css";

interface ReserveSectionProps {
  isLoading?: boolean;
  isTimeLimited: boolean;
  selectedDuration: number | null;
  availableDurations: number[];
  minutesUntilNextMeeting?: number;
  status?: "available" | "pending" | "inUse";
  onReserve: () => void;
  onDurationSelect: (minutes: number) => void;
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

export function ReserveSection({
  isLoading = true,
  isTimeLimited,
  selectedDuration,
  availableDurations,
  minutesUntilNextMeeting,
  status,
  onReserve,
  onDurationSelect,
}: ReserveSectionProps) {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    if (!isTimeLimited) {
      setOpenModal(true);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDurationSelect = (minutes: number) => {
    onDurationSelect(minutes);
    handleCloseModal();
  };

  return (
    <div className={styles.reserveSection}>
      <button
        onClick={onReserve}
        className={styles.reserveButton}
        disabled={isTimeLimited || !selectedDuration || isLoading}
      >
        Reserve Room
        {selectedDuration && (
          <span className={styles.durationBadge}>{selectedDuration} min</span>
        )}
      </button>

      <button
        onClick={handleOpenModal}
        className={styles.timeSelectButton}
        disabled={isTimeLimited || isLoading}
      >
        <ChevronDownIcon size={16} />
      </button>

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
  );
}
