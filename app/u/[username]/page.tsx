/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, use } from "react";
import Link from "next/link";
import { sendMessage } from "@/lib/actions/message";

export default function PublicProfile({ params }: { params: Promise<{ username: string }> }) {
  // In Next.js 15+, params is a Promise that needs to be unwrapped with React.use()
  const { username } = use(params);
  
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    setStatus("loading");
    setErrorMessage("");

    try {
      // Execute the real API call
      await sendMessage(username, message);
      
      setStatus("success");
      setMessage(""); // Clear the box
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || "Failed to transmit message.");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 bg-grain flex flex-col items-center justify-center p-6 font-sans">
      
      <div className="w-full max-w-lg border border-neutral-800 bg-neutral-950 p-10 relative">
        
        {/* Header */}
        <div className="mb-8 border-b border-neutral-800 pb-6">
          <div className="inline-block border border-neutral-800 bg-neutral-900/50 px-3 py-1 text-xs font-mono text-neutral-400 mb-4 uppercase tracking-widest">
            Anonymous Target:
          </div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter truncate">
            @{username}
          </h1>
          <p className="text-neutral-500 font-medium mt-2 text-sm uppercase tracking-widest">
            Send a completely anonymous transmission. They wont know it was you.
          </p>
        </div>

        {/* The Submission Form */}
        {status === "success" ? (
          <div className="bg-neutral-900 border border-neutral-800 p-8 text-center animate-in fade-in zoom-in duration-300">
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Transmission Sent.</h3>
            <p className="text-neutral-500 font-mono text-sm mb-8">Your identity remains hidden.</p>
            <button 
              onClick={() => setStatus("idle")}
              className="text-white hover:text-neutral-400 font-mono text-xs uppercase tracking-widest transition-colors border-b border-white hover:border-neutral-400 pb-1"
            >
              Send Another
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {status === "error" && (
              <div className="bg-red-950/50 border border-red-900 text-red-500 p-4 text-sm font-mono">
                [ERROR]: {errorMessage}
              </div>
            )}

            <div className="flex flex-col gap-2">
              <textarea 
                rows={5}
                placeholder="TYPE YOUR TRUTH HERE..."
                className="w-full p-4 bg-neutral-900 border border-neutral-800 focus:border-white focus:bg-neutral-950 text-white placeholder-neutral-700 outline-none transition-colors rounded-none font-mono text-sm resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={500}
              />
              <div className="text-right text-xs font-mono text-neutral-600">
                {message.length} / 500
              </div>
            </div>

            <button 
              type="submit"
              disabled={status === "loading" || !message.trim()}
              className="mt-2 bg-white text-black font-bold uppercase tracking-widest text-sm py-4 border border-white hover:bg-transparent hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Transmitting..." : "Send Message"}
            </button>
          </form>
        )}

        {/* Branding footer */}
        <div className="mt-12 pt-6 border-t border-neutral-800 text-center flex flex-col items-center gap-2">
           <span className="text-neutral-600 text-xs font-mono uppercase">Powered by the underground</span>
           <Link href="/register" className="text-white font-bold uppercase tracking-widest text-xs hover:underline underline-offset-4 decoration-neutral-500">
             Get Your Own Inbox
           </Link>
        </div>

      </div>
    </main>
  );
}