// app/[roomId]/not-found.tsx
import styles from "@/styles/modular/proba.module.css";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h2 className={styles.roomName}>Room Not Found</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.notFoundMessage}>
            <h3>The requested room does not exist</h3>
            <p>Please check the room ID and try again</p>
            <Link href="/" className={styles.reserveButton}>
              Back to Rooms List
            </Link>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.errorCalendarPlaceholder}>
            <p>Calendar unavailable</p>
          </div>
        </div>
      </div>
    </div>
  );
}
