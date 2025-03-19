import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../lib/mongo";
import User from "../../../models/User";
import CodeSnippet from "../../../models/CodeSnippet"; // A model to store saved code

export async function POST(req) {
  try {
    const token = req.headers.get("Authorization")?.split("Bearer ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectToDatabase();
    const user = await User.findById(decoded.id);
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { roomId, language, code } = await req.json();
    const savedCode = new CodeSnippet({ userId: user._id, roomId, language, code });
    await savedCode.save();

    return NextResponse.json({ message: "Code saved successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error saving code:", error);
    return NextResponse.json({ error: "Failed to save code" }, { status: 500 });
  }
}
