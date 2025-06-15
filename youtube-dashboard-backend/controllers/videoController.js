import Log from "../models/Log.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

// Utility to log admin actions
const logEvent = async (action, details) => {
  await Log.create({ action, details });
};

export const getVideoDetails = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;

  const response = await req.youtubeClient.videos.list({
    part: "snippet,statistics",
    id: videoId,
  });

  if (!response.data.items.length) {
    throw new CustomError(404, "Video not found");
  }

  const video = response.data.items[0];
  res.status(200).json(video);
});

export const updateVideoInfo = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!title || !description) {
    throw new CustomError(400, "Title and description are required");
  }

  const response = await req.youtubeClient.videos.update({
    part: "snippet",
    requestBody: {
      id: videoId,
      snippet: {
        title,
        description,
        categoryId: "22", // Static for now
      },
    },
  });

  await logEvent("Video Updated", `Title/Description updated for ${videoId}`);
  res.status(200).json(response.data);
});

export const getComments = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  // console.log("video id", videoId);

  const response = await req.youtubeClient.commentThreads.list({
    part: "snippet",
    videoId,
    maxResults: 20,
  });

  // console.log(response);
  res.status(200).json(response.data.items);
});

export const addComment = asyncWrapper(async (req, res) => {
  const { videoId } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new CustomError(400, "Comment text is required");
  }

  const response = await req.youtubeClient.commentThreads.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    },
  });

  await logEvent("Comment Added", `Video: ${videoId}`);
  res.status(201).json(response.data);
});

export const replyToComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;

  if (!text) {
    throw new CustomError(400, "Reply text is required");
  }

  const response = await req.youtubeClient.comments.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        parentId: commentId,
        textOriginal: text,
      },
    },
  });

  await logEvent("Reply Added", `Comment: ${commentId}`);
  res.status(201).json(response.data);
});

export const deleteComment = asyncWrapper(async (req, res) => {
  const { commentId } = req.params;

  await req.youtubeClient.comments.delete({ id: commentId });
  await logEvent("Comment Deleted", `Comment: ${commentId}`);
  res.status(200).json({ message: "Comment deleted successfully" });
});
