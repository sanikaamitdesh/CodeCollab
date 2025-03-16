"use client";

import { useParams } from "next/navigation";
import Editor from "../../components/Editor";

export default function Room() {
  const { roomID } = useParams();

  return (
    <div className="h-screen bg-gray-900 text-white p-4">
      <h2 className="text-2xl mb-4">Room ID: {roomID}</h2>
      <Editor roomId={roomID} />
    </div>
  );
}
