import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../Service/BlogsService';

export default function HomeComp() {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllBlogs();
                setBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="w-full font-sans space-y-6 p-4">
            {blogs.map((blog) => (
                <div
                    key={blog._id}
                    className="border-2 border-dashed border-gray-400 rounded-lg p-4 shadow-sm"
                >
                    <h2 className="text-black text-xl font-semibold">{blog.title}</h2>
                    <p className="text-gray-800 pt-2 leading-relaxed whitespace-pre-line">{blog.blogText}</p>
                    <h2 className="text-xl text-gray-800 flex justify-end mt-4">
                        ~~ {blog.author.name} {blog.author.surname}
                    </h2>
                </div>
            ))}
        </div>
    );
}
