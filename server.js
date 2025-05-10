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
















































const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
// const cors = require("cors");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const allowedOrigins = [
  "https://cool-bublanina-c947a8.netlify.app",  // your Netlify URL
  "http://localhost:3000",                      // local dev
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
}));

const CLIENT_ORIGIN = process.env.NEXT_PUBLIC_BACKEND_URL|| "http://localhost:3000";
const io = new Server(server, {
  cors: {
    // origin: "https://code-collab-black.vercel.app/",
    origin:CLIENT_ORIGIN,
    methods: ["GET", "POST"],
  },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log("⚡ New client connected:", socket.id);

  // Join room
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
    console.log(`📝 User joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }

    // Send the current file list to the newly joined user
    socket.emit("filesUpdate", rooms[roomId]);
  });

  // Update file list
  socket.on("filesUpdate", ({ roomId, files }) => {
    rooms[roomId] = files;
    io.to(roomId).emit("filesUpdate", files);
  });

  // Code change handling
  socket.on("codeChange", ({ roomId, fileName, code }) => {
    const roomFiles = rooms[roomId] || [];
    const fileIndex = roomFiles.findIndex((file) => file.name === fileName);

    if (fileIndex !== -1) {
      rooms[roomId][fileIndex].content = code;
      socket.to(roomId).emit("codeChange", { fileName, code });
    }
  });

  // Chat message handling
  socket.on("sendMessage", ({ roomId, message, username }) => {
    console.log(`💬 Received message from ${username} for Room ${roomId}:`, message);

    if (!rooms[roomId]) {
      rooms[roomId] = { messages: [] };
    }

    if (!Array.isArray(rooms[roomId].messages)) {
      rooms[roomId].messages = [];
    }

    const newMessage = { username, message };
    rooms[roomId].messages.push(newMessage);
    io.to(roomId).emit("receiveMessage", newMessage);
  });

  // Video chat signaling
  socket.on("join-video", ({ roomId, userId }) => {
    console.log(`📹 User ${userId} joined video in room ${roomId}`);
    io.to(roomId).emit("user-joined-video", { peerId: userId });
  });

  socket.on("video-offer", ({ roomId, target, caller, sdp }) => {
    console.log(`📡 Sending video offer from ${caller} to ${target}`);
    io.to(target).emit("video-offer", { caller, sdp });
  });

  socket.on("video-answer", ({ roomId, target, caller, sdp }) => {
    console.log(`✅ Sending video answer from ${caller} to ${target}`);
    io.to(target).emit("video-answer", { caller, sdp });
  });

  socket.on("ice-candidate", ({ roomId, target, from, candidate }) => {
    console.log(`❄️ Sending ICE candidate from ${from} to ${target}`);
    io.to(target).emit("ice-candidate", { from, candidate });
  });

  socket.on("leave-video", ({ roomId, userId }) => {
    console.log(`🚪 User ${userId} left video chat in room ${roomId}`);
    io.to(roomId).emit("user-left-video", { peerId: userId });
  });

  // Disconnect handling
  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });
});
app.post("/api/auth", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Simulate saving the user (you can add DB later)
  console.log(`✅ New signup: ${username}, ${email}`);
  
  return res.status(200).json({ message: "Signup successful!" });
});
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
