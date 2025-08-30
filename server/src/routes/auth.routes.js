import { Router } from "express";
import { body } from "express-validator";
import { signUp } from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/signup",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid Email required"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must contain min 8 chars"),
  ],
  signUp
);

export default router;
