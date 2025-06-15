import express from "express";
import {
  googleOAuthRedirect,
  googleOAuthCallback,
  checkAuth,
  logout,
} from "../controllers/authController.js";
import verifyToken from "../utils/verifyToken.js";

const router = express.Router();

router.get("/google", googleOAuthRedirect);
router.get("/google/callback", googleOAuthCallback);
router.get("/check", verifyToken, checkAuth);
router.get("/logout", verifyToken, logout);

export default router;
