const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
  pingInterval: 25000,
  pingTimeout: 5000,
});

const rooms = {}; // Store room data

io.on("connection", (socket) => {
  console.log(`🔗 New User Connected: ${socket.id}`);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`👥 User joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] ={ code: "// Start coding...",
        language: "javascript",
      messages: [],}
    }
    socket.emit("loadCode", rooms[roomId]);
    socket.emit("loadMessages", rooms[roomId].messages);

    socket.on("codeChange", ({ roomId, code }) => {
      rooms[roomId] = code;
      console.log(`✏️ Code Updated in Room ${roomId}:`, code);
      socket.to(roomId).emit("updateCode", code);
    });
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    if (rooms[roomId]) {
      const newMessage = { id: socket.id, message };
      rooms[roomId].messages.push(newMessage);

      console.log(`💬 Message in Room ${roomId}:`, newMessage);

      // Broadcast the message to all users in the room
      io.to(roomId).emit("receiveMessage", newMessage);
    }
  });

  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
  });
});

// Start WebSocket server on port 4000
server.listen(4000, () => {
  console.log("✅ WebSocket Server Running on http://localhost:4000");
});
