// Spotify authentication utilities using PKCE flow

const generateCodeVerifier = (length: number): string => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const generateCodeChallenge = async (codeVerifier: string): Promise<string> => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

export const redirectToAuthCodeFlow = async (
  clientId: string,
  redirectUri: string
) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", redirectUri);
  params.append(
    "scope",
    "user-read-private user-read-email user-top-read user-read-recently-played playlist-read-private"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (code: string, redirectUri: string) => {
  const verifier = localStorage.getItem("verifier");

  if (!verifier) {
    throw new Error("No verifier found in localStorage");
  }

  const response = await fetch("/api/auth/spotify/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      code,
      codeVerifier: verifier,
      redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to exchange code for token");
  }

  const data = await response.json();

  // Clean up verifier
  localStorage.removeItem("verifier");

  return data;
};

export const fetchTopTracks = async (accessToken: string) => {
  const response = await fetch("/api/spotify/top-tracks", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Failed to fetch top tracks:", response.status, errorData);
    throw new Error(`Failed to fetch top tracks: ${response.status}`);
  }

  const data = await response.json();
  console.log("Top tracks API response:", data);
  return data;
};

export const fetchRecentlyPlayed = async (accessToken: string) => {
  const response = await fetch("/api/spotify/recently-played", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch recently played");
  }

  return response.json();
};

export const fetchTopArtists = async (accessToken: string) => {
  const response = await fetch("/api/spotify/top-artists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error("Failed to fetch top artists:", response.status, errorData);
    throw new Error(`Failed to fetch top artists: ${response.status}`);
  }

  const data = await response.json();
  console.log("Top artists API response:", data);
  return data;
};

export const generateWittyComment = async (genres: string[]) => {
  const response = await fetch("/api/gemini/witty-comment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ genres }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error(
      "Failed to generate witty comment:",
      response.status,
      errorData
    );
    throw new Error(`Failed to generate witty comment: ${response.status}`);
  }

  const data = await response.json();
  console.log("Witty comment API response:", data);
  return data;
};
