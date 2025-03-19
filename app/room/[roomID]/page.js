"use client";

import { useParams,useSearchParams } from "next/navigation";
import { io, Socket } from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Editor from "../../components/Editor";
import ChatRoom from "../../components/Chat";
import VideoChat from "@/app/components/video-chat";

export default function Room() {

  const {roomID} = useParams();
  // const roomID = params.roomId;
  const [socket, setSocket] = useState(null);
  const [userId] = useState(() => uuidv4());
  const [showVideo, setShowVideo] = useState(false);
  console.log("Room id :", roomID);

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

  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Room ID: {roomID}</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
     
        <div className="col-span-2 bg-gray-800 rounded-lg p-4 shadow-md overflow-hidden">
          <h3 className="text-xl font-semibold mb-2">Collaborative Code Editor</h3>
          <Editor roomId={roomID} username={username}/>
        </div>

 
        <div className="bg-gray-800 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-xl font-semibold mb-2">Live Group Chat</h3>
          <ChatRoom roomId={roomID} username={username} />
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
        
      </div>
    </div>
  );
}
