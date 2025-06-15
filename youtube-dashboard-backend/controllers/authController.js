import { oauth2Client } from "../utils/googleAuth.js";
import { google } from "googleapis";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

// Redirect to Google OAuth consent screen
export const googleOAuthRedirect = asyncWrapper((req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });

  res.redirect(url);
});

// Callback after Google auth
export const googleOAuthCallback = asyncWrapper(async (req, res) => {
  const { code } = req.query;

  if (!code) {
    throw new CustomError(400, "Missing authorization code");
  }

  // Get tokens using the code
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Get user profile
  const oauth2 = google.oauth2({
    version: "v2",
    auth: oauth2Client,
  });

  const { data: userInfo } = await oauth2.userinfo.get();
  const { id, email, name } = userInfo;

  if (!id || !email || !name) {
    throw new CustomError(400, "Incomplete user info from Google");
  }

  // Find or create user
  let user = await User.findOne({ googleId: id });

  if (user) {
    user.accessToken = tokens.access_token;
    user.refreshToken = tokens.refresh_token || user.refreshToken;
    await user.save();
  } else {
    user = await User.create({
      googleId: id,
      email,
      name,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
    });
  }

  // Create JWT token
  const payload = { _id: user._id };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set token as cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.redirect(process.env.CLIENT_URL);
});

export const checkAuth = (req, res) => {
  const { _id, googleId, email, name } = req.user;
  res.status(200).json({
    _id,
    googleId,
    email,
    name,
  });
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout Successful" });
};
