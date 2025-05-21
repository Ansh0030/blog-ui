import React, { useEffect, useState } from 'react';
import { getAllBlogs } from '../../Service/BlogsService';
import CommentSection from "./CommentSection";
import { HiInformationCircle } from 'react-icons/hi2';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function HomeComp() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

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
        const fetchData = async () => {
            try {
                triggerAlert('info', 'Loading blogs...');
                const data = await getAllBlogs();
                setTimeout(() => {
                    setBlogs(data.blogs.reverse());
                    setLoading(false);
                    triggerAlert('success', 'Blogs loaded successfully');
                }, 100);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setLoading(false);
                triggerAlert('error', 'Failed to fetch blogs');
            }
        };

        fetchData();
    }, []);

    return (
        <div className="relative w-full min-h-screen flex flex-col items-center justify-center p-6 bg-[#f5f5f0]">
            {/* 🔔 Alert Box in top-right */}
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
                            className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-[#f5f5f0] shadow-md"
                        >
                            <h2 className="text-black text-2xl font-semibold">{blog.title}</h2>
                            <p className="text-gray-800 pt-4 leading-relaxed whitespace-pre-line">{blog.blogText}</p>
                            <h2 className="text-xl text-gray-600 flex justify-end mt-6">
                                ~{blog.author.name} {blog.author.surname}
                            </h2>
                            <div className="max-w-full">
                                <CommentSection
                                    blogId={blog._id}
                                    toDelete={true}
                                    showAlert={triggerAlert}
                                />
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
