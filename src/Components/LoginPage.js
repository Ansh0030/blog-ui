import React, { useEffect, useState } from "react";
import "./comp.css";
import { checkAndLoginWithToken, checkLogin, login, register } from "./service";
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";
import {useAuth} from "../AuthAPI";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  // useEffect(() => {
  //   const autoLogin = async () => {
  //     const result = await checkAndLoginWithToken();
  //     if (result && result.redirect === "/profile") {
  //       navigate("/profile");
  //     }
  //   };
  //
  //   autoLogin();
  // }, []);

  const [signupCred, setSignupCred] = useState({
    username: "",
    password: "",
    name: "",
    surname: "",
  });

  const [isFlipped, setIsFlipped] = useState(false);

  const handleSignUP = () => {
    setIsFlipped(!isFlipped);
    setSignupCred({
        username: "",
        password: "",
        name: "",
        surname: "",
    })
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

  const { loginUser } = useAuth(); // from context

  const handleLogin = async () => {
    try {
      const result = await login(credentials);
      console.log("Login successful:", result);

      // store userId and username in context
      loginUser(result.user._id, result.user.username);

      onLogin(); // optional callback
      navigate("/profile");
    } catch (error) {
      alert("Invalid Credentials, Please try again");
      console.error("Login failed:", error);
    }
  };

  return (
      <div className="mainContainer">
        <div className="flip-card">
          <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
            {/* FRONT - Login */}
            <div className="flip-card-front">
              <div className="card-content">
                <h1 className="font-bold">Blo<span className="text-amber-400">gg</span>hub</h1>
                <p className="title">Login</p>

                <input
                    className="inputBox"
                    placeholder="Username"
                    value={credentials.username}
                    onChange={(e) =>
                        setCredentials({...credentials, username: e.target.value})
                    }
                />
                <input
                    className="inputBox"
                    type="password"
                    placeholder="Password"
                    value={credentials.password}
                    onChange={(e) =>
                        setCredentials({...credentials, password: e.target.value})
                    }
                />
                <div className="button-container">
                  <button onClick={handleSignUP}>Sign Up</button>
                  <button onClick={handleLogin}>Login</button>
                </div>
              </div>
              <div className="card-image">
                <img src="/assets/login.jpg" alt="Login Visual"/>
              </div>
            </div>

            {/* BACK - Signup */}
            <div className="flip-card-back">
              <div className="card-image">
                <img src="/assets/register.jpg" alt="Register Visual"/>
              </div>
              <div className="card-content">
                <p className="title">Create Account</p>

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

                <div className="name-container">
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
                </div>

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

                <div className="dual-buttons">
                  <button onClick={handleFlip}>Submit</button>
                  <button onClick={handleSignUP}>Back to Login</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
