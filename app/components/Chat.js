import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL||"http://localhost:4000";
const socket = io(BACKEND_URL);

export default function ChatRoom({ roomId, username }) {
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io(BACKEND_URL); // ✅ Create socket only once
    }

    const socket = socketRef.current;
    
    socket.emit("joinRoom", roomId);
    console.log(`✅ Connected to Room: ${roomId} as ${username}`);

    // Notify others when a user joins
    socket.emit("sendMessage", {
      roomId,
      message: `${username} has joined the room.`,
      username: "System",
    });

    socket.on("receiveMessage", (newMessage) => {
      console.log("📩 Received new message:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      // Notify others when user leaves
      socket.emit("sendMessage", {
        roomId,
        message: `${username} has left the room.`,
        username: "System",
      });
      socket.disconnect();
      socketRef.current = null; // ✅ Ensure it resets
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (message.trim() && socketRef.current) {
      socketRef.current.emit("sendMessage", { roomId, message, username });
      console.log(`📤 Message sent: "${message}" by ${username}`);
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded-lg mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm mb-2 text-black">
            <strong>{msg.username || "Unknown"}</strong>: {msg.message}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          type="text"
          className="flex-grow p-2 border rounded-lg"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button
          className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
