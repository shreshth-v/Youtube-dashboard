import { google } from "googleapis";
import asyncWrapper from "../utils/asyncWrapper.js";

const setYouTubeAuth = asyncWrapper(async (req, res, next) => {
  const user = req.user;

  if (!user || !user.accessToken || !user.refreshToken) {
    return res
      .status(401)
      .json({ error: "Missing YouTube access or refresh token" });
  }

  const userOAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  userOAuth2Client.setCredentials({
    access_token: user.accessToken,
    refresh_token: user.refreshToken,
  });

  userOAuth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) {
      user.accessToken = tokens.access_token;
    }
    if (tokens.refresh_token) {
      user.refreshToken = tokens.refresh_token;
    }
    await user.save();
  });

  req.youtubeClient = google.youtube({
    version: "v3",
    auth: userOAuth2Client,
  });

  next();
});

export default setYouTubeAuth;
