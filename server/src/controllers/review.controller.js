import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import Review from "../models/Review.js";

export const createReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book id" });
  }

  const exists = await Review.findOne({ book: id, user: userId });
  if (exists) {
    return res.status(400).json({ message: "You already reviewed this book" });
  }

  const review = await Review.create({
    book: id,
    user: userId,
    rating,
    comment,
  });

  await Review.reComputeBookStats(id);

  res.status(201).json(review);
});

export const updateReview = () => {};

export const deleteReview = () => {};
