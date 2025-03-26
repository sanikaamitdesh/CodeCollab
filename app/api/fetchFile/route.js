
// import { NextResponse } from "next/server";
// import { connectToDatabase } from "../../../lib/mongo";
// import mongoose from "mongoose";

// // Define the Code schema and model
// const codeSchema = new mongoose.Schema({
//   roomId: String,
//   fileName: String,
//   language: String,
//   content: String,
//   createdAt: { type: Date, default: Date.now },
// });

// const Code = mongoose.models.Code || mongoose.model("Code", codeSchema);

// // Handle POST requests
// export async function GET() {
//   try {
//     await connectToDatabase();

   
//     const codes=Code.find();
//     console.log(codes)

//     // console.log("✅ All files saved to MongoDB");
//   } catch (error) {
//     console.error("❌ Error saving files:", error);
//     return NextResponse.json({ error: "Failed to save files" }, { status: 500 });
//   }
// }



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

// Handle GET requests
export async function GET(req) {
  try {
    await connectToDatabase();

    // Fetch all codes from the database
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");
    console.log(roomId)
    const codes = await Code.find({roomId}); // Use await here
    console.log("✅ Fetched codes from DB:", codes);

    return NextResponse.json(codes, { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching files:", error);
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 });
  }
}
