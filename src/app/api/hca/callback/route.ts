import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  const response = NextResponse.redirect(
    new URL(request.url).origin + "/submit",
  );
  if (!code) return response;

  const res = await fetch("https://auth.hackclub.com/oauth/token", {
    method: "POST",
    body: new URLSearchParams({
      client_id: process.env.HCA_CLIENT_ID!,
      client_secret: process.env.HCA_CLIENT_SECRET!,
      redirect_uri: "https://localhost:3000/api/hca/callback",
      code,
      grant_type: "authorization_code",
    }),
  }).then(r => r.json());

  response.cookies.set("hca_access_token", res.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 2592000,
    path: "/",
  });

  return response;
}
