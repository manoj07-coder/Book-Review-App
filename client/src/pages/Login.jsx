import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { motion } from "framer-motion";
import { AlertTriangle, LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(login(form));
    if (res.meta.requestStatus === "fulfilled") navigate("/");
    else setError("Login Failed, Please check your credentials.");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-sm sm:max-w-md bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl shadow-2xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="flex items-center gap-2 justify-center mb-4">
            <LogIn className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Login
            </h2>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={onSubmit}>
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              className="w-full border rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              className="w-full border rounded-lg p-3 text-sm sm:text-base focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={onChange}
              required
            />
            <button className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm sm:text-base font-semibold rounded-lg shadow-md hover:scale-105 transition">
              Login 🚀
            </button>
          </form>

          {/* Footer */}
          <p className="mt-4 text-center text-xs sm:text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Error Dialog */}
      <Dialog open={!!error} onOpenChange={() => setError("")}>
        <DialogContent className="max-w-xs sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600 text-sm sm:text-base">
              <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
              Login Error
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm">
              {error}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setError("")}
              className="text-sm sm:text-base"
            >
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Login;
