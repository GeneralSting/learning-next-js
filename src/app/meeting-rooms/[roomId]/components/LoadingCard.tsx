"use client";

import { CardLayout } from "./CardLayout";
import { CardHeader } from "./CardHeader";
import styles from "@/styles/modular/meeting-room-card.module.css";
import { CalendarView } from "./CalendarView";
import { StatusBadge } from "./StatusBadge";
import { Skeleton } from "@mui/material";
import { ReserveSection } from "./ReserveSection";

export function LoadingCard() {
  return (
    <CardLayout
      header={<CardHeader title="Loading room..." isLoading />}
      leftColumn={
        <>
          <StatusBadge status={"default"} />
          <div className={styles.leftColumnPadding}>
            <div className={styles.detailsSection}>
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <Skeleton sx={{ height: "32px", width: "32px" }} />
                  <Skeleton
                    sx={{ height: "32px", width: "320px", marginLeft: "16px" }}
                  />
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: "16px" }}>
            <ReserveSection
              isTimeLimited={true}
              selectedDuration={20}
              availableDurations={[]}
              minutesUntilNextMeeting={100}
              status={"inUse"}
              onReserve={() => {}}
              onDurationSelect={() => {}}
            />
          </div>
        </>
      }
      rightColumn={<CalendarView meetings={[]} />}
    />
  );
}
