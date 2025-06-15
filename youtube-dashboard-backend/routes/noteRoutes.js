import express from "express";
import {
  createNote,
  getNotes,
  searchNotes,
} from "../controllers/noteController.js";

const router = express.Router();

router.post("/", createNote);
router.get("/:videoId", getNotes);
router.get("/search/:query", searchNotes);

export default router;
