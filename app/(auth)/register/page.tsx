/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/actions/auth";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] =
    useState({
      username: "",
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

    try {
      await registerUser(formData);
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 bg-grain flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md border border-neutral-800 bg-neutral-950 p-10 relative">
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">
            Initialize Link
          </h2>
          <p className="text-neutral-500 font-medium mb-8">
            Create your untraceable
            inbox.
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
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Username
              </label>
              <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="UNIQUE_ID"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-white focus:bg-neutral-950 text-white placeholder-neutral-700 outline-none transition-colors rounded-none font-mono text-sm"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    username:
                      e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="USER@DOMAIN.COM"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-white focus:bg-neutral-950 text-white placeholder-neutral-700 outline-none transition-colors rounded-none font-mono text-sm"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email:
                      e.target.value,
                  })
                }
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
                Password
              </label>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 focus:border-white focus:bg-neutral-950 text-white placeholder-neutral-700 outline-none transition-colors rounded-none font-mono text-sm"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    password:
                      e.target.value,
                  })
                }
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-white text-black font-bold uppercase tracking-widest text-sm py-4 border border-white hover:bg-transparent hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Processing..."
                : "Generate Link"}
            </button>
          </form>

          <div className="mt-10 pt-6 border-t border-neutral-800 text-center">
            <p className="text-neutral-500 text-sm">
              ALREADY REGISTERED?{" "}
              <Link
                href="/login"
                className="text-white hover:underline underline-offset-4 decoration-neutral-500"
              >
                ACCESS INBOX
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
