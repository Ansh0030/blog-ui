import axios from "axios";

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