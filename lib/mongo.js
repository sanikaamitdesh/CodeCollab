// // import mongoose from "mongoose";

// // const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codecollab";

// // export async function connectToDatabase() {
// //   if (mongoose.connection.readyState >= 1) {
// //     return;
// //   }
// //   await mongoose.connect(MONGODB_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true,
// //   });
// // }

// const mongoose = require("mongoose");

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codecollab";

// async function connectToDatabase() {
//   if (mongoose.connection.readyState >= 1) {
//     console.log("✅ MongoDB is already connected");
//     return;
//   }
//   try {
//     await mongoose.connect(MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log("✅ MongoDB connected successfully");
//   } catch (error) {
//     console.error("❌ MongoDB connection error:", error);
//     throw new Error("Database connection failed");
//   }
// }

// module.exports = connectToDatabase;



import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/codecollab";

async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) {
    console.log("✅ MongoDB is already connected");
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    throw new Error("Database connection failed");
  }
}

export { connectToDatabase };
