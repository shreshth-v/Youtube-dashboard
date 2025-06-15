import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";

// Thunks
export const fetchVideoDetails = createAsyncThunk(
  "video/fetchDetails",
  async (videoId, thunkAPI) => {
    try {
      const res = await apiClient.get(`video/${videoId}`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const updateVideoInfo = createAsyncThunk(
  "video/updateInfo",
  async ({ videoId, data }, thunkAPI) => {
    try {
      const res = await apiClient.put(`video/${videoId}`, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchComments = createAsyncThunk(
  "video/fetchComments",
  async (videoId, thunkAPI) => {
    try {
      const res = await apiClient.get(`video/${videoId}/comments`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addComment = createAsyncThunk(
  "video/addComment",
  async ({ videoId, text }, thunkAPI) => {
    try {
      const res = await apiClient.post(`video/${videoId}/comments`, { text });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const replyToComment = createAsyncThunk(
  "video/replyToComment",
  async ({ commentId, text }, thunkAPI) => {
    try {
      const res = await apiClient.post(
        `video/${
          thunkAPI.getState().video.videoId
        }/comments/${commentId}/reply`,
        { text }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "video/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      await apiClient.delete(`video/comments/${commentId}`);
      return commentId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Initial State
const initialState = {
  videoId: "aMWVwq1ONsE",
  details: null,
  comments: [],
  loading: false,
  error: null,
};

// Slice
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoId: (state, action) => {
      state.videoId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchVideoDetails
      .addCase(fetchVideoDetails.fulfilled, (state, action) => {
        state.details = action.payload;
      })
      .addCase(fetchVideoDetails.rejected, (_, action) => {
        toast.error("Failed to load video details");
      })

      // updateVideoInfo
      .addCase(updateVideoInfo.fulfilled, (state, action) => {
        state.details = action.payload;
        toast.success("Video details updated");
      })
      .addCase(updateVideoInfo.rejected, (_, action) => {
        toast.error("Failed to update video");
      })

      // fetchComments
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (_, action) => {
        toast.error("Failed to load comments");
      })

      // addComment
      .addCase(addComment.fulfilled, (state, action) => {
        state.comments.unshift(action.payload);
        toast.success("Comment added");
      })
      .addCase(addComment.rejected, (_, action) => {
        toast.error("Failed to add comment");
      })

      // deleteComment
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.comments = state.comments.filter(
          (comment) => comment.id !== action.payload
        );
        toast.success("Comment deleted");
      })
      .addCase(deleteComment.rejected, (_, action) => {
        toast.error("Failed to delete comment");
      })

      // replyToComment
      .addCase(replyToComment.fulfilled, () => {
        toast.success("Reply added");
      })
      .addCase(replyToComment.rejected, (_, action) => {
        toast.error("Failed to reply");
      })

      // loading state matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("video/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      // fulfilled matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("video/") &&
          action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )

      // rejected matcher
      .addMatcher(
        (action) =>
          action.type.startsWith("video/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload?.message || action.payload || "Something went wrong";
        }
      );
  },
});

export const { setVideoId } = videoSlice.actions;
export default videoSlice.reducer;
