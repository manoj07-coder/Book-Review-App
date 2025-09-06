import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/bookSlice";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { BookOpen, Search } from "lucide-react";
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [q, setQ] = useState("");
  const { list, loading } = useSelector((state) => state.books);

  // Fetch books on load or when page/q changes
  useEffect(() => {
    dispatch(fetchBooks({ page, q }));
  }, [dispatch, page, q]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to first page when searching
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header + Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            Books
          </h2>
        </div>

        <form
          onSubmit={onSearch}
          className="flex items-center w-full md:w-auto bg-white shadow-md rounded-full border px-3 sm:px-4 py-2 focus-within:ring-2 focus-within:ring-purple-400 transition"
        >
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={q}
            placeholder="Search title or author"
            className="ml-2 outline-none flex-1 md:w-64 text-sm sm:text-base"
            onChange={(e) => setQ(e.target.value)}
          />
          <button
            type="submit"
            className="ml-2 sm:ml-3 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-sm sm:text-base font-medium rounded-full hover:scale-105 transition"
          >
            Search
          </button>
        </form>
      </div>

      {/* Book Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <motion.div
              className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        ) : list.items.length > 0 ? (
          list.items.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <BookCard book={book} />
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-600 text-lg">
            No Books found 😢
          </p>
        )}
      </div>

      {/* Pagination */}
      {list.pages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            page={list.page}
            pages={list.pages}
            onChange={(p) => setPage(p)}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
