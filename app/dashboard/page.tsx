/* eslint-disable react/no-unescaped-entities */
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CopyLinkButton from "./CopyLinkButton";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
  // 1. Fetch the session securely on the server
  const session = await getServerSession(authOptions);

  // 2. If no session exists, boot them back to the login page
  if (!session) {
    redirect("/login");
  }

  // 3. Construct the user's public link
  // NextAuth stores the username inside session.user.name based on our configuration
  const username = session.user?.name;
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const profileLink = `${baseURL}/u/${username}`;

  // 4. Mock Data (We will replace this with a real MongoDB fetch later)
  const messages = [
    { id: "1", text: "The new gritty design is absolutely brutal. I love it.", date: "JUST NOW" },
    { id: "2", text: "Are you actually building this whole thing in Next.js?", date: "2 HOURS AGO" },
  ];

  return (
    <main className="min-h-screen bg-neutral-950 bg-grain text-white p-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-12 pt-10">
        
        {/* Header Section */}
        <header className="border-b border-neutral-800 pb-6 flex justify-between items-end">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-1">Inbox</h1>
            <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
              Identified as: <span className="text-white">{username}</span>
            </p>
          </div>
          
          <LogoutButton/>
        </header>

        {/* Link Distribution Section */}
        <section className="bg-neutral-900 border border-neutral-800 p-6 flex flex-col gap-4">
          <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Your Public URL</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-neutral-950 border border-neutral-800 px-4 py-4 font-mono text-sm text-neutral-300 overflow-x-auto whitespace-nowrap flex items-center">
              {profileLink}
            </div>
            <CopyLinkButton link={profileLink} />
          </div>
        </section>

        {/* Message Feed */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Intercepted Transmissions</h2>
            <span className="text-xs font-mono text-neutral-600 uppercase">Count: {messages.length}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800 border border-neutral-800">
            {messages.length === 0 ? (
               <div className="bg-neutral-950 p-8 col-span-full text-center text-neutral-600 font-mono text-sm">
                 AWAITING INPUT...
               </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className="bg-neutral-950 p-8 flex flex-col justify-between hover:bg-neutral-900 transition-colors">
                  <p className="text-lg font-medium leading-relaxed mb-8 text-neutral-200">"{msg.text}"</p>
                  <div className="flex justify-between items-center border-t border-neutral-800 pt-4">
                    <span className="text-neutral-600 font-mono text-xs uppercase tracking-widest">{msg.date}</span>
                    <button className="text-red-900 hover:text-red-500 font-mono text-xs uppercase tracking-widest transition-colors">
                      [ Delete ]
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </main>
  );
}