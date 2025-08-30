import express from "express";
import authRoutes from "./routes/auth.routes.js";
import bookRoutes from "./routes/book.routes.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) =>
  res.json({ ok: true, message: "Book Review App is running" })
);

app.use("/api", authRoutes);
app.use("/api", bookRoutes);

export default app;
