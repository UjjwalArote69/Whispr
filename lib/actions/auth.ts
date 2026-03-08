/* eslint-disable @typescript-eslint/no-explicit-any */


export async function registerUser(data: any) {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // 1. If it's not okay, read it as TEXT first, not JSON!
  if (!res.ok) {
    const errorText = await res.text();
    console.error("SERVER ERROR HTML:", errorText); // This will print the real error in your console
    
    // Try to parse it as JSON if possible, otherwise throw a generic error
    try {
      const errorData = JSON.parse(errorText);
      throw new Error(errorData.message);
    } catch {
      throw new Error("Server returned an HTML error. Check your VS Code terminal!");
    }
  }

  // 2. Only parse as JSON if the response was successful
  return await res.json();
}