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

// // //   socket.on("joinRoom", (roomId) => {
// // //     socket.join(roomId);
// // //     console.log(`👥 User joined room: ${roomId}`);

// // //     if (!rooms[roomId]) {
// // //       rooms[roomId] ={ code: "// Start coding...",
// // //         language: "javascript",
// // //       messages: [],}
// // //     }
// // //     socket.emit("loadCode", rooms[roomId].code);
// // //     socket.emit("loadMessages", rooms[roomId].messages);
// // //   });

// // //   socket.on("sendMessage", ({ roomId, message }) => {
// // //     console.log(`💬 Received message for Room ${roomId}:`, message);
  
    
// // //     if (!rooms[roomId]) {
// // //       console.error(`❌ Room ${roomId} does not exist!`);
// // //       return;
// // //     }

// // //     if (!Array.isArray(rooms[roomId].messages)) {
// // //       rooms[roomId].messages = []; 
// // //     }
  
// // //     const newMessage = { id: socket.id, message };
// // //     rooms[roomId].messages.push(newMessage); 
// // //     console.log(`💬 Message added to Room ${roomId}:`, newMessage);
  

// // //     io.to(roomId).emit("receiveMessage", newMessage);
// // //   });

// // //   socket.on("codeChange", ({ roomId, code, language }) => {
// // //     if (!rooms[roomId]) {
// // //       rooms[roomId] = {};
// // //     }
// // //     rooms[roomId][language] = code;
// // //     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
// // //     socket.to(roomId).emit("updateCode", code);
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

// // const rooms = {};

// // io.on("connection", (socket) => {
// //   console.log(`🔗 New User Connected: ${socket.id}`);

// //   socket.onAny((event, ...args) => {
// //     console.log(`🛑 Received event: ${event}`, args);
// //   });  

// //   socket.onAny((event, ...args) => {
// //     console.log(`🛑 Received event: ${event}`, args);
// //   });  

// //   socket.on("joinRoom", ({ roomId, username }) => {
// //     socket.join(roomId);
// //     console.log(`👥 User (${username}) joined room: ${roomId}`);

// //     if (!rooms[roomId]) {
// //       rooms[roomId] = {
// //         code: "// Start coding...",
// //         language: "javascript",
// //         messages: [],
// //       };
// //     }

    
// //     socket.emit("loadCode", rooms[roomId].code);
// //     socket.emit("loadMessages", rooms[roomId].messages);

 
// //     const joinMessage = { username: "System", message: `${username} joined the room.` };
// //     rooms[roomId].messages.push(joinMessage);
// //     io.to(roomId).emit("receiveMessage", joinMessage);
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
  
// //     rooms[roomId].code = code; // Save the latest code for the room
// //     rooms[roomId].language = language;
  
// //     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
  
// //     // Broadcast the change to everyone **including the sender**
// //     io.to(roomId).emit("updateCode", code);
// //   });
  

// //   // // Handle video chat signaling
// //   // socket.on("join-video", ({ roomId, userId }) => {
// //   //   // Notify all users in the room that a new user joined
// //   //   console.log(`📹 User ${userId} joined video in room ${roomId}`);
// //   //   io.to(roomId).emit("user-joined-video", { peerId: userId })
// //   // })
  
// //   // // socket.on("join-video", (data) => {
// //   // //   console.log("📹 join-video event received!", data);
// //   // // });
  
// //   // socket.on("video-offer", ({ roomId, target, caller, sdp }) => {
// //   //   console.log(`📡 Sending video offer from ${caller} to ${target}`);
// //   //   io.to(target).emit("video-offer", { caller, sdp })
// //   // })

// //   // socket.on("video-answer", ({ roomId, target, caller, sdp }) => {
// //   //   console.log(`✅ Sending video answer from ${caller} to ${target}`);
// //   //   io.to(target).emit("video-answer", { caller, sdp })
// //   // })

// //   // socket.on("ice-candidate", ({ roomId, target, from, candidate }) => {
// //   //   console.log(`❄️ Sending ICE candidate from ${from} to ${target}`);
// //   //   io.to(target).emit("ice-candidate", { from, candidate })
// //   // })

// //   // socket.on("leave-video", ({ roomId, userId }) => {
// //   //   console.log(`🚪 User ${userId} left video chat in room ${roomId}`);
// //   //   io.to(roomId).emit("user-left-video", { peerId: userId })
// //   // })

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

//   socket.onAny((event, ...args) => {
//     console.log(`🛑 Received event: ${event}`, args);
//   });  

//   socket.onAny((event, ...args) => {
//     console.log(`🛑 Received event: ${event}`, args);
//   });  
//   socket.on("joinRoom", ({ roomId, username }) => {
//     socket.join(roomId);
//     console.log(`👥 User (${username}) joined room: ${roomId}`);
  
//     if (!rooms[roomId]) {
//       rooms[roomId] = {
//         code: {},  // Store code separately for each language
//         language: "javascript",
//         messages: [],
//       };
//     }
  
//     // Get the current language from the room or use the default (JavaScript)
//     const currentLanguage = rooms[roomId].language;
//     const existingCode = rooms[roomId].code[currentLanguage];
  
//     // Send existing code if present, otherwise send the boilerplate for that language
//     const codeToSend = existingCode || boilerplates[currentLanguage];
//     socket.emit("loadCode", codeToSend);
//     socket.emit("loadMessages", rooms[roomId].messages);
  
//     const joinMessage = {
//       username: "System",
//       message: `${username} joined the room.`,
//     };
//     rooms[roomId].messages.push(joinMessage);
//     io.to(roomId).emit("receiveMessage", joinMessage);
//   });
  

//   socket.on("sendMessage", ({ roomId, message, username }) => {
//     console.log(`💬 Received message from ${username} for Room ${roomId}:`, message);

//     if (!rooms[roomId]) {
//       console.error(`❌ Room ${roomId} does not exist!`);
//       return;
//     }

//     if (!Array.isArray(rooms[roomId].messages)) {
//       rooms[roomId].messages = [];
//     }

//     const newMessage = { username, message };
//     rooms[roomId].messages.push(newMessage); 
//     console.log(`💬 Message added to Room ${roomId}:`, newMessage);

//     io.to(roomId).emit("receiveMessage", newMessage); 
//   });

//   socket.on("codeChange", ({ roomId, code, language }) => {
//     if (!rooms[roomId]) {
//       rooms[roomId] = { code: "", language: "javascript", messages: [] };
//     }
  
//     rooms[roomId].code = code; // Save the latest code for the room
//     rooms[roomId].language = language;
  
//     console.log(`✏️ Code Updated in Room ${roomId} (${language}):`, code);
  
//     // Broadcast the change to everyone **including the sender**
//     io.to(roomId).emit("updateCode", code);
//   });
  

//   // // Handle video chat signaling
//   // socket.on("join-video", ({ roomId, userId }) => {
//   //   // Notify all users in the room that a new user joined
//   //   console.log(`📹 User ${userId} joined video in room ${roomId}`);
//   //   io.to(roomId).emit("user-joined-video", { peerId: userId })
//   // })
  
//   // // socket.on("join-video", (data) => {
//   // //   console.log("📹 join-video event received!", data);
//   // // });
  
//   // socket.on("video-offer", ({ roomId, target, caller, sdp }) => {
//   //   console.log(`📡 Sending video offer from ${caller} to ${target}`);
//   //   io.to(target).emit("video-offer", { caller, sdp })
//   // })

//   // socket.on("video-answer", ({ roomId, target, caller, sdp }) => {
//   //   console.log(`✅ Sending video answer from ${caller} to ${target}`);
//   //   io.to(target).emit("video-answer", { caller, sdp })
//   // })

//   // socket.on("ice-candidate", ({ roomId, target, from, candidate }) => {
//   //   console.log(`❄️ Sending ICE candidate from ${from} to ${target}`);
//   //   io.to(target).emit("ice-candidate", { from, candidate })
//   // })

//   // socket.on("leave-video", ({ roomId, userId }) => {
//   //   console.log(`🚪 User ${userId} left video chat in room ${roomId}`);
//   //   io.to(roomId).emit("user-left-video", { peerId: userId })
//   // })

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log(`❌ User Disconnected: ${socket.id}`);
//     // console.log(`User disconnected from room ${roomId}`)
//   });
// });

// // Start WebSocket server on port 4000
// server.listen(4000, () => {
//   console.log("✅ WebSocket Server Running on http://localhost:4000");
// });






//works as of now
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

  // Handle joining a room
  socket.on("joinRoom", ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`👥 User (${username}) joined room: ${roomId}`);

    if (!rooms[roomId]) {
      rooms[roomId] = {
        messages: [],  // Chat messages
        users: [],  // Users in the room for video chat
      };
    }

    // Add user to the room's user list
    rooms[roomId].users.push({ id: socket.id, username });

    // Send the existing messages to the new user
    socket.emit("loadMessages", rooms[roomId].messages);

    // Notify other users about the new user
    const joinMessage = {
      username: "System",
      message: `${username} joined the room.`,
    };
    rooms[roomId].messages.push(joinMessage);
    io.to(roomId).emit("receiveMessage", joinMessage);
  });

  // Handle chat messages
  socket.on("sendMessage", ({ roomId, message, username }) => {
    const newMessage = { username, message };
    rooms[roomId].messages.push(newMessage);
    console.log(`💬 Message from ${username} in Room ${roomId}:`, message);

    // Broadcast the message to all users in the room
    io.to(roomId).emit("receiveMessage", newMessage);
  });

  // Handle video signaling (WebRTC)
  socket.on("video-offer", ({ target, caller, sdp }) => {
    console.log(`📡 Video offer from ${caller} to ${target}`);
    io.to(target).emit("video-offer", { caller, sdp });
  });

  socket.on("video-answer", ({ target, caller, sdp }) => {
    console.log(`✅ Video answer from ${caller} to ${target}`);
    io.to(target).emit("video-answer", { caller, sdp });
  });

  socket.on("ice-candidate", ({ target, candidate }) => {
    console.log(`❄️ ICE candidate sent to ${target}`);
    io.to(target).emit("ice-candidate", { candidate });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`❌ User Disconnected: ${socket.id}`);

    // Remove the user from all rooms
    for (const roomId in rooms) {
      rooms[roomId].users = rooms[roomId].users.filter((user) => user.id !== socket.id);
      const leaveMessage = {
        username: "System",
        message: `A user has disconnected.`,
      };
      rooms[roomId].messages.push(leaveMessage);
      io.to(roomId).emit("receiveMessage", leaveMessage);
    }
  });
});

// Start WebSocket server on port 4000
server.listen(4000, () => {
  console.log("✅ WebSocket Server Running on http://localhost:4000");
});
