import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../lib/mongo";
import mongoose from "mongoose";

// Define the Code schema and model
const codeSchema = new mongoose.Schema({
  roomId: String,
  fileName: String,
  language: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
});

const Code = mongoose.models.Code || mongoose.model("Code", codeSchema);

export async function GET(req) {
  try {
    await connectToDatabase();

    // Extract roomId from the query parameters
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json({ error: "roomId is required" }, { status: 400 });
    }

    // Fetch files from MongoDB for the given roomId
    const files = await Code.find({ roomId }).select("fileName language content -_id");

    return NextResponse.json({ files }, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
