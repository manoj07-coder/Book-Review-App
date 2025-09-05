import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooksById } from "../features/books/bookSlice";
import RatingStars from "../components/RatingStars";
import {
  createReview,
  deleteReview,
  updateReview,
} from "../features/reviews/reviewSlice";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle, User } from "lucide-react";

const BookDetail = () => {
  const { id } = useParams();
  const { current, loading } = useSelector((state) => state.books);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  useEffect(() => {
    dispatch(fetchBooksById({ id }));
  }, [dispatch, id]);

  if (loading || !current)
    return <div className="container mx-auto p-4">Loading...</div>;

  const { book, reviews } = current;

  const hasReviewed = reviews.items.some(
    (r) => auth.user && r.user && r.user_id === auth.user_id
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!auth.token) return alert("Please Login to Review");
    if (editing && editingReviewId) {
      await dispatch(
        updateReview({ reviewId: editingReviewId, rating, comment })
      );
    } else {
      await dispatch(createReview({ bookId: id, rating, comment }));
    }
    dispatch(fetchBooksById({ id }));
    resetForm();
  };

  const handleEdit = (review) => {
    setEditing(true);
    setEditingReviewId(review._id);
    setRating(review.rating);
    setComment(review.comment);
  };

  const resetForm = () => {
    setRating(5);
    setComment("");
    setEditing(false);
    setEditingReviewId(null);
  };

  return (
    <div className="container mx-auto  p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 shadow-lg border border-gray-200 rounded-2xl"
      >
        <div className="flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-purple-500 mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
            <p className="text-sm text-gray-500">By {book.author}</p>
            <p className="text-xs font-medium text-pink-500">{book.genre}</p>
            <div className="mt-2">
              <RatingStars rating={book.avgRating ?? 0} />
            </div>
          </div>
        </div>
        <p className="mt-4 text-gray-700 leading-relaxed">
          {book.description}{" "}
        </p>
        <section className="mt-8">
          <h3 className=" text-lg font-semibold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-pink-500" />
            Reviews
          </h3>
          {auth.user && (!hasReviewed || editing) && (
            <form
              onSubmit={onSubmit}
              className="mt-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-4 shadow-inner space-y-3"
            >
              <div>
                <label className="block text-sm font-medium">Rating</label>
                <select
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 p-2 mt-1"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  {[5, 4, 3, 2, 1].map((v) => (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border outline-none rounded-lg p-2  mt-1 shadow-sm focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg shadow  hover:opacity-90 transition">
                  {editing ? "Update Review" : "Submit Review"}
                </button>
                {editing && (
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg shadow hover:bg-gray-300 transition"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="mt-6 space-y-4">
            {reviews.items.length === 0 ? (
              <p className="text-sm text-gray-500">No Reviews yet.</p>
            ) : (
              reviews.items.map((review) => (
                <motion.div
                  key={review._id}
                  whileHover={{ scale: 1.01 }}
                  className="p-4 bg-gray-50 border rounded-xl shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-5 h-5 text-purple-500" />
                    <strong className="text-gray-800">
                      {review.user?.name ?? "Anonymous"}
                    </strong>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </div>

                  <div className="mt-1">
                    <RatingStars rating={review.rating} />
                  </div>
                  <p className="mt-2 text-gray-700">{review.comment}</p>

                  {auth.user &&
                    review.user &&
                    auth.user.id === review.user._id &&
                    !editing && (
                      <div className="flex gap-4 mt-2 text-sm">
                        <button
                          onClick={() => handleEdit(review)}
                          className="text-blue-500 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (window.confirm("Delete Review")) {
                              await dispatch(
                                deleteReview({ reviewId: review._id })
                              );
                              dispatch(fetchBooksById({ id }));
                            }
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                </motion.div>
              ))
            )}
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default BookDetail;
