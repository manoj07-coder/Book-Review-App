import React from "react";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";

const App = () => {
  return (
    <div className="">
      <NavBar />
      <main className="">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/search" element={<Home />} />
          <Route
            path="/add"
            element={
              <ProtectedRoute>
                <AddBook />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
