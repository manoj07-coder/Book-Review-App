import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import Book from "../models/Book.js";
import mongoose from "mongoose";

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
    Book.find(filter).sort({ createAt: -1 }).skip(skip).limit(limit),
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
  res.json({ book: { ...book } });
});

export const searchBooks = () => {};
