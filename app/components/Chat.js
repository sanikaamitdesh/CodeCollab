import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatRoom({ roomId, username }) {
  const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
 
    socketRef.current = io("http://localhost:4000");
    

    socketRef.current.emit("joinRoom", { roomId, username });
    console.log(`Connected to Room: ${roomId} as ${username}`);

    socketRef.current.on("loadMessages", (existingMessages) => {
      setMessages(existingMessages);
    });

    
    socketRef.current.on("receiveMessage", (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", {
          roomId,
          message: `${username} has left the room.`,
          username: "System",
        });
        socketRef.current.disconnect();
      }
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (message.trim()) {
      if (socketRef.current) {
        socketRef.current.emit("sendMessage", { roomId, message, username });
        console.log(`Message sent: "${message}" by ${username}`);
      } else {
        console.warn("Socket is not connected!");
      }
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

