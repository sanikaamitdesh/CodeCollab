import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "@/lib/mongo";
import User from "@/models/User";
import Room from "@/models/Room";

// 🔹 Fetch rooms the user is part of
export async function GET(req) {
  try {
    await connectToDatabase();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Find rooms where the user is a member
    const rooms = await Room.find({ members: user._id });

    return NextResponse.json({ rooms }, { status: 200 });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 Create or Join Room (same endpoint)
export async function POST(req) {
  try {
    const { roomId } = await req.json();
    if (!roomId) return NextResponse.json({ error: "Room ID is required" }, { status: 400 });

    await connectToDatabase();

    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if room exists
    let room = await Room.findOne({ roomId });
    if (!room) {
      // Create new room and add user
      room = await Room.create({ roomId, members: [user._id] });
    } else {
      // If room exists, add user if not already a member
      if (!room.members.includes(user._id)) {
        room.members.push(user._id);
        await room.save();
      }
    }

    return NextResponse.json({ message: "Room created/joined successfully", room }, { status: 201 });
  } catch (error) {
    console.error("Error creating/joining room:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
