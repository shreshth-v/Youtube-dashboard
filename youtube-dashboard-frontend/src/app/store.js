// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import videoReducer from "../features/video/videoSlice";
import noteReducer from "../features/notes/notesSlice";
import logReducer from "../features/logs/logSlice_temp";

const store = configureStore({
  reducer: {
    auth: authReducer,
    video: videoReducer,
    notes: noteReducer,
    logs: logReducer,
  },
});

export default store;
