import NoteItem from "./NoteItem";

export default function NoteList({ notes, loading }) {
  if (loading) return <p className="text-gray-400">Loading notes...</p>;
  if (notes.length === 0)
    return <p className="text-gray-500">No notes found.</p>;

  return (
    <div className="mt-4 space-y-4">
      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}
    </div>
  );
}
