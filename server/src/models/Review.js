import mongoose, { mongo } from "mongoose";

const ReviewSchema = new mongoose.Schema(
  {
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

ReviewSchema.statics.reComputeBookStats = async function (bookId) {
  const Book = mongoose.model("Book");
  const Review = this;
  const stats = await Review.aggregate([
    { $match: { book: new mongoose.Types.ObjectId(bookId) } },
    {
      $group: {
        _id: "$book",
        avgRating: { $avg: "$rating" },
        numReviews: { $sum: 1 },
      },
    },
  ]);

  const data = stats[0] || { avgRating: 0, numReviews: 0 };
  await Book.findByIdAndUpdate(bookId, {
    avgRating: data.avgRating,
    numReviews: data.numReviews,
  });
};

export default mongoose.model("Review", ReviewSchema);
