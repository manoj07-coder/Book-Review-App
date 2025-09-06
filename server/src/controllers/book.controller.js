import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";
import Review from "../models/Review.js";

export const createBook = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array });

  const { title, author, genre, description, publishedYear } = req.body;
  const createdBy = req.user._id;
  const book = await Book.create({
    title,
    author,
    genre,
    description,
    publishedYear,
    createdBy,
  });
  res.status(200).json(book);
});

export const getBooks = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 100);
  const skip = (page - 1) * limit;

  const filter = {};
  if (req.query.author)
    filter.author = { $regex: req.query.author, $options: "i" };
  if (req.query.genre)
    filter.genre = { $regex: req.query.genre, $options: "i" };

  const [items, total] = await Promise.all([
    Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Book.countDocuments(filter),
  ]);

  res.json({
    page,
    limit,
    total,
    pages: Math.ceil(total / limit),
    items,
  });
});

export const getBookById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid book id" });
  }

  const book = await Book.findById(id)
    .populate("createdBy", "name email")
    .lean();
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  const reviewPage = Math.max(parseInt(req.query.reviewPage, 10) || 1, 1);
  const reviewLimit = Math.min(
    Math.max(parseInt(req.query.reviewLimit, 10) || 5, 1),
    100
  );
  const skip = (reviewPage - 1) * reviewLimit;

  const [reviews, totalReviews] = await Promise.all([
    Review.find({ book: id })
      .populate("user", "name email")
      .sort({ createdBy: -1 })
      .skip(skip)
      .limit(reviewLimit)
      .lean(),
    Review.countDocuments({ book: id }),
  ]);

  let avgRating = book.avgRating ?? 0;
  let numReviews = book.numReviews ?? 0;

  if ((numReviews === 0 && totalReviews > 0) || avgRating === undefined) {
    const stats = await Review.aggregate([
      { $match: { book: mongoose.Types.ObjectId(id) } },
      {
        $group: {
          _id: "$book",
          avgRating: { $avg: "$rating" },
          numReviews: { $sum: 1 },
        },
      },
    ]);
    if (stats[0]) {
      avgRating = stats[0].avgRating;
      numReviews = stats[0].numReviews;
    }
  }

  res.json({
    book: { ...book, avgRating, numReviews },
    reviews: {
      page: reviewPage,
      limit: reviewLimit,
      total: totalReviews,
      pages: Math.ceil(totalReviews / reviewLimit),
      items: reviews,
    },
  });
});

export const searchBooks = asyncHandler(async (req, res) => {
  const {
    q,
    page = 1,
    limit = 10,
    sortBy = "title",
    order = "asc",
  } = req.query;

  const currentPage = Math.max(parseInt(page, 10) || 1, 1);
  const pageLimit = Math.min(Math.max(parseInt(limit, 10) || 10, 1), 50);
  const skip = (currentPage - 1) * pageLimit;

  let filter = {};
  if (q && q.trim() !== "") {
    const regex = new RegExp(q.trim(), "i");
    filter = {
      $or: [{ title: regex }, { author: regex }],
    };
  }

  const sortOptions = {};
  sortOptions[sortBy] = order === "desc" ? -1 : 1;

  const [books, total] = await Promise.all([
    Book.find(filter).sort(sortOptions).skip(skip).limit(pageLimit).lean(),
    Book.countDocuments(filter),
  ]);

  res.json({
    page: currentPage,
    limit: pageLimit,
    total,
    pages: Math.ceil(total / pageLimit),
    items: books,
  });
});
