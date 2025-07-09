import { Meeting } from "@/types/meeting";

export default function isCurrentlyOccupied(meetings: Meeting[]): {
  occupied: boolean;
  meeting?: Meeting;
} {
  console.log(meetings);
  const now = new Date();

  for (const meeting of meetings) {
    const start = new Date(meeting.startTime);
    const end = new Date(meeting.endTime);

    if (now >= start && now <= end) {
      return { occupied: true, meeting };
    }
  }

  return { occupied: false };
}
