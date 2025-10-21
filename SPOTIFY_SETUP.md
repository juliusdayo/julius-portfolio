# Spotify Integration Setup

## 📝 Prerequisites

1. **Spotify Developer Account**
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Log in with your Spotify account
   - Accept the terms of service

## 🔧 Spotify App Configuration

1. **Create a New App**

   - Click "Create app"
   - Fill in the required fields:
     - App name: "Julius Portfolio"
     - App description: "Portfolio website with Spotify integration"
     - Website: `http://localhost:3000` (for development)
     - Redirect URI: `http://localhost:3000/api/auth/spotify/callback`
   - Check "Web API" in the APIs used section
   - Accept terms and save

2. **Get Your Credentials**
   - In your app dashboard, go to "Settings"
   - Copy the **Client ID** and **Client Secret**
   - Edit your `.env.local` file and replace the placeholder values:

```env
SPOTIFY_CLIENT_ID=your_actual_client_id_here
SPOTIFY_CLIENT_SECRET=your_actual_client_secret_here
SPOTIFY_REDIRECT_URI=http://localhost:3000/api/auth/spotify/callback
```

## 🚀 How to Use

1. **Start the development server**

   ```bash
   npm run dev
   ```

2. **Navigate to the Spotify page**

   - Go to `http://localhost:3000/spotify`
   - Or click the "Spotify" link in the header

3. **Test the authentication**
   - Click "Connect with Spotify"
   - You'll be redirected to Spotify's login page
   - After authorization, you'll see your profile and top tracks

## 🎵 Features Included

- **User Profile**: Display Spotify profile information
- **Top Tracks**: Show user's most played tracks (short-term)
- **Album Art**: Display track and album artwork
- **Audio Previews**: Play 30-second track previews (when available)
- **Secure Authentication**: OAuth 2.0 flow with proper token handling

## 🔐 Security Notes

- Tokens are passed via URL parameters for demo purposes
- In production, store tokens securely in a database or session storage
- Consider implementing token refresh logic for long-term usage
- The current implementation is for demonstration and would need enhancement for production use

## 📱 Production Deployment

When deploying to production:

1. Update the redirect URI in your Spotify app settings to your production domain
2. Update the `SPOTIFY_REDIRECT_URI` environment variable
3. Set up proper secure token storage
4. Implement token refresh functionality
5. Add error handling for expired tokens

## 🛠️ Troubleshooting

**Common Issues:**

1. **"Invalid redirect URI"**

   - Make sure the redirect URI in your Spotify app matches exactly: `http://localhost:3000/api/auth/spotify/callback`

2. **"Invalid client"**

   - Double-check your Client ID and Client Secret in `.env.local`

3. **"Access denied"**

   - Make sure you're using the correct Spotify account that owns the app

4. **No tracks showing**
   - You need to have some listening history on Spotify
   - Try changing the time range in the API call (short_term, medium_term, long_term)
