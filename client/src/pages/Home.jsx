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
  const { list, loading } = useSelector((state) => state.books);
  const [q, setQ] = useState("");

  useEffect(() => {
    dispatch(fetchBooks({ page }));
  }, [dispatch, page]);

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(fetchBooks({ page, q }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <BookOpen className="w-7 h-7 text-purple-600" />
          <h2 className="text-3xl font-extrabold text-gray-800">Books</h2>
        </div>
        <form
          onSubmit={onSearch}
          className="flex items-center bg-white shadow-md rounded-full border px-4 py-2 focus-within:ring-2 focus-within:ring-purple-400 transition"
        >
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            value={q}
            placeholder="Search title or author"
            className="ml-2 outline-none w-48 sm:w-64"
            onChange={(e) => setQ(e.target.value)}
          />
          <button className="ml-3 px-4 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-full hover:scale-105 transition">
            Search
          </button>
        </form>
      </div>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full flex justify-center items-center py-12">
            <motion.div
              className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"
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

      <div className="mt-8 flex justify-center">
        <Pagination
          page={list.page}
          pages={list.pages}
          onChange={(p) => {
            setPage(p);
            dispatch(fetchBooks({ page: p }));
          }}
        />
      </div>
    </div>
  );
};

export default Home;
