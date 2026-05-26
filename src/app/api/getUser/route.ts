import { getUsername } from "~/lib/api";

export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;

  const id = params.get("id") || "";
  const names = [
    "Steve",
    "Alex",
    "Zuri",
    "Sunny",
    "Noor",
    "Makena",
    "Kai",
    "Efe",
    "Ari",
  ];
  try {
    const username = await getUsername(id);
    if (username) {
      return new Response(JSON.stringify({ username }), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(
      JSON.stringify({
        username: names[Math.floor(Math.random() * names.length)],
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch {
    return new Response(
      JSON.stringify({
        username: names[Math.floor(Math.random() * names.length)],
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
