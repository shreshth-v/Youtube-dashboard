export default function NoteItem({ note }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-md border border-slate-700 hover:shadow-lg transition-shadow duration-300">
      <p className="text-white text-base">{note.content}</p>
      <div className="text-sm text-gray-400 mt-2">
        {note.tags.map((tag, index) => (
          <span
            key={index}
            className="inline-block bg-slate-600 text-xs text-gray-200 px-2 py-1 rounded mr-2"
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
}
