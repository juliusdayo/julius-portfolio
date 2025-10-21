import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const accessToken = authHeader.substring(7); // Remove "Bearer " prefix

    // Try different time ranges if needed
    let response;
    let data;

    // First try short_term
    response = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (response.ok) {
      data = await response.json();
      console.log("Short term tracks found:", data.items?.length || 0);

      // If no tracks in short term, try medium term
      if (!data.items || data.items.length === 0) {
        response = await fetch(
          "https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=medium_term",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.ok) {
          data = await response.json();
          console.log("Medium term tracks found:", data.items?.length || 0);
        }
      }
    }

    if (!response.ok) {
      const error = await response.text();
      console.error("Spotify API error:", response.status, error);
      return NextResponse.json(
        { error: "Failed to fetch top tracks from Spotify", details: error },
        { status: response.status }
      );
    }

    console.log("Final tracks data:", data);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
