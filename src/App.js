import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import ProfielPage from "./Components/ProfilePage";
import { useState } from "react";
import ErrorPage from "./Components/ErrorPage";

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
            path="/profile"
            element={
              isLoggedIn ? <ProfielPage /> : <LoginPage onLogin={handleLogin} />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
