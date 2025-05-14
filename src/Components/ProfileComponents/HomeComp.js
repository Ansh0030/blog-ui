import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../Service/BlogsService';
import CommentSection from "./CommentSection";

export default function HomeComp() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBlogs();

                // Simulate delay (2 seconds)
                setTimeout(() => {
                    setBlogs(data.blogs);
                    setLoading(false);
                }, 100);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-6 ">
            <div className="w-full space-y-2">
                {loading
                    ? Array.from({ length: 3 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="border-2 border-dashed rounded-lg p-6 space-y-10 animate-pulse bg-white"
                        >
                            <div className="h-6 bg-gray-300 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-11/12"></div>
                            <div className="h-4 bg-gray-200 rounded w-10/12"></div>
                            <div className="h-4 bg-gray-200 rounded w-9/12 ml-auto"></div>
                        </div>
                    ))
                    : blogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-white shadow-md"
                        >
                            <h2 className="text-black text-2xl font-semibold">{blog.title}</h2>
                            <p className="text-gray-800 pt-4 leading-relaxed whitespace-pre-line">{blog.blogText}</p>
                            <h2 className="text-xl text-gray-600 flex justify-end mt-6">
                                ~{blog.author.name} {blog.author.surname}
                            </h2>
                            <CommentSection blogId={blog._id} toDelete={false}></CommentSection>
                        </div>
                    ))}
            </div>
        </div>
    );
}
