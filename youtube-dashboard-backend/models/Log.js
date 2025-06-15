import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  action: { type: String, required: true },
  details: { type: String },
  timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);
export default Log;
