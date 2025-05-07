import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState(null);

    const loginUser = (id, username) => {
        setUserId(id);
        setUsername(username);
    };

    return (
        <AuthContext.Provider value={{ userId, username, loginUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
