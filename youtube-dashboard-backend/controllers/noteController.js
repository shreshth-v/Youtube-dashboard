import Note from "../models/Note.js";
import Log from "../models/Log.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

export const createNote = asyncWrapper(async (req, res) => {
  const { videoId, content, tags } = req.body;

  if (!videoId || !content) {
    throw new CustomError(400, "Video ID and content are required");
  }

  const note = await Note.create({ videoId, content, tags });
  await Log.create({ action: "Note Created", details: `Note ID: ${note._id}` });

  res.status(201).json(note);
});

export const getNotes = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;

  const notes = await Note.find({ videoId });

  if (!notes || notes.length === 0) {
    throw new CustomError(404, `No notes found for video ID: ${videoId}`);
  }

  res.status(200).json(notes);
});

export const searchNotes = asyncWrapper(async (req, res) => {
  const { query } = req.params;

  if (!query) {
    throw new CustomError(400, "Search query is required");
  }

  const notes = await Note.find({
    content: { $regex: query, $options: "i" }
  });

  if (!notes || notes.length === 0) {
    throw new CustomError(404, `No notes found matching query: ${query}`);
  }

  res.status(200).json(notes);
});
