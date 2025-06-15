import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVideoDetails,
  fetchComments,
  updateVideoInfo,
  deleteComment,
  addComment,
  replyToComment,
} from "../features/video/videoSlice";

import VideoDetails from "../components/VideoDetails";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";

export default function Home() {
  const dispatch = useDispatch();
  const { videoId, details, comments } = useSelector((state) => state.video);

  const [form, setForm] = useState({ title: "", description: "" });
  const [commentText, setCommentText] = useState("");
  const [replyTexts, setReplyTexts] = useState({});

  useEffect(() => {
    if (videoId) {
      dispatch(fetchVideoDetails(videoId)).then((res) => {
        if (res.payload?.snippet) {
          setForm({
            title: res.payload.snippet.title,
            description: res.payload.snippet.description,
          });
        }
      });
      dispatch(fetchComments(videoId));
    }
  }, [videoId]);

  const handleUpdate = () => {
    dispatch(updateVideoInfo({ videoId, data: form }));
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    dispatch(addComment({ videoId, text: commentText }));
    setCommentText("");
  };

  const handleReplySubmit = (commentId) => {
    if (!replyTexts[commentId]?.trim()) return;
    dispatch(replyToComment({ commentId, text: replyTexts[commentId] }));
    setReplyTexts((prev) => ({ ...prev, [commentId]: "" }));
  };

  const handleCommentDelete = (id) => {
    dispatch(deleteComment(id));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold text-white">Video Details</h2>

      {details && (
        <VideoDetails
          form={form}
          setForm={setForm}
          handleUpdate={handleUpdate}
          details={details}
        />
      )}

      <div className="mt-8">
        <h3 className="text-xl font-medium text-white mb-3">Comments</h3>

        <CommentForm
          commentText={commentText}
          setCommentText={setCommentText}
          handleCommentSubmit={handleCommentSubmit}
        />

        <CommentList
          comments={comments}
          replyTexts={replyTexts}
          setReplyTexts={setReplyTexts}
          handleReplySubmit={handleReplySubmit}
          handleCommentDelete={handleCommentDelete}
        />
      </div>
    </div>
  );
}
