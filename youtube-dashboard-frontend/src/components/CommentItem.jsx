import React from "react";
import { FiTrash } from "react-icons/fi";

export default function CommentItem({
  comment,
  replyText,
  onReplyChange,
  onReplySubmit,
  onDelete,
}) {
  return (
    <div className="relative bg-slate-700 p-4 rounded-lg mb-4 shadow-md group">
      <button
        onClick={() => onDelete(comment.id)}
        className="absolute top-2 right-2 text-red-400 hover:text-red-500"
        title="Delete Comment"
      >
        <FiTrash size={18} />
      </button>

      <p className="text-gray-200 text-sm mb-3">
        {comment.snippet.topLevelComment.snippet.textOriginal}
      </p>

      <div className="mt-2">
        <input
          type="text"
          placeholder="Reply..."
          className="w-full p-2 bg-slate-600 text-white border border-slate-500 rounded"
          value={replyText}
          onChange={onReplyChange}
        />
        <button
          onClick={onReplySubmit}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
