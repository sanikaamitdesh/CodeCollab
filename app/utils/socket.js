import { io } from "socket.io-client";

const socket = io("http://localhost:4000", {
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
