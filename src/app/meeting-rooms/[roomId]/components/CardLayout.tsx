"use client";

import styles from "@/styles/modular/meeting-room-card.module.css";

interface CardLayoutProps {
  status?: "available" | "pending" | "inUse" | "default";
  header: React.ReactNode;
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
}

export function CardLayout({
  status = "default",
  header,
  leftColumn,
  rightColumn,
}: CardLayoutProps) {
  return (
    <div className={`${styles.card} ${status ? styles[status] : ""}`}>
      {header}
      <div className={styles.content}>
        <div className={styles.leftColumn}>{leftColumn}</div>
        <div className={styles.rightColumn}>{rightColumn}</div>
      </div>
    </div>
  );
}
