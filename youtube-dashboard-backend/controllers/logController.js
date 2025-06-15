import Log from "../models/Log.js";
import asyncWrapper from "../utils/asyncWrapper.js";
import CustomError from "../utils/customError.js";

export const getLogs = asyncWrapper(async (req, res) => {
  const logs = await Log.find().sort({ timestamp: -1 });

  if (!logs || logs.length === 0) {
    throw new CustomError(404, "No logs found");
  }

  res.status(200).json(logs);
});
