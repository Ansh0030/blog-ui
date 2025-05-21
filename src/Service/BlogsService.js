import axios from "axios";

const URL_URL = "https://blog-backend-45sp.onrender.com/blogs";
const URL = "http://localhost:5000/blogs";

export const getAllBlogs = async () => {
    try {
        const response = await axios.get(URL);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch blogs:", error);
        throw error;
    }
};

export const createBlog = async (data) => {
    await axios.post(URL, data);
}

export const deleteBlog = async (id) => {
    await axios.delete(`${URL}/${id}`);
};


export const getBlogById = async (username) => {
    try {
        const response = await axios.post(`${URL}/author`, { username });
        return response.data;
    } catch (error) {
        console.error("Error in getBlogById:", error);
        throw error;
    }
};
