// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { v4 as uuidv4 } from "uuid";

// export default function Home() {
//   const [roomId, setRoomId] = useState("");
//   const router = useRouter();

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold mb-4">CodeCollab</h1>
//       <input
//         type="text"
//         placeholder="Enter Room ID"
//         className="p-2 border border-gray-400 rounded text-black"
//         value={roomId}
//         onChange={(e) => setRoomId(e.target.value)}
//       />
//       <button
//         onClick={() => router.push(`/room/${roomId}`)}
//         className="mt-4 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
//       >
//         Join Room
//       </button>
//       <button
//         onClick={() => router.push(`/room/${uuidv4()}`)}
//         className="mt-2 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
//       >
//         Create Room
//       </button>
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import Link from "next/link";
export default function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const router = useRouter();

  return (
    <div className="h-screen bg-black text-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">CodeCollab</h1>
        <div>
        <button className="mx-2 text-sm text-gray-300 hover:text-white">
  <Link href="/signup">Sign Up</Link>
</button>
<button className="mx-2 text-sm text-gray-300 hover:text-white">
  <Link href="/login">Log In</Link>
</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-3xl font-bold mb-6">Try CodeCollab</h2>

        {/* Username Input */}
        <input
          type="text"
          placeholder="Enter your username"
          className="w-80 p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* Room ID Input */}
        <input
          type="text"
          placeholder="Enter Room ID"
          className="w-80 p-3 mb-4 border border-gray-600 rounded bg-gray-800 text-white placeholder-gray-400"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />

        {/* Buttons */}
        <button
          onClick={() => router.push(`/room/${roomId}?username=${username}`)}
          disabled={!username || !roomId}
          className={`w-80 p-3 mb-3 rounded ${
            username && roomId ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700 cursor-not-allowed"
          } text-white`}
        >
          Join Room
        </button>

        <button
          onClick={() => router.push(`/room/${uuidv4()}?username=${username}`)}
          disabled={!username}
          className={`w-80 p-3 rounded ${
            username ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 cursor-not-allowed"
          } text-white`}
        >
          Create Room
        </button>
      </div>
    </div>
  );
}
