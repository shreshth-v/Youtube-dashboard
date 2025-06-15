import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";

export const createNote = createAsyncThunk("notes/create", async (noteData, thunkAPI) => {
  try {
    const res = await apiClient.post("notes", noteData);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const fetchNotes = createAsyncThunk("notes/fetch", async (videoId, thunkAPI) => {
  try {
    const res = await apiClient.get(`notes/${videoId}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const searchNotes = createAsyncThunk("notes/search", async (query, thunkAPI) => {
  try {
    const res = await apiClient.get(`notes/search/${query}`);
    return res.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addCase(searchNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
      })
      .addMatcher(
        (action) => action.type.startsWith("notes/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("notes/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("notes/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload?.message || "Note error";
        }
      );
  },
});

export default noteSlice.reducer;