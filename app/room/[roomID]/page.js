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

import { useParams } from "next/navigation";
import Editor from "../../components/Editor";
import ChatRoom from "../../components/Chat";

export default function Room() {
  const { roomID } = useParams();

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Room ID: {roomID}</h2>

      {/* Grid layout to separate code editor and chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
        {/* Code Editor Section */}
        <div className="col-span-2 bg-gray-800 rounded-lg p-4 shadow-md overflow-hidden">
          <h3 className="text-xl font-semibold mb-2">Collaborative Code Editor</h3>
          <Editor roomId={roomID} />
        </div>

        {/* Chat Section */}
        <div className="bg-gray-800 rounded-lg p-4 shadow-md h-full">
          <h3 className="text-xl font-semibold mb-2">Live Group Chat</h3>
          <ChatRoom roomId={roomID} />
        </div>
      </div>
    </div>
  );
}
