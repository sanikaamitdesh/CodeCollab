"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

export default function CreateRoom() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateRoom = async () => {
    setLoading(true);
    const roomId = uuidv4();

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a room.");
        router.push("/login");
        return;
      }

      const res = await fetch("/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ roomId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create room");

      router.push(`/room/${roomId}`);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Create Room</h1>
      <button
        onClick={handleCreateRoom}
        disabled={loading}
        className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
      >
        {loading ? "Creating..." : "Create Room"}
      </button>
    </div>
  );
}
