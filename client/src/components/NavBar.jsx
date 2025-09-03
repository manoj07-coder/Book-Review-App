import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
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
    <header className="bg-white shadow">
      <div className="container mx-auto py-3 px-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-semibold">
          Book Review
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/add"
            className="hidden sm:inline-block bg-indigo-600 text-white px-3  py-1 rounded-md"
          >
            Add Book
          </Link>
          {auth.user ? (
            <div className="flex items-center gap-3">
              <span className="text-sm">Hi, {auth.user.name}</span>
              <button className="text-sm text-red-500" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="text-sm">
                Login
              </Link>
              <Link to="/signup" className="text-sm text-indigo-600">
                SignUp
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
