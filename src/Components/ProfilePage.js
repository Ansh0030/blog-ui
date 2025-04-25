// ProfilePage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./comp.css";

export default function ProfielPage() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="card-image">
      <h2>Welcome to your Profile!</h2>
      <img
        className="profileImg"
        src="/assets/notFound.jpg"
        alt="Profile Visual"
      />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
