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
import {
  AlertTriangle,
  BookOpen,
  CheckCircle2,
  Info,
  MessageCircle,
  Pencil,
  Trash2,
  User,
  XCircle,
} from "lucide-react";
import RatingStarsInput from "@/components/RatingStarsInput";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const BookDetail = () => {
  const { id } = useParams();
  const { current, loading } = useSelector((state) => state.books);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const { toast } = useToast();

  useEffect(() => {
    dispatch(fetchBooksById({ id }));
  }, [dispatch, id]);

  if (loading || !current)
    return (
      <div className="col-span-full flex justify-center items-center py-12">
        <motion.div
          className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"
          initial={{ rotate: 0 }}
          // animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
        />
      </div>
    );

  const { book, reviews } = current;

  const hasReviewed = reviews.items.some(
    (r) => auth.user && r.user && r.user._id === auth.user.id
  );

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!auth.token) {
      toast({
        title: (
          <div className="flex items-center gap-2 text-yellow-600">
            <AlertTriangle className="w-5 h-5" />
            <span>Login Required</span>
          </div>
        ),
        description: "You must be logged in to leave a review.",
        variant: "destructive",
      });
      return;
    }
    if (editing && editingReviewId) {
      await dispatch(
        updateReview({ reviewId: editingReviewId, rating, comment })
      );
      toast({
        title: (
          <div className="flex items-center gap-2 text-blue-600">
            <Info className="w-5 h-5" />
            <span>Review Updated</span>
          </div>
        ),
        description: "Your review has been successfully updated.",
      });
    } else {
      await dispatch(createReview({ bookId: id, rating, comment }));
      toast({
        title: (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span>Review Submitted</span>
          </div>
        ),
        description: "Thank you for sharing your thoughts!.",
      });
    }
    dispatch(fetchBooksById({ id }));
    resetForm();

    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
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
                <label className="block text-sm font-medium mb-1">Rating</label>
                <RatingStarsInput rating={rating} setRating={setRating} />
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
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleEdit(review)}
                          className="p-2 rounded-full  bg-blue-100 hover:bg-blue-200 text-blue-600"
                        >
                          <Pencil size={18} />
                        </motion.button>
                        <motion.button
                          onClick={async () => {
                            setReviewToDelete(review);
                            setShowDeleteDialog(true);
                          }}
                          className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600"
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    )}
                </motion.div>
              ))
            )}
          </div>
        </section>
      </motion.div>

      {/* <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-green-600 ">
              ✅ Review Saved!
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-500">
            Your review has been submitted successfully.
          </p>
        </DialogContent>
      </Dialog> */}

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <Trash2 className="w-5 h-5" />
              Delete Review?
            </DialogTitle>
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this review? This action cannot be
              undone.
            </p>
          </DialogHeader>
          <DialogFooter>
            <button
              className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
              onClick={() => {
                setShowDeleteDialog(false);
              }}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
              onClick={async () => {
                if (reviewToDelete) {
                  await dispatch(
                    deleteReview({ reviewId: reviewToDelete._id })
                  );
                  dispatch(fetchBooksById({ id }));
                  toast({
                    title: (
                      <div className="flex items-center gap-2 text-red-600 ">
                        <XCircle className="w-5 h-5 " />
                        <span>Review Deleted</span>
                      </div>
                    ),
                    description: "Your review has been removed.",
                  });
                  setReviewToDelete(null);
                  setShowDeleteDialog(false);
                }
              }}
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookDetail;
