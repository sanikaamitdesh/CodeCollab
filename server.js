// // // // const { Server } = require("socket.io");
// // // // const http = require("http");
// // // // const express = require("express");

// // // // const app = express();
// // // // const server = http.createServer(app);

// // // // const io = new Server(server, {
// // // //   cors: {
// // // //     origin: "*",
// // // //     methods: ["GET", "POST"],
// // // //   },
// // // //   transports: ["websocket", "polling"],
// // // //   pingInterval: 25000,
// // // //   pingTimeout: 5000,
// // // // });

// // // // const rooms = {};

// // // // io.on("connection", (socket) => {
// // // //   console.log(`🔗 New User Connected: ${socket.id}`);

// // // //   socket.on("joinRoom", (roomId) => {
// // // //     socket.join(roomId);
// // // //     console.log(`👥 User joined room: ${roomId}`);

// // // //     if (!rooms[roomId]) {
// // // //       rooms[roomId] ={ code: "// Start coding...",
// // // //         language: "javascript",
// // // //       messages: [],}
// // // //     }
// // // //     socket.emit("loadCode", rooms[roomId].code);
// // // //     socket.emit("loadMessages", rooms[roomId].messages);
// // // //   });

// // // //   socket.on("sendMessage", ({ roomId, message }) => {
// // // //     console.log(`💬 Received message for Room ${roomId}:`, message);
  
    
// // // //     if (!rooms[roomId]) {
// // // //       console.error(`❌ Room ${roomId} does not exist!`);
// // // //       return;
// // // //     }

// // // //     if (!Array.isArray(rooms[roomId].messages)) {
// // // //       rooms[roomId].messages = []; 
// // // //     }
  
// // // //     const newMessage = { id: socket.id, message };
// // // //     rooms[roomId].messages.push(newMessage); 
// // // //     console.log(`💬 Message added to Room ${roomId}:`, newMessage);
  

// // // //     io.to(roomId).emit("receiveMessage", newMessage);
// // // //   });

// // // //   socket.on("codeChange", ({ roomId, code, language }) => {
// // // //     if (!rooms[roomId]) {
// // // //       rooms[roomId] = {};
// // // //     }
// // // //     rooms[roomId][language] = code;
// // // //     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
// // // //     socket.to(roomId).emit("updateCode", code);
// // // //   });

  

// // // //   socket.on("disconnect", () => {
// // // //     console.log(`❌ User Disconnected: ${socket.id}`);
// // // //   });
// // // // });

// // // // // Start WebSocket server on port 4000
// // // // server.listen(4000, () => {
// // // //   console.log("✅ WebSocket Server Running on http://localhost:4000");
// // // // });








// // // const { Server } = require("socket.io");
// // // const http = require("http");
// // // const express = require("express");

// // // const app = express();
// // // const server = http.createServer(app);

// // // const io = new Server(server, {
// // //   cors: {
// // //     origin: "*",
// // //     methods: ["GET", "POST"],
// // //   },
// // //   transports: ["websocket", "polling"],
// // //   pingInterval: 25000,
// // //   pingTimeout: 5000,
// // // });

// // // const rooms = {};

// // // io.on("connection", (socket) => {
// // //   console.log(`🔗 New User Connected: ${socket.id}`);

// // //   socket.on("joinRoom", ({ roomId, username }) => {
// // //     socket.join(roomId);
// // //     console.log(`👥 User (${username}) joined room: ${roomId}`);

// // //     if (!rooms[roomId]) {
// // //       rooms[roomId] = {
// // //         code: "// Start coding...",
// // //         language: "javascript",
// // //         messages: [],
// // //       };
// // //     }

    
// // //     socket.emit("loadCode", rooms[roomId].code);
// // //     socket.emit("loadMessages", rooms[roomId].messages);

 
// // //     const joinMessage = { username: "System", message: `${username} joined the room.` };
// // //     rooms[roomId].messages.push(joinMessage);
// // //     io.to(roomId).emit("receiveMessage", joinMessage);
// // //   });

// // //   socket.on("sendMessage", ({ roomId, message, username }) => {
// // //     console.log(`💬 Received message from ${username} for Room ${roomId}:`, message);

// // //     if (!rooms[roomId]) {
// // //       console.error(`❌ Room ${roomId} does not exist!`);
// // //       return;
// // //     }

// // //     if (!Array.isArray(rooms[roomId].messages)) {
// // //       rooms[roomId].messages = [];
// // //     }

// // //     const newMessage = { username, message };
// // //     rooms[roomId].messages.push(newMessage); 
// // //     console.log(`💬 Message added to Room ${roomId}:`, newMessage);

// // //     io.to(roomId).emit("receiveMessage", newMessage); 
// // //   });

// // //      // Emit default language code or an empty string if not available
// // //      const defaultLanguage = "javascript";
// // //      const existingCode = rooms[roomId][defaultLanguage] || null;
// // //      socket.emit("loadCode", existingCode);
   
 
// // //    socket.on("loadCode", ({ roomId, language }) => {
// // //      const code = rooms[roomId]?.[language] || null;
// // //      socket.emit("loadCode", code);
// // //    });
 

// // //   socket.on("codeChange", ({ roomId, code, language }) => {
// // //     if (!rooms[roomId]) {
// // //       rooms[roomId] = { code: "", language: "javascript", messages: [] };
// // //     }
  
// // //     rooms[roomId].code = code; // Save the latest code for the room
// // //     rooms[roomId].language = language;
  
// // //     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
  
// // //     // Broadcast the change to everyone **including the sender**
// // //     io.to(roomId).emit("updateCode", code);
// // //   });
  
// // //   socket.on("disconnect", () => {
// // //     console.log(`❌ User Disconnected: ${socket.id}`);
// // //   });
// // // });

// // // // Start WebSocket server on port 4000
// // // server.listen(4000, () => {
// // //   console.log("✅ WebSocket Server Running on http://localhost:4000");
// // // });





















// // // const { Server } = require("socket.io");
// // // const http = require("http");
// // // const express = require("express");

// // // const app = express();
// // // const server = http.createServer(app);

// // // const io = new Server(server, {
// // //   cors: {
// // //     origin: "*",
// // //     methods: ["GET", "POST"],
// // //   },
// // //   transports: ["websocket", "polling"],
// // //   pingInterval: 25000,
// // //   pingTimeout: 5000,
// // // });

// // // const rooms = {};

// // // // Boilerplate code for different languages
// // // const boilerplates = {
// // //   javascript: "console.log('Hello, World!');",
// // //   python: "print('Hello, World!')",
// // //   java: "public class Main {\n  public static void main(String[] args) {\n    System.out.println('Hello, World!');\n  }\n}",
// // //   c: "#include <stdio.h>\nint main() {\n  printf('Hello, World!');\n  return 0;\n}",
// // //   cpp: "#include <iostream>\nint main() {\n  std::cout << 'Hello, World!';\n  return 0;\n}",
// // // };

// // // io.on("connection", (socket) => {
// // //   console.log(`🔗 New User Connected: ${socket.id}`);

// // //   socket.on("joinRoom", ({ roomId, username }) => {
// // //     socket.join(roomId);
// // //     console.log(`👥 User (${username}) joined room: ${roomId}`);

// // //     // If the room doesn't exist, initialize it with a boilerplate code and default language
// // //     if (!rooms[roomId]) {
// // //       rooms[roomId] = {
// // //         code: boilerplates["javascript"], // Set default boilerplate (JavaScript)
// // //         language: "javascript",
// // //         messages: [],
// // //       };
// // //     }

// // //     // Send the existing code and messages when a user joins the room
// // //     socket.emit("loadCode", rooms[roomId].code);
// // //     socket.emit("loadMessages", rooms[roomId].messages);

// // //     const joinMessage = { username: "System", message: `${username} joined the room.` };
// // //     rooms[roomId].messages.push(joinMessage);
// // //     io.to(roomId).emit("receiveMessage", joinMessage);
// // //   });

// // //   socket.on("sendMessage", ({ roomId, message, username }) => {
// // //     console.log(`💬 Received message from ${username} for Room ${roomId}:`, message);

// // //     if (!rooms[roomId]) {
// // //       console.error(`❌ Room ${roomId} does not exist!`);
// // //       return;
// // //     }

// // //     if (!Array.isArray(rooms[roomId].messages)) {
// // //       rooms[roomId].messages = [];
// // //     }

// // //     const newMessage = { username, message };
// // //     rooms[roomId].messages.push(newMessage);
// // //     console.log(`💬 Message added to Room ${roomId}:`, newMessage);

// // //     io.to(roomId).emit("receiveMessage", newMessage);
// // //   });

// // //   socket.on("codeChange", ({ roomId, code, language }) => {
// // //     if (!rooms[roomId]) {
// // //       rooms[roomId] = { code: "", language: "javascript", messages: [] };
// // //     }

// // //     rooms[roomId].code = code; // Save the latest code for the room
// // //     rooms[roomId].language = language;

// // //     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);

// // //     // Broadcast the change to everyone *including the sender*
// // //     io.to(roomId).emit("updateCode", code);
// // //   });

// // //   socket.on("disconnect", () => {
// // //     console.log(`❌ User Disconnected: ${socket.id}`);
// // //   });
// // // });

// // // // Start WebSocket server on port 4000
// // // server.listen(4000, () => {
// // //   console.log("✅ WebSocket Server Running on http://localhost:4000");
// // // });


// // const { Server } = require("socket.io");
// // const http = require("http");
// // const express = require("express");

// // const app = express();
// // const server = http.createServer(app);

// // const io = new Server(server, {
// //   cors: {
// //     origin: "*",
// //     methods: ["GET", "POST"],
// //   },
// //   transports: ["websocket", "polling"],
// //   pingInterval: 25000,
// //   pingTimeout: 5000,
// // });

// // const rooms = {}; // Store room data with language-specific code

// // // Boilerplate code for each language
// // const boilerplates = {
// //   javascript: "console.log('Hello, World!');",
// //   python: "print('Hello, World!')",
// //   java: `public class Main {
// //   public static void main(String[] args) {
// //     System.out.println("Hello, World!");
// //   }
// // }`,
// //   c: `#include <stdio.h>
// // int main() {
// //   printf("Hello, World!");
// //   return 0;
// // }`,
// //   cpp: `#include <iostream>
// // int main() {
// //   std::cout << "Hello, World!";
// //   return 0;
// // }`,
// // };

// // io.on("connection", (socket) => {
// //   console.log(`🔗 New User Connected: ${socket.id}`);

// //   socket.onAny((event, ...args) => {
// //     console.log(`🛑 Received event: ${event}`, args);
// //   });  

// //   // socket.onAny((event, ...args) => {
// //   //   console.log(`🛑 Received event: ${event}`, args);
// //   // });  

// //   socket.on("joinRoom", ({ roomId, username }) => {
// //     socket.join(roomId);
// //     console.log(`👥 User (${username}) joined room: ${roomId}`);

// //     // Check if room exists, if not, initialize with boilerplate code
// //     if (!rooms[roomId]) {
// //       rooms[roomId] = {
// //         code: "",
// //         language: "javascript",
// //         messages: [],
// //       };
// //     }
    
// //     socket.emit("loadCode", rooms[roomId].code);
// //     socket.emit("loadMessages", rooms[roomId].messages);

// //     // Send a message to the room that a new user has joined
// //     if(username && username !== "undefined")
// //     {
// //       const joinMessage = { username: "System", message: `${username} joined the room.` };
// //       rooms[roomId].messages.push(joinMessage);
// //       io.to(roomId).emit("receiveMessage", joinMessage);
// //     }
// //   });

// //   socket.on("sendMessage", ({ roomId, message, username }) => {
// //     console.log(`💬 Received message from ${username} for Room ${roomId}:`, message);

// //     if (!rooms[roomId]) {
// //       console.error(`❌ Room ${roomId} does not exist!`);
// //       return;
// //     }

// //     if (!Array.isArray(rooms[roomId].messages)) {
// //       rooms[roomId].messages = [];
// //     }

// //     const newMessage = { username, message };
// //     rooms[roomId].messages.push(newMessage);
// //     console.log(`💬 Message added to Room ${roomId}:`, newMessage);

// //     io.to(roomId).emit("receiveMessage", newMessage);
// //   });

// //   socket.on("codeChange", ({ roomId, code, language }) => {
// //     if (!rooms[roomId]) {
// //       rooms[roomId] = { code: "", language: "javascript", messages: [] };
// //     }
  
// //     rooms[roomId].code = code; // ✅ Save the latest code
// //     rooms[roomId].language = language;

// //     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
  
// //     // ✅ Broadcast update to all other users EXCEPT the sender to prevent loops
// //     io.to(roomId).emit("updateCode", { code, language });  
// //     console.log(`✅ Emitted updateCode event to room ${roomId} (excluding sender)`);
// //   });
  


// //   // Handle video chat signaling
// //   socket.on("join-video", ({ roomId, userId }) => {
// //     // Notify all users in the room that a new user joined
// //     console.log(`📹 User ${userId} joined video in room ${roomId}`);
// //     io.to(roomId).emit("user-joined-video", { peerId: userId })
// //   })
  
// //   // socket.on("join-video", (data) => {
// //   //   console.log("📹 join-video event received!", data);
// //   // });
  
// //   socket.on("video-offer", ({ roomId, target, caller, sdp }) => {
// //     console.log(`📡 Sending video offer from ${caller} to ${target}`);
// //     io.to(target).emit("video-offer", { caller, sdp })
// //   })

// //   socket.on("video-answer", ({ roomId, target, caller, sdp }) => {
// //     console.log(`✅ Sending video answer from ${caller} to ${target}`);
// //     io.to(target).emit("video-answer", { caller, sdp })
// //   })

// //   socket.on("ice-candidate", ({ roomId, target, from, candidate }) => {
// //     console.log(`❄️ Sending ICE candidate from ${from} to ${target}`);
// //     io.to(target).emit("ice-candidate", { from, candidate })
// //   })

// //   socket.on("leave-video", ({ roomId, userId }) => {
// //     console.log(`🚪 User ${userId} left video chat in room ${roomId}`);
// //     io.to(roomId).emit("user-left-video", { peerId: userId })
// //   })

// //   // Handle disconnection
// //   socket.on("disconnect", () => {
// //     console.log(`❌ User Disconnected: ${socket.id}`);
// //     // console.log(`User disconnected from room ${roomId}`)
// //   });
// // });

// // // Start WebSocket server on port 4000
// // server.listen(4000, () => {
// //   console.log("✅ WebSocket Server Running on http://localhost:4000");
// // });

































// const express = require("express");
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"],
//   },
// });

// const rooms = {};

// io.on("connection", (socket) => {
//   console.log("⚡ New client connected:", socket.id);

//   socket.on("joinRoom", (roomId) => {
//     socket.join(roomId);
//     console.log(`📝 User joined room: ${roomId}`);

//     if (!rooms[roomId]) {
//       rooms[roomId] = [];
//     }

//     // Send the current file list to the newly joined user
//     socket.emit("filesUpdate", rooms[roomId]);
//   });

//   socket.on("filesUpdate", ({ roomId, files }) => {
//     rooms[roomId] = files;
//     io.to(roomId).emit("filesUpdate", files);
//   });

//   socket.on("codeChange", ({ roomId, fileName, code }) => {
//     const roomFiles = rooms[roomId] || [];
//     const fileIndex = roomFiles.findIndex((file) => file.name === fileName);

//     if (fileIndex !== -1) {
//       rooms[roomId][fileIndex].content = code;
//       socket.to(roomId).emit("codeChange", { fileName, code });
//     }
//   });


  

//   socket.on("disconnect", () => {
//     console.log("❌ Client disconnected:", socket.id);
//   });
// });

// server.listen(4000, () => {
//   console.log("🚀 Server running on http://localhost:4000");
// });









































// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// const app = express();
// const server = http.createServer(app);

// // ✅ Apply CORS + JSON parser middleware before any route or socket logic
// const allowedOrigins = [
//   "https://cool-bublanina-c947a8.netlify.app",
//   "http://localhost:3000",
// ];
// // Fix CORS preflight by explicitly handling OPTIONS
// app.options("*", cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "OPTIONS"],
//   credentials: true,
// }));

// app.use(cors({
//   origin: allowedOrigins,
//   methods: ["GET", "POST", "OPTIONS"],
//   credentials: true,
// }));
// app.use(express.json());

// // ✅ Define HTTP API routes BEFORE socket logic
// // In server.js

// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// Your existing User schema:
// const User = require("./models/User"); // Make sure path is correct

// Your MongoDB connection logic:
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB error", err));

// // Replace your old /api/auth with this:
// app.post("/api/auth", async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: "Missing required fields" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ error: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await User.create({ username, email, password: hashedPassword });

//     const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//     return res.status(201).json({ message: "Signup successful", user: newUser, token });
//   } catch (error) {
//     console.error("Signup error:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// ✅ Create Socket.IO instance AFTER routes
// server.js
import express from 'express';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import next from 'next';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000'];

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);

  // Apply middlewares
  app.use(cors({ origin: allowedOrigins, credentials: true }));
  app.use(express.json());

  // Example custom Express route (optional)
  app.get('/api/health', (req, res) => res.send('Server is healthy ✅'));

  // Handle Next.js routes
  app.all('*', (req, res) => handle(req, res));

  // ✅ Setup Socket.IO
  const io = new SocketServer(server, {
    cors: {
      origin: allowedOrigins,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  const rooms = {};

  io.on('connection', (socket) => {
    console.log('⚡ New client connected:', socket.id);

    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);
      if (!rooms[roomId]) rooms[roomId] = [];
      socket.emit('filesUpdate', rooms[roomId]);
    });

    socket.on('filesUpdate', ({ roomId, files }) => {
      rooms[roomId] = files;
      io.to(roomId).emit('filesUpdate', files);
    });

    socket.on('codeChange', ({ roomId, fileName, code }) => {
      const fileIndex = (rooms[roomId] || []).findIndex(f => f.name === fileName);
      if (fileIndex !== -1) {
        rooms[roomId][fileIndex].content = code;
        socket.to(roomId).emit('codeChange', { fileName, code });
      }
    });

    socket.on('sendMessage', ({ roomId, message, username }) => {
      if (!rooms[roomId]) rooms[roomId] = { messages: [] };
      if (!Array.isArray(rooms[roomId].messages)) rooms[roomId].messages = [];
      const msg = { username, message };
      rooms[roomId].messages.push(msg);
      io.to(roomId).emit('receiveMessage', msg);
    });

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected:', socket.id);
    });
  });

  const PORT = process.env.PORT || 4000;
  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
