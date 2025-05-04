import io from "socket.io-client";
export const socket = io(import.meta.env.VITE_APP_WEBSOCKET_URL_LOCAL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});
