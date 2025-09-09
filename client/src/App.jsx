import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import TodoApp from "./pages/TodoApp.jsx";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
    
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        {/* agar token bo‘lsa → TodoApp sahifasi */}
        <Route
          path="/"
          element={
            token ? (
              <TodoApp token={token} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* login sahifasi */}
        <Route
          path="/login"
          element={<Login onLogin={handleLogin} />}
        />

        {/* register sahifasi */}
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </Router>
  );
}
