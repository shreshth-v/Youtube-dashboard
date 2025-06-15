import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({
  comments,
  replyTexts,
  setReplyTexts,
  handleReplySubmit,
  handleCommentDelete,
}) {
  return (
    <>
      {comments.map((c) => (
        <CommentItem
          key={c.id}
          comment={c}
          replyText={replyTexts[c.id] || ""}
          onReplyChange={(e) =>
            setReplyTexts((prev) => ({
              ...prev,
              [c.id]: e.target.value,
            }))
          }
          onReplySubmit={() => handleReplySubmit(c.id)}
          onDelete={handleCommentDelete}
        />
      ))}
    </>
  );
}
