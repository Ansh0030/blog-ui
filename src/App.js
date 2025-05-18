import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ProfielPage from "./Components/ProfilePage";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auto-login if token is valid
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setIsLoggedIn(true); // ✅ Token is valid, user is logged in
        } else {
          Cookies.remove("token"); // ❌ Token expired
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Invalid token:", err);
        Cookies.remove("token");
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true); // Called when user logs in manually
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/*"
            element={
              isLoggedIn ? <ProfielPage /> : <LoginPage onLogin={handleLogin} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
