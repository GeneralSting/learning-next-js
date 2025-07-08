"use client";

import { Suspense, useEffect, useState } from "react";
import { RefreshCwIcon } from "lucide-react";
import styles from "@/styles/modular/meeting-room-card.module.css";
import LoadingSpinner from "@/components/loading-spinner";

interface CardHeaderProps {
  title: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function CardHeader({
  title,
  onRefresh,
  isLoading = false,
}: CardHeaderProps) {
  const [timeNow, setTimeNow] = useState<Date | null>(null);

  useEffect(() => {
    setTimeNow(new Date());
  }, []);

  return (
    <div className={styles.header}>
      <Suspense fallback={<LoadingSpinner />}>
        <h2 className={styles.roomName}>{isLoading ? "Loading..." : title}</h2>
      </Suspense>
      <div className={styles.headerRight}>
        {onRefresh && (
          <button onClick={onRefresh} className={styles.refreshButton}>
            <RefreshCwIcon size={20} />
          </button>
        )}
        <div className={styles.currentTime}>
          {timeNow?.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })}
        </div>
      </div>
    </div>
  );
}
