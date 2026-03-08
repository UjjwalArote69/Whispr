/* eslint-disable @typescript-eslint/no-explicit-any */
export async function sendMessage(username: string, content: string) {
  try {
    const res = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, content }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to transmit message.");
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || "Network error. Transmission failed.");
  }
}