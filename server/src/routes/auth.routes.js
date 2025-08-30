import { Router } from "express";
import { body } from "express-validator";
import { login, signUp } from "../controllers/auth.controller.js";

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

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid Email required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

export default router;
