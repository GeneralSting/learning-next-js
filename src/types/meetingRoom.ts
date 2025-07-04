import { Meeting } from "./meeting";

export interface MeetingRoom {
  id: string;
  name: string;
  description: string;
  location: string;
  capacity: number;
  amenities: string[];
  meetings: Meeting[];
  status: "available" | "pending" | "inUse";
}
