// // // import { NextResponse } from "next/server";
// // // import jwt from "jsonwebtoken";
// // // import { connectToDatabase } from "../../../lib/mongo";
// // // import User from "../../../models/User";
// // // import CodeSnippet from "../../../models/CodeSnippet"; // A model to store saved code

// // // export async function POST(req) {
// // //   try {
// // //     const token = req.headers.get("Authorization")?.split("Bearer ")[1];
// // //     if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// // //     await connectToDatabase();
// // //     const user = await User.findById(decoded.id);
// // //     if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

// // //     const { roomId, language, code } = await req.json();
// // //     const savedCode = new CodeSnippet({ userId: user._id, roomId, language, code });
// // //     await savedCode.save();

// // //     return NextResponse.json({ message: "Code saved successfully!" }, { status: 201 });
// // //   } catch (error) {
// // //     console.error("Error saving code:", error);
// // //     return NextResponse.json({ error: "Failed to save code" }, { status: 500 });
// // //   }
// // // }


// // const connectToDatabase = require('../../../lib/mongo');
// // const Code = require('../../../models/Code');

// // export async function POST(req) {
// //   try {
// //     // Connect to MongoDB
// //     await connectToDatabase();

// //     const { roomId, language, code } = await req.json();

// //     // Save code to the database
// //     const newCode = new Code({ roomId, language, code });
// //     await newCode.save();

// //     console.log("✅ Code saved to MongoDB");
// //     return new Response(JSON.stringify({ message: 'Code saved successfully!' }), {
// //       status: 200,
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //   } catch (error) {
// //     console.error('❌ Error saving code:', error);
// //     return new Response(JSON.stringify({ error: 'Internal server error' }), {
// //       status: 500,
// //       headers: {
// //         'Content-Type': 'application/json',
// //       },
// //     });
// //   }
// // }


















// import { connectToDatabase } from "@/lib/mongodb";
// import Code from "@/models/Code";

// export async function POST(req) {
//   try {
//     await connectToDatabase();

//     const { roomId, files } = await req.json();

//     // Save each file in the database
//     for (const file of files) {
//       const newCode = new Code({ roomId, language: file.language, code: file.content, fileName: file.name });
//       await newCode.save();
//     }

//     console.log("✅ All files saved to MongoDB");
//     return new Response(JSON.stringify({ message: "Files saved successfully!" }), { status: 200 });
//   } catch (error) {
//     console.error("❌ Error saving files:", error);
//     return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
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

// Handle POST requests
export async function POST(req) {
  try {
    await connectToDatabase();

    const { roomId, files } = await req.json();

    // Save each file to the database
    for (const file of files) {
      const newCode = new Code({
        roomId,
        fileName: file.name,
        language: file.language,
        content: file.content,
      });
      await newCode.save();
    }

    console.log("✅ All files saved to MongoDB");
    return NextResponse.json({ message: "Files saved successfully!" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error saving files:", error);
    return NextResponse.json({ error: "Failed to save files" }, { status: 500 });
  }
}
