import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get("action");

  if (action === "login") {
    // For PKCE flow, we'll return the client ID so the frontend can handle the auth
    return NextResponse.json({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID,
      redirectUri: `${new URL(request.url).origin}/spotify`,
    });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}
