import { useState, useEffect ,useRef} from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function ChatRoom({ roomId }) {
    const socketRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socketRef.current = io("http://localhost:4000");
    socketRef.current.emit("joinRoom", roomId);
    console.log(`Connected to Room: ${roomId}`);

    socketRef.current.on("loadMessages", (existingMessages) => {
        setMessages(existingMessages);
      });
  

    socketRef.current.on("receiveMessage", (newMessage) => {
        console.log("Received new message:", newMessage);
        setMessages((prev) => [...prev, newMessage]);
      });

    return () => {
        if (socketRef.current) {
            sendMessage("User has left the room");
            socketRef.current.disconnect();
          }
        };
  }, [roomId]);

//   const sendMessage = () => {
//     if (message.trim()) {
//       socket.emit("sendMessage", { roomId, message });
//       setMessage("");
//     }
//   };

const sendMessage = () => {
    if (message.trim()) {
      // Update messages optimistically
    //   setMessages((prev) => [
    //     ...prev,
    //     { id: "You", message }, // Add local message with a placeholder ID
    //   ]);

      if (socketRef.current) {
        socketRef.current.emit("sendMessage", { roomId, message });
        console.log("Message sent:", message);
      } else {
        console.warn("Socket is not connected!");
      }
  
      // Clear the input field
      setMessage("");
    }
  };

  return (
    <div className="p-4 border rounded-lg">
      <div className="h-64 overflow-y-auto bg-gray-100 p-2 rounded-lg mb-4">
        {messages.map((msg, index) => (
          <div key={index} className="text-sm mb-2 text-black">
            <strong>{msg.id || "Username"}</strong>: {msg.message}
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
