import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";

const BookCard = ({ book }) => {
  return (
    <motion.article
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-2xl shadow-md p-5  border border-gray-200 flex flex-col h-full transition"
    >
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-purple-500" />
        <h3 className="text-lg font-bold text-gray-800">{book.title}</h3>
      </div>
      <p className="text-sm text-gray-500 mb-2">By {book.author}</p>
      <p className="text-xm font-medium text-pink-800">{book.genre}</p>
      <div className="mt-2 flex items-center gap-2">
        <RatingStars rating={book.avgRating ?? 0} />
        <p className="text-xs text-gray-600">
          {book.numReviews > 0 ? `(${book.numReviews} reviews)` : ""}
        </p>
      </div>
      <p className="mt-3 text-sm text-gray-600 line-clamp-3 flex-1">
        {book.description ?? "No description available"}
      </p>

      <div className="mt-4">
        <Link
          to={`/books/${book._id}`}
          className="inline-block text-sm font-medium px-4 py-2  rounded-full text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 transition"
        >
          View details →
        </Link>
      </div>
    </motion.article>
  );
};

export default BookCard;
