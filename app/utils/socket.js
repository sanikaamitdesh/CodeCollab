import { io } from "socket.io-client";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL||"http://localhost:4000";
const socket = io(BACKEND_URL, {
  transports: ["websocket", "polling"],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

socket.on("connect_error", (err) => {
  console.error("🚨 WebSocket Connection Error:", err);
  setTimeout(() => {
    console.log("🔄 Reconnecting WebSocket...");
    socket.connect();
  }, 3000);
});

export default socket;
