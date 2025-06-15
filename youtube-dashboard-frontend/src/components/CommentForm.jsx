import React from "react";

export default function CommentForm({
  commentText,
  setCommentText,
  handleCommentSubmit,
}) {
  return (
    <div className="mb-6">
      <textarea
        className="w-full p-3 bg-slate-700 text-white border border-slate-600 rounded mb-3"
        placeholder="Write a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      />
      <button
        onClick={handleCommentSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
      >
        Add Comment
      </button>
    </div>
  );
}
