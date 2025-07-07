// app/[roomId]/error.tsx
"use client";

import styles from "@/styles/modular/proba.module.css";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.roomName}>Error</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.errorMessage}>
            <h3>Failed to load room</h3>
            <p>{error.message}</p>
            <button onClick={() => reset()} className={styles.reserveButton}>
              Try Again
            </button>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.errorCalendarPlaceholder}>
            <p>Calendar unavailable due to error</p>
          </div>
        </div>
      </div>
    </div>
  );
}
