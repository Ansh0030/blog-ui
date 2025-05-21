import React, { useState } from "react";
import "./comp.css";
import { login, register } from "./service";
import { useNavigate } from "react-router-dom";
import {HiCheckCircle, HiInformationCircle} from "react-icons/hi";
import { Alert } from "flowbite-react";
import { useAuth } from "../AuthAPI";

export default function LoginPage({ onLogin }) {
    const navigate = useNavigate();
    const { loginUser } = useAuth(); // from context

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
    const [content, setContent] = useState("");
    const [alertError, setAlertError] = useState(false);
    const [alertSucc, setAlertSucc] = useState(false);

    const handleSignUP = () => {
        setIsFlipped(!isFlipped);
        setSignupCred({
            username: "",
            password: "",
            name: "",
            surname: "",
        });
    };

    const handleFlip = async () => {
        try {
            const submit = await register(signupCred);
            if (submit) {
                setAlertSucc(true);
                setContent("User Registered Successfully!");
                setIsFlipped(!isFlipped);
                setCredentials(submit);

                // Hide success alert after 5 seconds
                setTimeout(() => {
                    setAlertSucc(false);
                }, 5000);
            } else {
                throw new Error("Registration failed");
            }
        } catch (error) {
            setAlertError(true);
            setContent("Registration failed, Fill up required details");

            // Hide error alert after 5 seconds
            setTimeout(() => {
                setAlertError(false);
            }, 5000);

            console.log("Registration Failed", error);
        }
    };


    const handleLogin = async () => {
        try {
            const result = await login(credentials);

            if (result?.user) {
                loginUser(result.user._id, result.user.username);
                setContent("Login successful!");
                setAlertSucc(true);

                // Hide success alert after 5 seconds
                setTimeout(() => {
                    setAlertSucc(false);
                }, 5000);

                onLogin();
                navigate("/profile");
            } else {
                throw new Error("Invalid response: user not found");
            }

        } catch (error) {
            setAlertError(true);
            setContent("Invalid Credentials, Please try again");

            // Hide error alert after 5 seconds
            setTimeout(() => {
                setAlertError(false);
            }, 5000);

            console.error("Login failed:", error);
        }
    };


    return (
        <div>
            <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
                <div className="space-y-4 max-w-xl w-full mt-4">
                    {alertError && (
                        <Alert color="failure" className="w-full shadow-lg pointer-events-auto">
                            <div className="flex items-center gap-2">
                                <HiInformationCircle className="h-5 w-5 text-red-700"/>
                                <span className="font-medium">Error alert!</span>
                                <span>{content}</span>
                            </div>
                        </Alert>
                    )}

                    {alertSucc && (
                        <Alert color="success" className="w-full shadow-lg pointer-events-auto">
                            <div className="flex items-center gap-2">
                                <HiCheckCircle className="h-5 w-5 text-green-700"/>
                                <span className="font-medium">Success alert!</span>
                                <span>{content}</span>
                            </div>
                        </Alert>
                    )}
                </div>
            </div>

            {/* Flip Card Login / Signup */}
            <div className="mainContainer">
                <div className="flip-card">
                    <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
                        {/* FRONT - Login */}
                        <div className="flip-card-front">
                            <div className="card-content">
                                <h1 className="font-bold">
                                    Blo<span className="text-amber-400">gg</span>hub
                                </h1>
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
                                        setSignupCred({...signupCred, username: e.target.value})
                                    }
                                    placeholder="Username"
                                />

                                <div className="name-container">
                                    <input
                                        className="inputBox"
                                        value={signupCred.name}
                                        onChange={(e) =>
                                            setSignupCred({...signupCred, name: e.target.value})
                                        }
                                        placeholder="First Name"
                                    />
                                    <input
                                        className="inputBox"
                                        value={signupCred.surname}
                                        onChange={(e) =>
                                            setSignupCred({...signupCred, surname: e.target.value})
                                        }
                                        placeholder="Last Name"
                                    />
                                </div>

                                <input
                                    className="inputBox"
                                    type="password"
                                    value={signupCred.password}
                                    onChange={(e) =>
                                        setSignupCred({...signupCred, password: e.target.value})
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
        </div>
    );
}
