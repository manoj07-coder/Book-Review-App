import express from "express";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import cors from "cors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/errro.js";

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "test") app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.json({ ok: true, message: "Book Review App is running" })
);

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", reviewRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
