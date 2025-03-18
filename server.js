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

// const rooms = {}; // Store room data

// io.on("connection", (socket) => {
//   console.log(`🔗 New User Connected: ${socket.id}`);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`👥 User joined room: ${roomId}`);

//     if (!rooms[roomId]) {
//       rooms[roomId] = { code: "// Start coding...", language: "javascript" };
//     }
//     socket.emit("loadCode", rooms[roomId].code);
//   });

//   socket.on("codeChange", ({ roomId, code, language }) => {
//     if (rooms[roomId]) {
//       rooms[roomId] = { code, language };
//       console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
//       socket.to(roomId).emit("updateCode", code);
//     }
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

const rooms = {}; // Store room data with language-specific code

io.on("connection", (socket) => {
  console.log(`🔗 New User Connected: ${socket.id}`);

  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`👥 User joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {};
    }

    // Emit default language code or an empty string if not available
    const defaultLanguage = "javascript";
    const existingCode = rooms[roomId][defaultLanguage] || null;
    socket.emit("loadCode", existingCode);
  });

  socket.on("loadCode", ({ roomId, language }) => {
    const code = rooms[roomId]?.[language] || null;
    socket.emit("loadCode", code);
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