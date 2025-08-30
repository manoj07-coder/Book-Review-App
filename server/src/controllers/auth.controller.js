import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

export const signUp = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array });

  const { name, email, password } = req.body;
  const exists = await User.findOne({ email });
  if (exists)
    return res.status(400).json({ message: "Email already registered" });

  const user = await User.create({ name, email, password });
  const token = signToken(user._id);
  res.status(201).json({
    user: { id: user._id, name: user.name, email: user.email },
    token,
  });
});
