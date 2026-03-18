/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"; // MUST be at the very top

import Message from "@/models/Message";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { connectDB } from "../db";


export async function sendMessage(username: string, content: string) {
  try {
    await connectDB();

    if (!username || !content) {
      throw new Error("Username and content are required.");
    }

    // Verify the target user exists
    const targetUser = await User.findOne({ username });
    if (!targetUser) {
      throw new Error("Target user not found in the system.");
    }

    // Save the message to the database
    await Message.create({
      recipientUsername: username,
      content: content,
    });

    revalidatePath(`/dashboard`);

    return { success: true };
  } catch (error: any) {
    console.error("FULL PRODUCTION ERROR:", error);
    throw new Error(error.message || "Failed to transmit message.");
  }
}

/**
 * Server Action to delete a message
 */
export async function deleteMessage(messageId: string) {
  try {
    await connectDB();
    await Message.findByIdAndDelete(messageId);

    // Clears the cache and fetches fresh data for the dashboard
    revalidatePath("/dashboard");
    
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    throw new Error("Failed to delete the transmission.");
  }
}