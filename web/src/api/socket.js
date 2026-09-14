import { io } from "socket.io-client";
import { API_URL } from "./config";
import { getAccessToken } from "./tokenStorage";

export function createChatSocket() {
  return io(API_URL, {
    auth: { token: getAccessToken() },
  });
}
