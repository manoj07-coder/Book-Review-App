import React from "react";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
