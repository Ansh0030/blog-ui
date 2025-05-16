import React, { useEffect, useState } from 'react';
import { getBlogById, deleteBlog } from "../../Service/BlogsService";
import { useAuth } from "../../AuthAPI";
import { SlTrash } from "react-icons/sl";
import CommentSection from "./CommentSection";

export default function OwnBlogs() {
    const [blogs, setBlogs] = useState([]);
    const { username } = useAuth();

    useEffect(() => {
        if (username) {
            fetchData();
        }
    }, [username]);

    const fetchData = async () => {
        try {
            const data = await getBlogById(username);
            setBlogs(data.blogs);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteBlog(id);
            fetchData(); // Refresh blog list
        } catch (error) {
            console.error("Error deleting blog:", error);
        }
    };

    return (
        <div className="w-full font-sans space-y-6 p-4">
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
                        <CommentSection blogId={blog._id}></CommentSection>
                    </div>
                ))
            )}
        </div>
    );
}
