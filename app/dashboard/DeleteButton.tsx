
"use client";

import { useState } from "react";
import { deleteMessage } from "@/lib/actions/message";

export default function DeleteButton({ messageId }: { messageId: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Confirm permanent deletion of this transmission?")) return;
    
    setIsDeleting(true);
    try {
      await deleteMessage(messageId);
    } catch (error) {
      alert("Failed to delete.");
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-900 hover:text-red-500 font-mono text-xs uppercase tracking-widest transition-colors disabled:opacity-50"
    >
      {isDeleting ? "[ WIPING... ]" : "[ Delete ]"}
    </button>
  );
}