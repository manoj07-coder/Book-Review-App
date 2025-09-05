import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBook } from "../features/books/bookSlice";
import { motion } from "framer-motion";
import { Book, User, Tag, Calendar, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AddBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    description: "",
    publishedYear: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        publishedYear: form.publishedYear
          ? Number(form.publishedYear)
          : undefined,
      };
      const res = await dispatch(createBook(payload));

      if (res.meta.requestStatus === "fulfilled") {
        toast({
          title: (
            <div className="flex items-center gap-2 text-green-600">
              <Book className="w-5 h-5" />
              <span>Book Added!</span>
            </div>
          ),
          description: `"${form.title}" has been added to the collection`,
        });
        navigate("/");
      } else {
        throw new Error("Failed to add book");
      }
    } catch (error) {
      toast({
        title: (
          <div className="flex items-center gap-2 text-red-600">
            <Book className="w-5 h-5" />
            <span>Error</span>
          </div>
        ),
        description: "Could not add Book, please try again!",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 mx-auto p-6 sm:p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
          Add a new Book
        </h2>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          {/* Title */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <Book className="w-5 h-5 text-indigo-500 mr-2" />
            <input
              name="title"
              onChange={onChange}
              placeholder="Title"
              className="w-full outline-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Author */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <User className="w-5 h-5 text-indigo-500 mr-2" />
            <input
              name="author"
              onChange={onChange}
              placeholder="Author"
              className="w-full outline-none text-sm sm:text-base"
              required
            />
          </div>

          {/* Genre */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <Tag className="w-5 h-5 text-indigo-500 mr-2" />
            <input
              name="genre"
              onChange={onChange}
              placeholder="Genre"
              className="w-full outline-none text-sm sm:text-base"
            />
          </div>

          {/* Description */}
          <div className="flex items-start border rounded-lg bg-white shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <FileText className="w-5 h-5 text-indigo-500 mt-1 mr-2" />
            <textarea
              name="description"
              onChange={onChange}
              placeholder="Description"
              className="w-full outline-none resize-none text-sm sm:text-base"
              rows={3}
            />
          </div>

          {/* Published Year */}
          <div className="flex items-center border rounded-lg bg-white shadow-sm px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400">
            <Calendar className="w-5 h-5 text-indigo-500 mr-2" />
            <input
              name="publishedYear"
              onChange={onChange}
              placeholder="Published Year"
              className="w-full outline-none text-sm sm:text-base"
            />
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg transition"
          >
            Create Book 🚀
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default AddBook;
