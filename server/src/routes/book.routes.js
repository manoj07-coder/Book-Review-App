import { Router } from "express";
import {
  createBook,
  getBookById,
  getBooks,
  searchBooks,
} from "../controllers/book.controller.js";
import { body } from "express-validator";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post(
  "/books",
  protect,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("author").trim().notEmpty().withMessage("Author is required"),
    body("genre").optional().isString(),
    body("description").optional().isString(),
    body("publishedYear").optional().isInt({ min: 0 }).toInt(),
  ],
  createBook
);

router.get("/books", getBooks);

router.get("/book/:id", getBookById);

router.get("/search", searchBooks);

export default router;
