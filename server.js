import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import next from "next";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const allowedOrigins = [
  "https://codecollab-2-u456.onrender.com",
  "http://localhost:3000"
];

const videoRooms = {}; // To track video call users
const rooms = {};      // For file/code/chat

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  }); 

  io.on("connection", (socket) => {
    console.log("⚡ Connected:", socket.id);

    // 🧑‍💻 VIDEO CALLING
    socket.on("join-video", ({ roomId }) => {
      if (!videoRooms[roomId]) videoRooms[roomId] = [];

      videoRooms[roomId].forEach((existingSocketId) => {
        socket.emit("user-joined-video", { peerId: existingSocketId });
      });

      videoRooms[roomId].push(socket.id);
      socket.join(roomId);
      socket.to(roomId).emit("user-joined-video", { peerId: socket.id });

      console.log(`🟢 ${socket.id} joined video in room ${roomId}`);
    });

    socket.on("leave-video", ({ roomId }) => {
      if (videoRooms[roomId]) {
        videoRooms[roomId] = videoRooms[roomId].filter((id) => id !== socket.id);
        socket.to(roomId).emit("user-left-video", { peerId: socket.id });
        console.log(`🔴 ${socket.id} left video in room ${roomId}`);
      }
    });

    socket.on("video-offer", ({ target, caller, sdp }) => {
      io.to(target).emit("video-offer", { caller, sdp });
    });

    socket.on("video-answer", ({ target, caller, sdp }) => {
      io.to(target).emit("video-answer", { caller, sdp });
    });

    socket.on("ice-candidate", ({ target, from, candidate }) => {
      io.to(target).emit("ice-candidate", { from, candidate });
    });

    // 💻 FILE & CHAT HANDLERS
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      if (!rooms[roomId]) rooms[roomId] = { files: [], messages: [] };
      socket.emit("filesUpdate", rooms[roomId].files);
    });

    socket.on("filesUpdate", ({ roomId, files }) => {
      if (!rooms[roomId]) rooms[roomId] = { files: [], messages: [] };
      rooms[roomId].files = files;
      io.to(roomId).emit("filesUpdate", files);
    });

    socket.on("codeChange", ({ roomId, fileName, code }) => {
      const fileList = rooms[roomId]?.files || [];
      const index = fileList.findIndex(f => f.name === fileName);
      if (index !== -1) {
        fileList[index].content = code;
        socket.to(roomId).emit("codeChange", { fileName, code });
      }
    });

    socket.on("sendMessage", ({ roomId, message, username }) => {
      if (!rooms[roomId]) rooms[roomId] = { files: [], messages: [] };
      rooms[roomId].messages.push({ username, message });
      io.to(roomId).emit("receiveMessage", { username, message });
    });

    socket.on("disconnect", () => {
      console.log("❌ Disconnected:", socket.id);
      for (const roomId in videoRooms) {
        if (videoRooms[roomId].includes(socket.id)) {
          videoRooms[roomId] = videoRooms[roomId].filter((id) => id !== socket.id);
          socket.to(roomId).emit("user-left-video", { peerId: socket.id });
        }
      }
    });
  });

  // Serve Next.js frontend
  app.all("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
