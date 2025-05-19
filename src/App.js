import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ProfielPage from "./Components/ProfilePage";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import {checkAndLoginWithToken} from "./Components/service";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Server-side verification
    checkAndLoginWithToken().then((res) => {
      if (res && res.message === "Authenticated") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        Cookies.remove("token"); // Clean up token if needed
      }
    });
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
