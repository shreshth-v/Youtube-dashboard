import React from "react";

export default function VideoDetails({ form, setForm, handleUpdate, details }) {
  return (
    <div className="bg-slate-800 p-4 rounded-xl shadow-lg">
      <p className="mb-2 text-gray-300">Title: {details.snippet.title}</p>
      <p className="mb-4 text-gray-400">
        Description: {details.snippet.description}
      </p>

      <input
        className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded mb-3"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Edit Title"
      />
      <textarea
        className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded mb-3"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Edit Description"
      />
      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
      >
        Update Info
      </button>
    </div>
  );
}
