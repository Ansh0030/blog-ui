import axios from "axios";

const API_URL = "http://192.168.14.129:5000";

// Login function
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials, {
      withCredentials: true,
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

export const checkAndLoginWithToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      {},
      { withCredentials: true }
    );
    return response.data; // Should include token, message, redirect, etc.
  } catch (error) {
    console.error("Auto-login failed:", error.response?.data || error.message);
    return null;
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
