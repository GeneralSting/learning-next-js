"use client";

import { ReactNode } from "react";
import styles from "@/styles/modular/meeting-room-card.module.css";

interface DetailRowProps {
  icon: ReactNode;
  children: ReactNode;
}

export function DetailRow({ icon, children }: DetailRowProps) {
  return (
    <div className={styles.detailRow}>
      <div className={styles.detailIcon}>{icon}</div>
      <div className={styles.detailValue}>{children}</div>
    </div>
  );
}
