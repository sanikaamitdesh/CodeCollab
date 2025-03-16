// import { Server } from "socket.io";

// export async function GET(req) {
//   if (!res.socket?.server) {
//     console.error("🚨 WebSocket server cannot start: `res.socket.server` is undefined.");
//     res.end();
//     return;
//   }

//   if (res.socket.server.io) {
//     console.log("⚡ WebSocket server already running");
//     res.end();
//     return;
//   }

//   console.log("🚀 Initializing WebSocket server...");

//   const io = new Server(res.socket.server, {
//     path: "/api/socket",
//     cors: {
//       origin: "*", 
//       methods: ["GET", "POST"]
//     },
//     transports: ["websocket", "polling"],
//     pingInterval: 25000, 
//     pingTimeout: 5000, 
//   });

//   const rooms = {}; // Store room data

//   io.on("connection", (socket) => {
//     console.log(`🔗 New User Connected: ${socket.id}`);

//     socket.on("joinRoom", (roomId) => {
//       socket.join(roomId);
//       console.log(`👥 User joined room: ${roomId}`);

//       if (!rooms[roomId]) {
//         rooms[roomId] = "// Start coding...";
//       }
//       socket.emit("loadCode", rooms[roomId]);

//       socket.on("codeChange", ({ roomId, code }) => {
//         rooms[roomId] = code;
//         console.log(`✏️ Code Updated in Room ${roomId}:`, code);
//         socket.to(roomId).emit("updateCode", code);
//       });
//     });

//     socket.on("disconnect", () => {
//       console.log(`❌ User Disconnected: ${socket.id}`);
//     });
//   });

//   res.socket.server.io = io;
//   console.log("✅ WebSocket Server Initialized Successfully");
//   res.end();
// }
