import { validationResult } from "express-validator";
import asyncHandler from "../utils/asyncHandler.js";
import Book from "../models/Book.js";

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

export const getBooks = () => {};

export const getBookById = () => {};

export const searchBooks = () => {};
