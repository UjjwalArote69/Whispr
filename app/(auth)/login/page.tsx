"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });
  const [error, setError] =
    useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn(
      "credentials",
      {
        redirect: false,
        email: formData.email,
        password: formData.password,
      },
    );

    if (res?.error) {
      setError(
        "Invalid credentials. Try again.",
      );
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 bg-grain flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md border border-neutral-800 bg-neutral-950 p-10 relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
            System Login
          </h2>
          <p className="text-neutral-500 font-medium mb-8">
            Access your secure inbox.
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
          >
            {error && (
              <div className="bg-red-950/50 border border-red-900 text-red-500 p-4 text-sm font-mono">
                [ERROR]: {error}
              </div>
            )}


<div className="flex flex-col gap-2">
  <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Email</label>
  <input 
    type="email" 
    name="email"
    autoComplete="email"
    placeholder="USER@DOMAIN.COM"
    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-white focus:bg-neutral-950 text-white placeholder-neutral-700 outline-none transition-colors rounded-none font-mono text-sm"
    onChange={(e) => setFormData({...formData, email: e.target.value})}
    required
  />
</div>

<div className="flex flex-col gap-2">
  <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Password</label>
  <input 
    type="password" 
    name="password"
    autoComplete="current-password"
    placeholder="••••••••"
    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-white focus:bg-neutral-950 text-white placeholder-neutral-700 outline-none transition-colors rounded-none font-mono text-sm"
    onChange={(e) => setFormData({...formData, password: e.target.value})}
    required
  />
</div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm py-4 border border-white hover:bg-transparent hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Authenticating..."
                : "Enter"}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-neutral-800 text-center">
            <p className="text-neutral-500 text-sm">
              NO ACCOUNT?{" "}
              <Link
                href="/register"
                className="text-white hover:underline underline-offset-4 decoration-neutral-500"
              >
                INITIALIZE HERE
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
