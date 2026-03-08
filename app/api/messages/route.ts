import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Message from "@/models/Message";

export async function POST(req: Request) {
  try {
    const { username, content } = await req.json();

    // 1. Basic validation
    if (!username || !content) {
      return NextResponse.json(
        { message: "Username and content are required." },
        { status: 400 }
      );
    }

    await connectDB();

    // 2. Verify the target user actually exists
    const targetUser = await User.findOne({ username });
    
    if (!targetUser) {
      return NextResponse.json(
        { message: "Target user not found in the system." },
        { status: 404 }
      );
    }

    // 3. Save the message to the database
    await Message.create({
      recipientUsername: username,
      content: content,
    });

    return NextResponse.json(
      { message: "Transmission successfully recorded." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Message creation error:", error);
    return NextResponse.json(
      { message: "Internal server error during transmission." },
      { status: 500 }
    );
  }
}