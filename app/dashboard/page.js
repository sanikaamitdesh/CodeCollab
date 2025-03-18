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
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-4">Your Rooms</h1>
      {loading ? <p>Loading...</p> : rooms.length > 0 ? rooms.map((room) => (
        <li key={room.roomId} className="bg-gray-700 p-2 rounded mb-2">{room.roomId}</li>
      )) : <p>No rooms found</p>}
    </div>
  );
}
