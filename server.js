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

const rooms = {};

io.on("connection", (socket) => {
  console.log(`🔗 New User Connected: ${socket.id}`);

  socket.onAny((event, ...args) => {
    console.log(`🛑 Received event: ${event}`, args);
  });  

  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`👥 User (${username}) joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        code: "",
        language: "javascript",
        messages: [],
      };
    }
    
    socket.emit("loadCode", rooms[roomId].code);
    socket.emit("loadMessages", rooms[roomId].messages);

 
    if(username && username !== "undefined")
      {
        const joinMessage = { username: "System", message: `${username} joined the room.` };
        rooms[roomId].messages.push(joinMessage);
        io.to(roomId).emit("receiveMessage", joinMessage);
      }
  });

  socket.on("sendMessage", ({ roomId, message, username }) => {
    console.log(`💬 Received message from ${username} for Room ${roomId}:`, message);

    if (!rooms[roomId]) {
      console.error(`❌ Room ${roomId} does not exist!`);
      return;
    }

    if (!Array.isArray(rooms[roomId].messages)) {
      rooms[roomId].messages = [];
    }

    const newMessage = { username, message };
    rooms[roomId].messages.push(newMessage); 
    console.log(`💬 Message added to Room ${roomId}:`, newMessage);

    io.to(roomId).emit("receiveMessage", newMessage); 
  });

  socket.on("codeChange", ({ roomId, code, language }) => {
    if (!rooms[roomId]) {
      rooms[roomId] = { code: "", language: "javascript", messages: [] };
    }

    // console.log(code);
    rooms[roomId].code = code; // Save the latest code for the room
    rooms[roomId].language = language;
  
    console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
  
    // Broadcast the change to everyone **including the sender**
    io.to(roomId).emit("updateCode", code);
  });
  

  // Handle video chat signaling
  socket.on("join-video", ({ roomId, userId }) => {
    // Notify all users in the room that a new user joined
    console.log(`📹 User ${userId} joined video in room ${roomId}`);
    io.to(roomId).emit("user-joined-video", { peerId: userId })
  })
  
  // socket.on("join-video", (data) => {
  //   console.log("📹 join-video event received!", data);
  // });
  
  socket.on("video-offer", ({ roomId, target, caller, sdp }) => {
    console.log(`📡 Sending video offer from ${caller} to ${target}`);
    io.to(target).emit("video-offer", { caller, sdp })
  })

  socket.on("video-answer", ({ roomId, target, caller, sdp }) => {
    console.log(`✅ Sending video answer from ${caller} to ${target}`);
    io.to(target).emit("video-answer", { caller, sdp })
  })

  socket.on("ice-candidate", ({ roomId, target, from, candidate }) => {
    console.log(`❄️ Sending ICE candidate from ${from} to ${target}`);
    io.to(target).emit("ice-candidate", { from, candidate })
  })

  socket.on("leave-video", ({ roomId, userId }) => {
    console.log(`🚪 User ${userId} left video chat in room ${roomId}`);
    io.to(roomId).emit("user-left-video", { peerId: userId })
  })

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
    // console.log(`User disconnected from room ${roomId}`)
  });
});

// Start WebSocket server on port 4000
server.listen(4000, () => {
  console.log("✅ WebSocket Server Running on http://localhost:4000");
});