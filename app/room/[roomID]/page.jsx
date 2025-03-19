// "use client";

// import { useParams } from "next/navigation";
// import Editor from "../../components/Editor";

// export default function Room() {
//   const { roomID } = useParams();

//   return (
//     <div className="h-screen bg-gray-900 text-white p-4">
//       <h2 className="text-2xl mb-4">Room ID: {roomID}</h2>
//       <Editor roomId={roomID} />
//     </div>
//   );
// }

"use client";
import { useParams,useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Editor from "../../components/Editor";
import VideoChat from "@/app/components/video-chat";
import ChatRoom from "../../components/Chat"
export default function RoomPage() {
  const {roomID} = useParams();
  // const roomID = params.roomId;
  const [socket, setSocket] = useState(null);
  const [userId] = useState(() => uuidv4());
  const [showVideo, setShowVideo] = useState(false);
  console.log("Room id :", roomID);

  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  useEffect(() => {
    if (!roomID) return; // Prevent running if roomID is undefined
    // Connect to socket server
    const socketInstance = io("http://localhost:4000",
      {
        query: { roomID },
      }
    );

    setSocket(socketInstance);

    // Clean up on unmount
    return () => {
      socketInstance.disconnect();
    };
  }, [roomID]);

  if (!socket) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Connecting...
      </div>
    );
  }

  // console.log("socket :",socket)

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">CodeCollab: Room {roomID}</h1>
        <button
          onClick={() => setShowVideo(!showVideo)}
          className={`px-4 py-2 rounded ${
            showVideo ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {showVideo ? "Hide Video" : "Show Video"}
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Your existing collaboration features would go here */}
        <div className={`${showVideo ? "md:w-1/2" : "w-full"} bg-gray-800 p-4`}>
          <div className="bg-gray-700 rounded p-4 h-full">
            {/* Your code editor or other collaboration tools */}
            <Editor roomId={roomID} />
          </div>
        </div>

        {/* Video chat section */}
        {showVideo && socket && (
          <div className="md:w-1/2 bg-gray-800 p-4">
            <VideoChat
              roomId={roomID}
              socket={socket}
              userId={userId}
              setShowVideo={setShowVideo}
            />
          </div>
        )}


<div className="bg-gray-800 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-xl font-semibold mb-2">Live Group Chat</h3>
          <ChatRoom roomId={roomID} username={username} />
        </div>
      </div>
    </div>
  );
}
