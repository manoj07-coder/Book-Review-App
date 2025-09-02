import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/books/bookSlice";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";

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
        <h2 className="text-2xl font-semibold">Books</h2>
        <form onSubmit={onSearch} className="flex gap-2">
          <input
            type="text"
            value={q}
            placeholder="Search title or author"
            className="px-3 py-2 border rounded-md"
            onChange={(e) => setQ(e.target.value)}
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

      <Pagination
        page={list.page}
        pages={list.pages}
        onChange={(p) => {
          setPage(p);
          dispatch(fetchBooks({ page: p }));
        }}
      />
    </div>
  );
};

export default Home;
