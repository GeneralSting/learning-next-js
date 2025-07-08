"use client";

import { CardLayout } from "./CardLayout";
import { CardHeader } from "./CardHeader";
import styles from "@/styles/modular/meeting-room-card.module.css";
import { CalendarView } from "./CalendarView";
import { Button } from "@mui/material";
import { startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";

export function NotFoundCard() {
  const pathname = usePathname();
  const lastSegment = pathname.split("/").filter(Boolean).pop();
  const router = useRouter();

  const reload = () => {
    startTransition(() => {
      router.back();
    });
  };

  return (
    <CardLayout
      header={<CardHeader title={lastSegment ? lastSegment : pathname} />}
      leftColumn={
        <div className={styles.leftColumnPadding}>
          <h1>Meeting Room does not exist for this URL</h1>
          <Button
            onClick={reload}
            color="warning"
            variant="outlined"
            sx={{ marginTop: "16px", maxWidth: "200px" }}
          >
            Go Back
          </Button>
        </div>
      }
      rightColumn={<CalendarView meetings={[]} status={"default"} />}
    />
  );
}
