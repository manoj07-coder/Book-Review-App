import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBook } from "../features/books/bookSlice";

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

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      publishedYear: form.publishedYear
        ? Number(form.publishedYear)
        : undefined,
    };
    const res = await dispatch(createBook(payload));
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl bg-white mx-auto  p-6 rounded shadow ">
        <h2 className="text-2xl font-semibold">Add a new Book</h2>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            name="title"
            onChange={onChange}
            placeholder="Title"
            className="w-full border rounded p-2"
            required
          />
          <input
            name="author"
            onChange={onChange}
            placeholder="Author"
            className="w-full border rounded p-2"
            required
          />
          <input
            name="genre"
            onChange={onChange}
            placeholder="Genre"
            className="w-full border rounded p-2"
          />
          <textarea
            name="description"
            onChange={onChange}
            placeholder="Description"
            className="w-full border rounded p-2"
          />
          <input
            name="publishedYear"
            onChange={onChange}
            placeholder="Published Year"
            className="w-full border rounded p-2"
          />
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-indigo-600 text-white rounded">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
