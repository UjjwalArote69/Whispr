"use client"

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button 
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-neutral-500 hover:text-white font-mono text-xs uppercase tracking-widest transition-colors pb-1"
    >
      [ Logout ]
    </button>
  );
}