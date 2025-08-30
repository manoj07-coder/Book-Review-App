import mongoose, { mongo } from "mongoose";
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

export const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid review id" });
  }

  const review = await Review.findById(id);
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }

  if (review.user.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this review" });
  }

  review.rating = rating ?? review.rating;
  review.comment = comment ?? review.comment;

  await review.save();
  await Review.reComputeBookStats(review.book);

  res.json(review);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid review id" });
  }

  const review = await Review.findById(id);
  if (!review) {
    res.status(404).json({ message: "Review not found" });
  }

  if (review.user.toString() !== userId.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete the review" });
  }

  await review.deleteOne();
  await Review.reComputeBookStats(review.book);

  res.json({ message: "Review deleted successfully" });
});
