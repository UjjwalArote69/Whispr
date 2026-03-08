"use client";

import { useState } from "react";

export default function CopyLinkButton({ link }: { link: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset text after 2 seconds
  };

  return (
    <button 
      onClick={handleCopy}
      className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm border border-white hover:bg-transparent hover:text-white transition-colors duration-200"
    >
      {copied ? "COPIED!" : "COPY LINK"}
    </button>
  );
}