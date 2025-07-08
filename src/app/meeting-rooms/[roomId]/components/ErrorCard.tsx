"use client";

import { CardLayout } from "./CardLayout";
import { CardHeader } from "./CardHeader";
import styles from "@/styles/modular/meeting-room-card.module.css";
import { CalendarView } from "./CalendarView";
import { Button } from "@mui/material";
import { startTransition } from "react";
import { useRouter } from "next/navigation";

export function ErrorCard({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  const reload = () => {
    startTransition(() => {
      router.refresh();
      reset();
    });
  };
  return (
    <CardLayout
      header={<CardHeader title={"An Error Occured!"} />}
      leftColumn={
        <div className={styles.leftColumnPadding}>
          <h1>{error.name}</h1>
          <div className={styles.errorMessage}>message: {error.message}</div>
          <Button
            onClick={reload}
            color="error"
            variant="outlined"
            sx={{ marginTop: "16px", maxWidth: "200px" }}
          >
            Try Again
          </Button>
        </div>
      }
      rightColumn={<CalendarView meetings={[]} status={"default"} />}
    />
  );
}
