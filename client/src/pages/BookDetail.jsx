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
      <div className="bg-white p-6 shadow rounded">
        <h2 className="text-2xl font-semibold">{book.title}</h2>
        <p className="text-muted">By {book.author}</p>
        <div className="mt-2">
          <RatingStars rating={book.avgRating ?? 0} />
        </div>
        <p className="mt-4">{book.description} </p>
        <section className="mt-6">
          <h3 className=" text-lg font-semibold">Reviews</h3>
          {auth.user && (!hasReviewed || editing) && (
            <form onSubmit={onSubmit} className="mt-4 space-y-2">
              <div>
                <label className="block text-sm">Rating</label>
                <select
                  className="rounded border p-2"
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
                <label>Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-2 bg-indigo-600 text-white rounded">
                  {editing ? "Update Review" : "Submit Review"}
                </button>
                {editing && (
                  <button
                    className="px-3 py-2 bg-gray-300 rounded"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          )}

          <div>
            {reviews.items.length === 0 ? (
              <p>No Reviews</p>
            ) : (
              reviews.items.map((review) => (
                <div key={review._id}>
                  <div>
                    <div>
                      <strong>{review.user?.name ?? "Anonymous"}</strong>
                      <div className="text-sm text-muted">
                        {new Date(review.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <RatingStars rating={review.rating} />
                    </div>
                    <p>{review.comment}</p>
                    {auth.user &&
                      review.user &&
                      auth.user.id === review.user._id && (
                        <div className="flex space-x-4 mt-2 text0sm">
                          <button
                            onClick={() => handleEdit(review)}
                            className="text-blue-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              if (confirm("Delete Review")) {
                                await dispatch(
                                  deleteReview({ reviewId: review._id })
                                );
                                dispatch(fetchBooksById({ id }));
                              }
                            }}
                            className="text-red-500 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BookDetail;
