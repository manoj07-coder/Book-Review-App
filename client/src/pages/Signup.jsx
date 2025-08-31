import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(signup(form));
    console.log(res.meta.requestStatus);

    if (res.meta.requestStatus === "fulfilled") navigate("/");
    else alert("Signup failed");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto rounded shadow p-6 bg-white">
        <h2 className="text-xl font-semibold">Create account</h2>
        <form onSubmit={onSubmit} className="mt-4 space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            placeholder="Name"
            className="w-full border rounded p-2"
            onChange={onChange}
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            className="w-full border p-2"
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            className="w-full border p-2"
            onChange={onChange}
            required
          />
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
