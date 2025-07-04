import styles from "@/styles/modular/meeting-rooms-list.module.css";
import { Suspense } from "react";
import MeetingRoomsList from "@/components/meeting-rooms-list";
import RoomSkeleton from "@/components/room-skeleton";

export default async function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Meeting Rooms</h1>

          <Suspense fallback={<RoomSkeleton />}>
            <MeetingRoomsList />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
