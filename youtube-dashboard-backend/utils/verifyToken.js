import jwt from "jsonwebtoken";
import User from "../models/User.js";
import CustomError from "../utils/customError.js";
import asyncWrapper from "../utils/asyncWrapper.js";

const verifyToken = asyncWrapper(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new CustomError(400, "Token not found");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(payload._id);

  if (!user) {
    throw new CustomError(404, "User not found");
  }

  req.user = user;
  next();
});

export default verifyToken;
