import { io } from "socket.io-client";
const BACKEND_URL = "https://codecollab-2-u456.onrender.com";
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
