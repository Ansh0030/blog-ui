// src/AuthContext.js
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState("");

    const loginUser = (uname) => setUsername(uname);
    const logoutUser = () => setUsername("");

    return (
        <AuthContext.Provider value={{ username, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
