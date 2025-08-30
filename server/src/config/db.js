import mongoose from "mongoose";

export default async function connectDB() {
  const URI = process.env.MONGO_URI;
  mongoose.set("strictQuery", true);
  await mongoose.connect(URI);
  console.log("✅ MONGODB connected");
}
