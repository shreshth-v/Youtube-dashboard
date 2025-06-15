import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import videoRoutes from "./routes/videoRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true              
}));
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); 
});

// Routes
app.use("/api/video", videoRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/auth", authRoutes);


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Some went wrong" } = err;
  res.status(statusCode).json({ message });
});