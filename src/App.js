import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ProfielPage from "./Components/ProfilePage";
import React, { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
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
