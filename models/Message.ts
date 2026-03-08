// models/Message.ts
import mongoose, { Schema, models } from "mongoose";

const messageSchema = new Schema(
  {
    recipientUsername: {
      type: String,
      required: true,
      index: true, // Speeds up queries when the dashboard looks for messages
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = models.Message || mongoose.model("Message", messageSchema);
export default Message;