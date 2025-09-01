import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/bookSlice";
import BookCard from "../components/BookCard";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { list, loading } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks({ page }));
  }, [dispatch, page]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Books</h2>
        <form className="flex gap-2">
          <input
            type="text"
            placeholder="Search title or author"
            className="px-3 py-2 border rounded-md"
          />
          <button className="px-3 py-2 bg-indigo-600 text-white rounded-md">
            Search
          </button>
        </form>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <p>Loading ..</p>
        ) : (
          list.items.map((book) => <BookCard key={book._id} book={book} />)
        )}
      </div>
    </div>
  );
};

export default Home;
