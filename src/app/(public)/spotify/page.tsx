"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchTopTracks,
  fetchTopArtists,
  generateWittyComment,
} from "../../../utils/spotify";

interface SpotifyUser {
  id: string;
  display_name: string;
  email: string;
  images: Array<{ url: string; height: number; width: number }>;
}

interface SpotifyTrack {
  id: string;
  name: string;
  preview_url: string | null;
  album: {
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  artists: Array<{ name: string; id: string }>;
}

interface SpotifyArtist {
  id: string;
  name: string;
  genres: string[];
  images: Array<{ url: string; height: number; width: number }>;
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
}

function SpotifyContent() {
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [topArtists, setTopArtists] = useState<SpotifyArtist[]>([]);
  const [wittyComment, setWittyComment] = useState<string>("");
  const [isProcessingAuth, setIsProcessingAuth] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Load existing authentication from localStorage on component mount
  useEffect(() => {
    const loadExistingAuth = async () => {
      try {
        const storedUser = localStorage.getItem("spotify_user");
        const storedToken = localStorage.getItem("spotify_access_token");
        const storedTracks = localStorage.getItem("spotify_top_tracks");
        const storedArtists = localStorage.getItem("spotify_top_artists");
        const storedComment = localStorage.getItem("spotify_witty_comment");

        if (storedUser && storedToken) {
          console.log("Loading existing Spotify session...");
          setUser(JSON.parse(storedUser));
          setAccessToken(storedToken);

          if (storedTracks) {
            setTopTracks(JSON.parse(storedTracks));
          } else {
            // If no cached tracks, fetch them
            try {
              const tracksData = await fetchTopTracks(storedToken);
              setTopTracks(tracksData.items);
              localStorage.setItem(
                "spotify_top_tracks",
                JSON.stringify(tracksData.items)
              );
            } catch (err) {
              console.error("Failed to fetch tracks on restore:", err);
            }
          }

          if (storedArtists) {
            const artists = JSON.parse(storedArtists);
            setTopArtists(artists);

            // Restore or generate witty comment
            if (storedComment) {
              setWittyComment(storedComment);
            } else {
              // Generate comment from stored artists
              try {
                const allGenres = artists.reduce(
                  (genres: string[], artist: SpotifyArtist) => {
                    artist.genres.forEach((genre) => {
                      if (!genres.includes(genre)) {
                        genres.push(genre);
                      }
                    });
                    return genres;
                  },
                  []
                );

                if (allGenres.length > 0) {
                  const commentData = await generateWittyComment(allGenres);
                  setWittyComment(commentData.comment);
                  localStorage.setItem(
                    "spotify_witty_comment",
                    commentData.comment
                  );
                }
              } catch (err) {
                console.error("Failed to generate comment on restore:", err);
              }
            }
          } else {
            // If no cached artists, fetch them
            try {
              const artistsData = await fetchTopArtists(storedToken);
              setTopArtists(artistsData.items);
              localStorage.setItem(
                "spotify_top_artists",
                JSON.stringify(artistsData.items)
              );

              // Generate witty comment
              const allGenres = artistsData.items.reduce(
                (genres: string[], artist: SpotifyArtist) => {
                  artist.genres.forEach((genre) => {
                    if (!genres.includes(genre)) {
                      genres.push(genre);
                    }
                  });
                  return genres;
                },
                []
              );

              if (allGenres.length > 0) {
                const commentData = await generateWittyComment(allGenres);
                setWittyComment(commentData.comment);
                localStorage.setItem(
                  "spotify_witty_comment",
                  commentData.comment
                );
              }
            } catch (err) {
              console.error("Failed to fetch artists on restore:", err);
            }
          }
        }
      } catch (err) {
        console.error("Error loading existing auth:", err);
        // Clear corrupted data
        localStorage.removeItem("spotify_user");
        localStorage.removeItem("spotify_access_token");
        localStorage.removeItem("spotify_top_tracks");
      } finally {
        setIsInitialized(true);
      }
    };

    loadExistingAuth();
  }, []);

  // Handle OAuth callback
  useEffect(() => {
    if (!isInitialized) return; // Wait for localStorage check to complete

    const handleCallback = async () => {
      const code = searchParams.get("code");
      const errorParam = searchParams.get("error");

      if (errorParam) {
        setError(`Spotify authentication failed: ${errorParam}`);
        return;
      }

      if (code && !isProcessingAuth && !user) {
        setIsProcessingAuth(true);
        setLoading(true);
        try {
          const redirectUri = `${window.location.origin}/spotify`;
          const tokenData = await getAccessToken(code, redirectUri);

          // Store authentication data in localStorage
          localStorage.setItem(
            "spotify_user",
            JSON.stringify(tokenData.profile)
          );
          localStorage.setItem("spotify_access_token", tokenData.access_token);

          setAccessToken(tokenData.access_token);
          setUser(tokenData.profile);

          // Fetch top tracks
          console.log(
            "Fetching top tracks with token:",
            tokenData.access_token ? "Present" : "Missing"
          );
          const tracksData = await fetchTopTracks(tokenData.access_token);
          console.log("Tracks data received:", tracksData);
          console.log("Tracks items:", tracksData.items);
          setTopTracks(tracksData.items);

          // Fetch top artists
          console.log("Fetching top artists...");
          const artistsData = await fetchTopArtists(tokenData.access_token);
          console.log("Artists data received:", artistsData);
          console.log("Artists items:", artistsData.items);
          setTopArtists(artistsData.items);

          // Generate witty comment based on genres
          const allGenres = artistsData.items.reduce(
            (genres: string[], artist: SpotifyArtist) => {
              artist.genres.forEach((genre) => {
                if (!genres.includes(genre)) {
                  genres.push(genre);
                }
              });
              return genres;
            },
            []
          );

          if (allGenres.length > 0) {
            try {
              console.log(
                "Generating witty comment for genres:",
                allGenres.slice(0, 3)
              );
              const commentData = await generateWittyComment(allGenres);
              setWittyComment(commentData.comment);
              localStorage.setItem(
                "spotify_witty_comment",
                commentData.comment
              );
              console.log("Generated comment:", commentData.comment);
            } catch (err) {
              console.error("Failed to generate witty comment:", err);
            }
          }

          // Store data in localStorage
          localStorage.setItem(
            "spotify_top_tracks",
            JSON.stringify(tracksData.items)
          );
          localStorage.setItem(
            "spotify_top_artists",
            JSON.stringify(artistsData.items)
          );

          // Clean up URL only AFTER successful authentication
          router.replace("/spotify");
        } catch (err) {
          setError("Failed to authenticate with Spotify");
          console.error("Auth error:", err);
          // Don't clean up URL on error so user can see what went wrong
        } finally {
          setLoading(false);
          setIsProcessingAuth(false);
        }
      }
    };

    handleCallback();
  }, [searchParams, router, isProcessingAuth, user, isInitialized]);

  const handleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/spotify?action=login");
      const data = await response.json();

      if (data.clientId) {
        await redirectToAuthCodeFlow(data.clientId, data.redirectUri);
      } else {
        setError("Failed to get Spotify configuration");
      }
    } catch (err) {
      setError("Failed to initiate Spotify login");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear all state
    setUser(null);
    setAccessToken(null);
    setTopTracks([]);
    setTopArtists([]);
    setWittyComment("");
    setError(null);

    // Clear all localStorage data
    localStorage.removeItem("verifier");
    localStorage.removeItem("spotify_user");
    localStorage.removeItem("spotify_access_token");
    localStorage.removeItem("spotify_top_tracks");
    localStorage.removeItem("spotify_top_artists");
    localStorage.removeItem("spotify_witty_comment");

    router.push("/spotify");
  };
  return (
    <div
      className="min-h-screen py-20"
      style={{ backgroundColor: "#121212", color: "#ffffff" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <h1
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ color: "#ffffff" }}
          >
            Spotify <span style={{ color: "#1db954" }}>Integration</span>
          </h1>

          {error && (
            <div
              className="mb-8 p-4 rounded-lg text-center"
              style={{
                backgroundColor: "#212121",
                color: "#ff6b6b",
                border: "1px solid #535353",
              }}
            >
              <p className="font-semibold">Error: {error}</p>
            </div>
          )}

          {(loading || !isInitialized) && (
            <div className="text-center mb-8">
              <div
                className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
                style={{ borderColor: "#1db954" }}
              ></div>
              <p className="mt-2" style={{ color: "#b3b3b3" }}>
                {!isInitialized ? "Loading..." : "Connecting to Spotify..."}
              </p>
            </div>
          )}

          {isInitialized && !user ? (
            <div className="text-center">
              <p className="text-xl mb-8" style={{ color: "#b3b3b3" }}>
                Connect your Spotify account to view your music data and
                preferences.
              </p>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: "#1db954" }}
              >
                {loading ? "Connecting..." : "Connect with Spotify"}
              </button>

              <div
                className="mt-12 p-6 rounded-lg"
                style={{
                  backgroundColor: "#212121",
                  border: "1px solid #535353",
                }}
              >
                <h3
                  className="text-xl font-semibold mb-4"
                  style={{ color: "#ffffff" }}
                >
                  What you&apos;ll get:
                </h3>
                <ul
                  className="text-left space-y-2"
                  style={{ color: "#b3b3b3" }}
                >
                  <li>✓ View your top tracks and artists</li>
                  <li>✓ See your recently played music</li>
                  <li>✓ Access your playlists</li>
                  <li>✓ Discover your music preferences</li>
                </ul>
              </div>
            </div>
          ) : isInitialized && user ? (
            <div>
              {/* Sidebar Layout */}
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Sidebar - User Profile */}
                <div className="lg:w-80 lg:flex-shrink-0">
                  <div
                    className="p-6 rounded-lg text-center lg:sticky lg:top-8"
                    style={{
                      backgroundColor: "#212121",
                      border: "1px solid #535353",
                    }}
                  >
                    {user.images && user.images[0] && (
                      <Image
                        src={user.images[0].url}
                        alt="Profile"
                        width={96}
                        height={96}
                        className="rounded-full mx-auto mb-4"
                      />
                    )}
                    <h2
                      className="text-2xl font-bold mb-2"
                      style={{ color: "#ffffff" }}
                    >
                      {user.display_name || user.id}
                    </h2>
                    <p className="mb-4" style={{ color: "#b3b3b3" }}>
                      {user.email}
                    </p>

                    {/* Stats in Sidebar */}
                    <div className="mb-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center">
                          <div
                            className="text-2xl font-bold mb-1"
                            style={{ color: "#1db954" }}
                          >
                            {topTracks.length}
                          </div>
                          <div className="text-xs" style={{ color: "#b3b3b3" }}>
                            Top Tracks
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className="text-2xl font-bold mb-1"
                            style={{ color: "#1db954" }}
                          >
                            {accessToken ? "✓" : "✗"}
                          </div>
                          <div className="text-xs" style={{ color: "#b3b3b3" }}>
                            Connected
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      className="w-full px-6 py-2 rounded-lg font-semibold border-2 transition-all hover:transform hover:scale-105"
                      style={{
                        borderColor: "#535353",
                        color: "#ffffff",
                        backgroundColor: "transparent",
                      }}
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Right Content - Top Tracks */}
                <div className="flex-1 min-w-0 space-y-6">
                  {/* AI-Generated Music Roast */}
                  {topArtists.length > 0 && wittyComment && (
                    <div
                      className="p-6 rounded-lg text-center"
                      style={{
                        backgroundColor: "#212121",
                        border: "1px solid #535353",
                      }}
                    >
                      <div
                        className="text-2xl md:text-3xl font-bold italic"
                        style={{ color: "#1db954" }}
                      >
                        &quot;{wittyComment}&quot;
                      </div>
                      <p className="mt-2 text-sm" style={{ color: "#b3b3b3" }}>
                        AI-generated roast based on your music taste 🎵
                      </p>
                    </div>
                  )}

                  {/* Top Tracks Section */}
                  {topTracks.length > 0 ? (
                    <div
                      className="p-6 rounded-lg"
                      style={{
                        backgroundColor: "#212121",
                        border: "1px solid #535353",
                      }}
                    >
                      <h3
                        className="text-2xl font-bold mb-6"
                        style={{ color: "#ffffff" }}
                      >
                        Your Top Tracks
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {topTracks.map((track, index) => (
                          <div
                            key={track.id}
                            className="relative p-3 rounded-lg hover:bg-opacity-80 transition-all hover:transform hover:scale-105 cursor-pointer group"
                            style={{ backgroundColor: "#121212" }}
                          >
                            {/* Track Number Badge */}
                            <div
                              className="absolute top-1 left-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                              style={{
                                backgroundColor: "#1db954",
                                color: "#000000",
                              }}
                            >
                              {index + 1}
                            </div>
                            {/* Album Cover */}
                            <div className="mb-3 relative">
                              {track.album.images[0] && (
                                <Image
                                  src={track.album.images[0].url}
                                  alt={track.album.name}
                                  width={200}
                                  height={200}
                                  className="rounded-lg w-full aspect-square object-cover"
                                />
                              )}

                              {/* Play Button Overlay */}
                              {track.preview_url && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <div
                                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                                    style={{ backgroundColor: "#1db954" }}
                                  >
                                    <svg
                                      width="24"
                                      height="24"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                    >
                                      <path d="M8 5v14l11-7z" fill="#000000" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                            {/* Track Info */}
                            <div className="space-y-1">
                              <h4
                                className="font-bold text-sm truncate"
                                style={{ color: "#ffffff" }}
                                title={track.name}
                              >
                                {track.name}
                              </h4>
                              <p
                                className="text-xs truncate"
                                style={{ color: "#b3b3b3" }}
                                title={track.artists
                                  .map((artist) => artist.name)
                                  .join(", ")}
                              >
                                {track.artists
                                  .map((artist) => artist.name)
                                  .join(", ")}
                              </p>
                              <p
                                className="text-xs truncate opacity-75"
                                style={{ color: "#535353" }}
                                title={track.album.name}
                              >
                                {track.album.name}
                              </p>
                            </div>{" "}
                            {/* Hidden Audio Element */}
                            {track.preview_url && (
                              <audio className="hidden">
                                <source
                                  src={track.preview_url}
                                  type="audio/mpeg"
                                />
                              </audio>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-6 rounded-lg text-center"
                      style={{
                        backgroundColor: "#212121",
                        border: "1px solid #535353",
                      }}
                    >
                      <p style={{ color: "#b3b3b3" }}>
                        No top tracks found. This might be because:
                      </p>
                      <ul
                        className="mt-2 text-left"
                        style={{ color: "#535353" }}
                      >
                        <li>
                          • You haven&apos;t listened to enough music recently
                        </li>
                        <li>• There was an error fetching your tracks</li>
                        <li>• Your Spotify account is new</li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div
      className="min-h-screen py-20 flex items-center justify-center"
      style={{ backgroundColor: "#121212", color: "#ffffff" }}
    >
      <div className="text-center">
        <div
          className="inline-block animate-spin rounded-full h-8 w-8 border-b-2"
          style={{ borderColor: "#1db954" }}
        ></div>
        <p className="mt-2" style={{ color: "#b3b3b3" }}>
          Loading Spotify...
        </p>
      </div>
    </div>
  );
}

export default function SpotifyPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SpotifyContent />
    </Suspense>
  );
}
