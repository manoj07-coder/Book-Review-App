import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../features/auth/authSlice";
import { motion } from "framer-motion";
import { AlertTriangle, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(signup(form));
    console.log(res.meta.requestStatus);

    if (res.meta.requestStatus === "fulfilled") navigate("/");
    else setError("Sign Up Failed, Please try again.");
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-300">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8"
        >
          <div className="flex items-center gap-2 justify-center mb-4">
            <UserPlus className="w-6 h-6 text-pink-600" />
            <h2 className="text-2xl font-bold text-gray-800">Create account</h2>
          </div>
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={onChange}
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Email"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={onChange}
              required
            />
            <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Password"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-pink-400 outline-none"
              onChange={onChange}
              required
            />
            <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg shadow-md hover:scale-105 transition">
              Sign Up
            </button>
          </form>
        </motion.div>
      </div>

      <Dialog open={!!error} onOpenChange={() => setError("")}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              Sign Up Error
            </DialogTitle>
            <DialogDescription>{error}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setError("")}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Signup;
