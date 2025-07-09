import { MeetingRoom } from "./meetingRoom";
import { RequestMessage } from "./requestMessage";

export interface MeetingRoomsRequest {
  meetingRooms: MeetingRoom[];
  message: RequestMessage;
}
