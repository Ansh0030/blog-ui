import axios from "axios";

const API_URL = "http://localhost:5000";

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data; // The response from the server is usually in the `data` field
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Throw error to be handled by the caller
  }
};

// Logout function
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;
  } catch (error) {
    console.error("Error during logout:", error);
    throw error;
  }
};

// Check login status
export const checkLogin = async () => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
  } catch (error) {
    console.error("Error checking login status:", error);
    throw error;
  }
};

export const register = async (signupCred) => {
  try {
    const response = await axios.post(`${API_URL}/register`, signupCred, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error while Register", err);
  }
};
