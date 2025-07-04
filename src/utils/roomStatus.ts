import { Meeting } from "@/types/meeting";

export const getRoomStatus = (
  meetings: Meeting[]
): "available" | "pending" | "inUse" => {
  const now = new Date();
  const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000);

  // Check if room is currently in use
  const currentMeeting = meetings.find(
    (meeting) =>
      new Date(meeting.startTime) <= now && new Date(meeting.endTime) >= now
  );
  if (currentMeeting) return "inUse";

  // Check if there's a meeting within the next hour
  const upcomingMeeting = meetings.find(
    (meeting) =>
      new Date(meeting.startTime) > now &&
      new Date(meeting.startTime) <= oneHourFromNow
  );
  if (upcomingMeeting) return "pending";

  return "available";
};
