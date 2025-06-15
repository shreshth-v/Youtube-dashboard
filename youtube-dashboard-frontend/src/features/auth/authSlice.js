import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "../../utils/apiClient";
import { toast } from "react-toastify";

// Check if user is authenticated
export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/check");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Auth check failed");
    }
  }
);

// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/logout");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Logout failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authUser: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutLocal: (state) => {
      state.authUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.authUser = action.payload;
        toast.success("Login successfully");
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.authUser = null;
        state.error = action.payload;
        toast.error(action.payload || "Authentication failed");
      })

      // logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.authUser = null;
        toast.success("Logged out successfully");
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload || "Logout failed");
      });
  },
});

export const { logoutLocal } = authSlice.actions;
export default authSlice.reducer;
