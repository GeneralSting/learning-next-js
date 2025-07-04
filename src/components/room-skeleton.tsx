import styles from "@/styles/modular/room-skeleton.module.css";

export default function RoomSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      {[...Array(4)].map((_, i) => (
        <div key={i} className={styles.skeletonCard}>
          <div className={styles.skeletonTitle}></div>
          <div className={styles.skeletonDescription}></div>
          <div className={styles.skeletonDescriptionShort}></div>
          <div className={styles.skeletonLocation}>
            <div className={styles.skeletonIcon}></div>
            <div style={{ flex: 1 }}></div>
          </div>
        </div>
      ))}
    </div>
  );
}
