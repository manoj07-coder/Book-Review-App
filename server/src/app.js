import express from "express";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";
import reviewRoutes from "./routes/review.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) =>
  res.json({ ok: true, message: "Book Review App is running" })
);

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", reviewRoutes);

export default app;
