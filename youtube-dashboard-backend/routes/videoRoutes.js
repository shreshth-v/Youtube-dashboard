import express from "express";
import {
  getVideoDetails,
  updateVideoInfo,
  getComments,
  addComment,
  replyToComment,
  deleteComment,
} from "../controllers/videoController.js";

import verifyToken from "../utils/verifyToken.js";
import setYouTubeAuth from "../middlewares/setYouTubeAuth.js";

const router = express.Router();

router.use(verifyToken, setYouTubeAuth);

router.get("/:videoId", getVideoDetails);
router.put("/:videoId", updateVideoInfo);
router.get("/:videoId/comments", getComments);
router.post("/:videoId/comments", addComment);
router.post("/:videoId/comments/:commentId/reply", replyToComment);
router.delete("/comments/:commentId", deleteComment);

export default router;
