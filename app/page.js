"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">CodeCollab</h1>
      <input
        type="text"
        placeholder="Enter Room ID"
        className="p-2 border border-gray-400 rounded text-black"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button
        onClick={() => router.push(`/room/${roomId}`)}
        className="mt-4 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700"
      >
        Join Room
      </button>
      <button
        onClick={() => router.push(`/room/${uuidv4()}`)}
        className="mt-2 bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
      >
        Create Room
      </button>
    </div>
  );
}
