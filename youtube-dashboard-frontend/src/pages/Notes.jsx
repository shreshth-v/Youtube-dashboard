import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes, createNote } from "../features/notes/notesSlice";
import NoteInput from "../components/Notes/NoteInput";
import NoteSearch from "../components/Notes/NoteSearch";
import NoteList from "../components/Notes/NoteList";

export default function Notes() {
  const dispatch = useDispatch();
  const videoId = useSelector((state) => state.video.videoId);
  const { notes, loading } = useSelector((state) => state.notes);

  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (videoId) dispatch(fetchNotes(videoId));
  }, [videoId]);

  const handleAddNote = () => {
    if (!content.trim()) return;
    const tagList = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    dispatch(createNote({ videoId, content, tags: tagList }));
    setContent("");
    setTags("");
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.content.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <h2 className="text-2xl font-semibold text-white">Notes</h2>
      <NoteInput
        content={content}
        setContent={setContent}
        tags={tags}
        setTags={setTags}
        onSubmit={handleAddNote}
      />
      <NoteSearch search={search} setSearch={setSearch} />
      <NoteList notes={filteredNotes} loading={loading} />
    </div>
  );
}
