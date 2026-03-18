import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { username, email, password } = await req.json();

        await connectDB();

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return NextResponse.json({ message: "Email is already taken" }, { status: 400 });
        }

        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return NextResponse.json({ message: "Username is already taken" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });

        return NextResponse.json({ user, message: "User registered successfully!" }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ message: "An error occurred during registering user" }, { status: 500 })
    }
}