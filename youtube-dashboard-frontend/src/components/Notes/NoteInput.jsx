export default function NoteInput({
  content,
  setContent,
  tags,
  setTags,
  onSubmit,
}) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-md space-y-4">
      <textarea
        className="w-full bg-slate-700 p-3 rounded-lg text-white placeholder-gray-400"
        placeholder="Write your note here"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        className="w-full bg-slate-700 p-3 rounded-lg text-white placeholder-gray-400"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button
        onClick={onSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Add Note
      </button>
    </div>
  );
}
