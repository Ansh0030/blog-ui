import axios from "axios";

const URL = "http://localhost:5000";

export const uploadImage = async (file, username) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username); // now part of the body

    const response = await axios.post(`${URL}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data;
};

export const getImage = async (username) => {
    const response = await axios.get(`${URL}/getImage`, {
        params: { username } // still as query param
    });

    return response.data;
};