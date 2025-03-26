"use client";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("/api/rooms", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        if (res.ok) {
          setRooms(data.rooms || []);
        } else {
          console.error("Failed to fetch rooms:", data.error);
        }
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Your Rooms</h1>

      {loading ? (
        <div className="flex justify-center items-center h-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500"></div>
        </div>
      ) : rooms.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {rooms.map((room) => (
            <div
              key={room.roomId}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 cursor-pointer border border-gray-700 hover:border-blue-500"
            >
              <p className="text-lg font-semibold text-center">Room ID: <span className="text-blue-400">{room.roomId}</span></p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No rooms found 😕</p>
      )}
    </div>
  );
}
