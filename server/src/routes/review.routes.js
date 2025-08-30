import { Router } from "express";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../controllers/review.controller.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/books/:id/reviews", protect, createReview);

router.put("/reviews/:id", protect, updateReview);

router.delete("/reviews/:id", protect, deleteReview);

export default router;
