import { Router } from "express";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.js";
import { body } from "express-validator";

const router = Router();

router.post(
  "/books/:id/reviews",
  protect,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating 1-5 required")
      .toInt(),
    body("comment").optional().isString(),
  ],
  createReview
);

router.put(
  "/reviews/:id",

  protect,
  [
    body("rating")
      .isInt({ min: 1, max: 5 })
      .withMessage("Rating 1-5 required")
      .toInt(),
    body("comment").optional().isString(),
  ],
  updateReview
);

router.delete("/reviews/:id", protect, deleteReview);

export default router;
