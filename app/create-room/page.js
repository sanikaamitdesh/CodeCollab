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
      const username=data.username;

      router.push(`/room/${roomId}?username=${username}`);
    } catch (error) {
      console.error("Error creating room:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4 py-8 text-white">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
          Create Room
        </h1>
        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="w-full sm:w-auto bg-green-600 px-6 py-3 rounded text-white hover:bg-green-700 transition disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>
      </div>
    </div>
  );
 
}
