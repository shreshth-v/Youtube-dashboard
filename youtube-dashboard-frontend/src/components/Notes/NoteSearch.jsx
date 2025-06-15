export default function NoteSearch({ search, setSearch }) {
  return (
    <input
      type="text"
      className="w-full bg-slate-700 p-3 rounded-lg text-white placeholder-gray-400"
      placeholder="Search notes..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}
