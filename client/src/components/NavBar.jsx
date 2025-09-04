import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  PlusCircle,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between text-white">
        <Link
          to="/"
          className=" flex items-center gap-2 text-2xl font-bold tracking-wide"
        >
          <BookOpen className="w-7 h-7" />
          Book Review
        </Link>

        <div className="flex items-center gap-5">
          <Link
            to="/add"
            className="hidden sm:flex items-center gap-2 bg-white text-purple-600 px-3  py-1 rounded-full shadow-md hover:scale-105 transition"
          >
            <PlusCircle className="w-4 h-4" /> Add Book
          </Link>
          {auth.user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">Hi, {auth.user.name}</span>
              <button
                className="flex items-center gap-1 text-sm bg-red-500 px-3 py-1 rounded-full shadow hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="flex items-center gap-1 text-sm hover:underline"
              >
                <LogIn className="w-4 h-4" /> Login
              </Link>
              <Link
                to="/signup"
                className="flex items-center gap-1  text-sm bg-white text-purple-600 px-3 py-1 rounded shadow-md hover:scale-105 transition"
              >
                <UserPlus className="w-4 h-4" /> SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
