import React from "react";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import AddBook from "./pages/AddBook";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
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
