import { MeetingRoom } from "./meetingRoom";
import { RequestMessage } from "./requestMessage";

export interface MeetingRoomRequest {
  meetingRoom: MeetingRoom;
  message: RequestMessage;
}
