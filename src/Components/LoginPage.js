import React, { useState } from "react";
import "./comp.css";
import { login, register } from "./service";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [signupCred, setSignupCred] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleSignUP = () => {
    setIsFlipped(!isFlipped);
  };

  const handleFlip = async () => {
    try {
      const submit = await register(signupCred);
      console.log(submit);
      setIsFlipped(!isFlipped);
    } catch (error) {
      alert("Something went wrong");
      console.log("Registration Failed", error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await login(credentials);
      console.log("Login successful:", result);
      // Perform any post-login logic, like navigating to a profile page
      onLogin();
      navigate("/profile");
    } catch (error) {
      alert("Invalid Credentials");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="mainContainer">
      {/* Login Page */}
      <div className="flip-card">
        <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
          <div className="flip-card-front">
            <div className="card-content">
              <h1>bloghub</h1>

              <p className="title">Login</p>

              <input
                className="inputBox"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
              />
              <input
                className="inputBox"
                type="password"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <div className="button-container">
                <button onClick={handleSignUP}>Sign Up</button>
                <button onClick={handleLogin}>Login</button>
              </div>
            </div>
            <div className="card-image">
              <img src="/assets/login.jpg" alt="Login Visual" />
            </div>
          </div>

          {/* Sign Up page */}
          <div className="flip-card-back">
            <div className="card-image">
              <img src="/assets/register.jpg" alt="Register Visual" />
            </div>
            <div className="card-content">
              <div className="header">
                <HiArrowLeft className="backIcon" onClick={handleSignUP} />
                <p className="title">Create Account</p>
              </div>

              <input
                className="inputBox"
                value={signupCred.username}
                onChange={(e) =>
                  setSignupCred({
                    ...signupCred,
                    username: e.target.value,
                  })
                }
                placeholder="Username"
              />

              <input
                className="inputBox"
                value={signupCred.name}
                onChange={(e) =>
                  setSignupCred({
                    ...signupCred,
                    name: e.target.value,
                  })
                }
                placeholder="First Name"
              />

              <input
                className="inputBox"
                value={signupCred.surname}
                onChange={(e) =>
                  setSignupCred({
                    ...signupCred,
                    surname: e.target.value,
                  })
                }
                placeholder="Last Name"
              />

              <input
                className="inputBox"
                type="password"
                value={signupCred.password}
                onChange={(e) =>
                  setSignupCred({
                    ...signupCred,
                    password: e.target.value,
                  })
                }
                placeholder="Password"
              />
              <button onClick={handleFlip}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
