"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RefreshButton() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    router.refresh();
    // Brief delay so the user sees the visual feedback
    setTimeout(() => setRefreshing(false), 600);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={refreshing}
      className="text-neutral-400 hover:text-white font-mono text-xs uppercase tracking-widest border border-neutral-800 hover:border-white px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {refreshing ? "Refreshing..." : "Refresh"}
    </button>
  );
}
