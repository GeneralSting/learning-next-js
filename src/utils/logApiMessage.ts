// utils/apiLogger.ts

import { LoggedRequestMessage } from "@/types/loggedRequestMessage";
import { RequestMessage } from "@/types/requestMessage";

export async function logApiMessage(message: RequestMessage) {
  const fullMessage: LoggedRequestMessage = {
    ...message,
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch("http://localhost:3100/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fullMessage),
    });
  } catch (err) {
    console.error("Failed to log API message:", err);
  }
}
