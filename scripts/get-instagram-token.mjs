/**
 * Usage:
 *   INSTAGRAM_APP_ID=xxx INSTAGRAM_APP_SECRET=yyy node scripts/get-instagram-token.mjs
 *
 * Before running, add this redirect URI in Meta for Developers:
 *   App > Instagram Basic Display > Basic Display > Valid OAuth Redirect URIs
 *   → http://localhost:3456/callback
 */

import { createServer } from "node:http";
import { exec } from "node:child_process";
import { URL } from "node:url";

const APP_ID     = process.env.INSTAGRAM_APP_ID;
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET;
const PORT       = 3456;
const REDIRECT   = `http://localhost:${PORT}/callback`;

if (!APP_ID || !APP_SECRET) {
  console.error("Error: set INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET env vars.");
  process.exit(1);
}

const authUrl =
  `https://api.instagram.com/oauth/authorize` +
  `?client_id=${APP_ID}` +
  `&redirect_uri=${encodeURIComponent(REDIRECT)}` +
  `&scope=user_profile,user_media` +
  `&response_type=code`;

console.log("\nOpening browser for Instagram login...");
exec(`open "${authUrl}"`);
console.log("If the browser didn't open, visit:\n" + authUrl);
console.log("\nWaiting for callback...\n");

const server = createServer(async (req, res) => {
  const url  = new URL(req.url, `http://localhost:${PORT}`);
  const code = url.searchParams.get("code");

  if (!code) {
    res.end("<h2>No code received. Try again.</h2>");
    return;
  }

  res.end("<h2 style='font-family:sans-serif'>Authorized! Check your terminal.</h2>");
  server.close();

  // Short-lived token
  const shortRes = await fetch("https://api.instagram.com/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id:     APP_ID,
      client_secret: APP_SECRET,
      grant_type:    "authorization_code",
      redirect_uri:  REDIRECT,
      code:          code.replace(/#_$/, ""),
    }),
  });
  const short = await shortRes.json();
  if (!short.access_token) {
    console.error("Failed to get short-lived token:", short);
    process.exit(1);
  }

  // Long-lived token (60 days)
  const longRes = await fetch(
    `https://graph.instagram.com/access_token` +
    `?grant_type=ig_exchange_token` +
    `&client_secret=${APP_SECRET}` +
    `&access_token=${short.access_token}`
  );
  const long = await longRes.json();
  if (!long.access_token) {
    console.error("Failed to get long-lived token:", long);
    process.exit(1);
  }

  const days = Math.round(long.expires_in / 86400);
  console.log("✓ Success! Add this to your .env file:\n");
  console.log(`VITE_INSTAGRAM_TOKEN=${long.access_token}`);
  console.log(`\nExpires in: ${days} days`);
});

server.listen(PORT);
