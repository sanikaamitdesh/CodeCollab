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
    socket.emit("loadCode", rooms[roomId].code);
    socket.emit("loadMessages", rooms[roomId].messages);
  });

  socket.on("sendMessage", ({ roomId, message }) => {
    console.log(`💬 Received message for Room ${roomId}:`, message);
  
    // Check if the room exists
    if (!rooms[roomId]) {
      console.error(`❌ Room ${roomId} does not exist!`);
      return; // Exit early if room does not exist
    }

    if (!Array.isArray(rooms[roomId].messages)) {
      rooms[roomId].messages = []; // Reinitialize if undefined or not an array
    }
  
    const newMessage = { id: socket.id, message };
    rooms[roomId].messages.push(newMessage); // Add message to the room
    console.log(`💬 Message added to Room ${roomId}:`, newMessage);
  
    // Broadcast the new message to everyone in the room
    io.to(roomId).emit("receiveMessage", newMessage);
  });

  socket.on("codeChange", ({ roomId, code, language }) => {
    if (rooms[roomId]) {
      rooms[roomId] = { code, language };
      console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
      socket.to(roomId).emit("updateCode", code);
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
