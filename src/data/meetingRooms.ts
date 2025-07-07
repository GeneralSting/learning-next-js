import { MeetingRoom } from "@/types/meetingRoom";

export const meetingRooms: MeetingRoom[] = [
  {
    id: "glass-room",
    name: "Glass Room",
    description: "A modern transparent meeting space with natural lighting",
    location: "Floor 3, West Wing",
    capacity: 8,
    amenities: ["Projector", "Whiteboard", "Video Conferencing"],
    status: "available",
    meetings: [],
    image: "/meeting-rooms/meeting-room-glass.webp",
  },
  {
    id: "lounge-room",
    name: "Lounge Room",
    description: "Comfortable seating for informal meetings and brainstorming",
    location: "Floor 2, Central Hub",
    capacity: 6,
    amenities: ["Coffee Machine", "Sofa Seating", "TV Screen"],
    status: "available",
    image: "/meeting-rooms/meeting-room-lounge.webp",
    meetings: [
      {
        id: "1",
        name: "test event",
        startTime: new Date("2025-07-07T14:00:00"),
        endTime: new Date("2025-07-07T15:00:00"),
        organizer: "john.doe@company.com",
      },

      {
        id: "2",
        name: "test event 2",
        startTime: new Date("2025-07-07T11:00:00"),
        endTime: new Date("2025-07-07T12:30:00"),
        organizer: "john.doe@company.com",
      },
    ],
  },
  {
    id: "firefly",
    name: "Firefly",
    description: "Cozy meeting room with adjustable mood lighting",
    location: "Floor 1, East Wing",
    capacity: 4,
    amenities: ["Dimmable Lights", "Soundproofing", "Wireless Charging"],
    status: "available",
    meetings: [],
    image: "/meeting-rooms/meeting-room-firefly.webp",
  },
  {
    id: "toorchwood",
    name: "Toorchwood",
    description: "Executive meeting room with premium amenities",
    location: "Floor 4, North Wing",
    capacity: 12,
    amenities: ["4K TV", "Conference Phone", "Mini Fridge"],
    status: "available",
    meetings: [],
    image: "/meeting-rooms/meeting-room-torchwood.webp",
  },
];
