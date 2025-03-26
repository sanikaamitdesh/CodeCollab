import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "../../../lib/mongo";
import User from "../../../models/User";

// 🔹 Signup API (POST Request)
export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists!" }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate JWT Token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET, // ✅ Use environment variable for security
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "User created successfully!", user: newUser, token },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in Signup API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 🔹 Login API (POST Request)
export async function PUT(req) {  // ✅ Change to POST if needed
  try {
    const { email, password } = await req.json();
    await connectToDatabase();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 400 });
    }

    // Compare entered password with stored hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // ✅ Use environment variable
      { expiresIn: "7d" }
    );

    return NextResponse.json(
      { message: "Login successful!", token, user: { id: user._id, username: user.username, email: user.email } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in Login API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}