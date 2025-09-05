import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  PlusCircle,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-4 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between px-6 py-4 rounded-2xl shadow-xl bg-gradient-to-r from-indigo-400/80 via-purple-400/80 to-pink-400/80 backdrop-blur-md border border-white/20 text-white">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl sm:text-3xl font-extrabold tracking-wider drop-shadow-md"
          >
            <BookOpen className="w-7 h-7 sm:w-8 sm:h-8" />
            Book<span className="text-yellow-200">Review</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/add"
              className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 font-medium rounded-full shadow-md hover:scale-105 transition"
            >
              <PlusCircle className="w-5 h-5" /> Add Book
            </Link>
            {auth.user ? (
              <div className="flex items-center gap-5">
                <span className="text-base font-medium drop-shadow-sm">
                  Hi, <span className="font-semibold">{auth.user.name}</span>
                </span>
                <button
                  className="flex items-center gap-2 text-sm bg-red-500 px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 text-sm bg-white text-purple-600 font-medium px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
                >
                  <UserPlus className="w-4 h-4" /> SignUp
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 px-6 py-4 rounded-2xl shadow-xl bg-gradient-to-r from-indigo-400/90 via-purple-400/90 to-pink-400/90 backdrop-blur-md border border-white/20 text-white flex flex-col gap-4">
            <Link
              to="/add"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 bg-white text-purple-600 px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
            >
              <PlusCircle className="w-5 h-5" /> Add Book
            </Link>
            {auth.user ? (
              <>
                <span className="text-base font-medium">
                  Hi, <span className="font-semibold">{auth.user.name}</span>
                </span>
                <button
                  className="flex items-center gap-2 text-sm bg-red-500 px-4 py-2 rounded-full shadow hover:bg-red-600 transition"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm font-medium hover:underline"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-sm bg-white text-purple-600 px-4 py-2 rounded-full shadow-md hover:scale-105 transition"
                >
                  <UserPlus className="w-4 h-4" /> SignUp
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
