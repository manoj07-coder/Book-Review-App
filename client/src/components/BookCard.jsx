import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "./RatingStars";

const BookCard = ({ book }) => {
  return (
    <article className="border rounded-lg p-4 hover:shadow-lg  transition-shadow h-full flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{book.title}</h3>
        <p className="text-sm text-muted">{book.author}</p>
        <p className="text-sm text-muted">{book.genre}</p>
        <div className="mt-2">
          <RatingStars rating={book.avgRating ?? 0} />
          <p>{book.numReviews}</p>
        </div>
        <p className="mt-3 text-sm text-muted line-clamp-3">
          {book.description ?? "No description"}
        </p>
      </div>
      <div className="mt-3">
        <Link to={`/books/${book._id}`} className="text-indigo-600 text-sm">
          View details →
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
