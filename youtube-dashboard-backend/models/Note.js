import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  content: { type: String, required: true },
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model("Note", noteSchema);
export default Note;
