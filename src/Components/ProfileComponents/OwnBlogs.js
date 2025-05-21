import React, { useEffect, useState } from 'react';
import { getBlogById, deleteBlog } from "../../Service/BlogsService";
import { useAuth } from "../../AuthAPI";
import { SlTrash } from "react-icons/sl";
import CommentSection from "./CommentSection";
import { HiInformationCircle } from "react-icons/hi2";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function OwnBlogs() {
    const [blogs, setBlogs] = useState([]);
    const { username } = useAuth();

    const [alertType, setAlertType] = useState(null); // 'success' | 'error' | 'info'
    const [alertMessage, setAlertMessage] = useState("");

    const triggerAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setTimeout(() => {
            setAlertType(null);
        }, 4000);
    };

    useEffect(() => {
        if (username) {
            fetchData();
        }
    }, [username]);

    const fetchData = async () => {
        try {
            triggerAlert("info", "Fetching your blogs...");
            const data = await getBlogById(username);
            setBlogs(data.blogs);
            triggerAlert("success", "Blogs loaded successfully.");
        } catch (error) {
            console.error("Error fetching blogs:", error);
            triggerAlert("error", "Failed to load your blogs.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            triggerAlert("success", "Blog deleted successfully.");
            fetchData(); // Refresh blog list
        } catch (error) {
            console.error("Error deleting blog:", error);
            triggerAlert("error", "Failed to delete the blog.");
        }
    };

    return (
        <div className="relative w-full font-sans space-y-6 p-4">

            {/* 🔔 Alert box */}
            <div className="fixed top-4 right-4 z-50 space-y-4 w-96 pointer-events-none">
                {alertType === 'error' && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center shadow-md pointer-events-auto">
                        <HiInformationCircle className="mr-2 text-xl" />
                        <span className="font-semibold mr-2">Error:</span>
                        <span>{alertMessage}</span>
                    </div>
                )}
                {alertType === 'success' && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-md pointer-events-auto">
                        <AiOutlineCheckCircle className="mr-2 text-xl" />
                        <span className="font-semibold mr-2">Success:</span>
                        <span>{alertMessage}</span>
                    </div>
                )}
                {alertType === 'info' && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded flex items-center shadow-md pointer-events-auto">
                        <HiInformationCircle className="mr-2 text-xl" />
                        <span className="font-semibold mr-2">Info:</span>
                        <span>{alertMessage}</span>
                    </div>
                )}
            </div>

            {Array.isArray(blogs) && blogs.length === 0 ? (
                <div className="text-center">
                    <img src="/assets/notFound.jpg" alt="No Blogs" className="mx-auto w-2/4" />
                    <p className="text-gray-500 text-2xl">No blogs found or loading...</p>
                </div>
            ) : (
                blogs.map((blog) => (
                    <div
                        key={blog._id}
                        className="border-2 border-dashed border-gray-400 rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-black text-xl font-semibold">{blog.title}</h2>
                            <SlTrash
                                className="w-8 cursor-pointer text-red-600 hover:text-red-800"
                                onClick={() => handleDelete(blog._id)}
                            />
                        </div>
                        <p className="text-gray-800 pt-2 leading-relaxed whitespace-pre-line">{blog.blogText}</p>
                        <h2 className="text-xl text-gray-800 flex justify-end mt-4">
                            ~{blog.author.name} {blog.author.surname}
                        </h2>
                        <CommentSection blogId={blog._id} showAlert={triggerAlert}></CommentSection>
                    </div>
                ))
            )}
        </div>
    );
}
