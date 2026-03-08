import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 bg-grain flex flex-col items-center justify-center p-6 text-center font-sans relative">
      
      <div className="relative z-10 flex flex-col items-center max-w-3xl">
        {/* Stark Hero Section */}
        <div className="border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 rounded-full text-xs font-mono text-neutral-400 mb-8 uppercase tracking-widest">
          No filters. No tracking.
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 uppercase">
          The Unfiltered <br /> <span className="text-neutral-500">Truth.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-neutral-400 font-medium mb-12 max-w-xl">
          Receive anonymous feedback, questions, and confessions. Raw and direct to your dashboard.
        </p>

        {/* High-Contrast CTA Button */}
        <Link 
          href="/register" 
          className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-black bg-white rounded-none border border-white hover:bg-transparent hover:text-white transition-colors duration-200 uppercase tracking-widest text-sm"
        >
          Get Your Link
          <span className="ml-3 group-hover:translate-x-1 transition-transform duration-200">→</span>
        </Link>
      </div>

      {/* Brutalist feature cards */}
      <div className="relative z-10 mt-32 grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800 border border-neutral-800 w-full max-w-5xl">
        <FeatureCard 
          step="01" 
          title="Claim Link" 
          description="Register to generate your unique, untraceable URL." 
        />
        <FeatureCard 
          step="02" 
          title="Share Freely" 
          description="Drop it in your bio, stories, or anywhere online." 
        />
        <FeatureCard 
          step="03" 
          title="Read Inbox" 
          description="Access your secure dashboard to view the responses." 
        />
      </div>
    </main>
  );
}

// Minimalist, sharp component
function FeatureCard({ step, title, description }: { step: string, title: string, description: string }) {
  return (
    <div className="bg-neutral-950 p-8 flex flex-col items-start text-left hover:bg-neutral-900 transition-colors duration-300">
      <div className="text-neutral-600 font-mono text-sm mb-6">{step}</div>
      <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-wide">{title}</h3>
      <p className="text-neutral-400 font-medium leading-relaxed">{description}</p>
    </div>
  );
}