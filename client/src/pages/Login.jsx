import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === "fulfilled") navigate("/");
    else alert("Login failed");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded p-6 shadow">
        <h2 className="text-xl font-semibold">Login</h2>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="Email"
            className="w-full border rounded p-2 "
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="Password"
            className="w-full border rounded p-2 "
            onChange={onChange}
            required
          />
          <button className="px-4 py-2 rounded bg-indigo-600 text-white">
            Login
          </button>
        </form>
        <p className="mt-3 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
