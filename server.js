// const { Server } = require("socket.io");
// const http = require("http");
// const express = require("express");

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
//   transports: ["websocket", "polling"],
//   pingInterval: 25000,
//   pingTimeout: 5000,
// });

// const rooms = {};

// io.on("connection", (socket) => {
//   console.log(`🔗 New User Connected: ${socket.id}`);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`👥 User joined room: ${roomId}`);

//     if (!rooms[roomId]) {
//       rooms[roomId] ={ code: "// Start coding...",
//         language: "javascript",
//       messages: [],}
//     }
//     socket.emit("loadCode", rooms[roomId].code);
//     socket.emit("loadMessages", rooms[roomId].messages);
//   });

//   socket.on("sendMessage", ({ roomId, message }) => {
//     console.log(`💬 Received message for Room ${roomId}:`, message);
  
    
//     if (!rooms[roomId]) {
//       console.error(`❌ Room ${roomId} does not exist!`);
//       return;
//     }

//     if (!Array.isArray(rooms[roomId].messages)) {
//       rooms[roomId].messages = []; 
//     }
  
//     const newMessage = { id: socket.id, message };
//     rooms[roomId].messages.push(newMessage); 
//     console.log(`💬 Message added to Room ${roomId}:`, newMessage);
  

//     io.to(roomId).emit("receiveMessage", newMessage);
//   });

//   socket.on("codeChange", ({ roomId, code, language }) => {
//     if (!rooms[roomId]) {
//       rooms[roomId] = {};
//     }
//     rooms[roomId][language] = code;
//     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
//     socket.to(roomId).emit("updateCode", code);
//   });

  

//   socket.on("disconnect", () => {
//     console.log(`❌ User Disconnected: ${socket.id}`);
//   });
// });

// // Start WebSocket server on port 4000
// server.listen(4000, () => {
//   console.log("✅ WebSocket Server Running on http://localhost:4000");
// });








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

  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`👥 User (${username}) joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        code: "// Start coding...",
        language: "javascript",
        messages: [],
      };
    }

    
    socket.emit("loadCode", rooms[roomId].code);
    socket.emit("loadMessages", rooms[roomId].messages);

 
    const joinMessage = { username: "System", message: `${username} joined the room.` };
    rooms[roomId].messages.push(joinMessage);
    io.to(roomId).emit("receiveMessage", joinMessage);
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
      rooms[roomId] = {};
    }
    rooms[roomId][language] = code;
    console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
    socket.to(roomId).emit("updateCode", code);
  });

  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);
  });
});

// Start WebSocket server on port 4000
server.listen(4000, () => {
  console.log("✅ WebSocket Server Running on http://localhost:4000");
});
