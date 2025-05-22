import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from "../AuthAPI";
import { createBlog } from "../Service/BlogsService";
import { useNavigate } from "react-router-dom";
import { FiRotateCw } from "react-icons/fi";
import { HiInformationCircle } from "react-icons/hi2";
import { AiOutlineCheckCircle } from "react-icons/ai";

export default function CreateBlog() {
    const { register, handleSubmit, formState: { isDirty,errors }, reset } = useForm();
    const [data, setData] = useState(null);
    const { username } = useAuth();
    const navigate = useNavigate();

    const [alertType, setAlertType] = useState(null); // 'success' | 'error' | 'info'
    const [alertMessage, setAlertMessage] = useState("");

    const triggerAlert = (type, message) => {
        setAlertType(type);
        setAlertMessage(message);
        setTimeout(() => setAlertType(null), 4000);
    };

    const onSubmit = async (formData) => {
        const finalPayload = {
            ...formData,
            username,
        };
        setData(finalPayload);
        try {
            triggerAlert("info", "Publishing blog...");
            await createBlog(finalPayload);
            triggerAlert("success", "Blog published successfully!");
            setTimeout(() => navigate("/home"), 1000);
        } catch (err) {
            console.error("Blog creation failed:", err);
            triggerAlert("error", "Failed to publish the blog.");
        }
    };

    return (
        <div className="relative flex justify-center px-4 py-8">

            {/* 🔔 Alert box */}
            <div className="fixed top-4 right-4 z-50 space-y-4 w-96 pointer-events-none">
                {alertType === 'error' && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center shadow-md pointer-events-auto">
                        <HiInformationCircle className="mr-2 text-xl"/>
                        <span className="font-semibold mr-2">Error:</span>
                        <span>{alertMessage}</span>
                    </div>
                )}
                {alertType === 'success' && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-md pointer-events-auto">
                        <AiOutlineCheckCircle className="mr-2 text-xl"/>
                        <span className="font-semibold mr-2">Success:</span>
                        <span>{alertMessage}</span>
                    </div>
                )}
                {alertType === 'info' && (
                    <div
                        className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded flex items-center shadow-md pointer-events-auto">
                        <HiInformationCircle className="mr-2 text-xl"/>
                        <span className="font-semibold mr-2">Info:</span>
                        <span>{alertMessage}</span>
                    </div>
                )}
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-8 w-full max-w-3xl p-8 rounded-xl shadow-md bg-[#fcfcfa] border border-gray-200"
            >
                <h1 className="text-[#d39e00] font-bold text-3xl mb-2">Share Your Thoughts</h1>

                {/* Blog Title */}
                <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                        <label className="font-semibold text-gray-800">Blog Title</label>
                        <div
                            className="flex items-center gap-1 text-[#d39e00] cursor-pointer hover:text-[#b78600] hover:underline"
                            onClick={() => reset()}
                        >
                            <FiRotateCw/>
                            <span>Reset</span>
                        </div>
                    </div>
                    <input
                        className={`w-full p-3 rounded-lg border bg-white text-gray-800 focus:outline-none focus:ring-2 
                            ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#d39e00]'}`}
                        type="text"
                        {...register("title", {
                            required: "Title is required",
                            validate: (value) =>
                                !value || !value.trim()
                                    ? "Title cannot be empty or contain only spaces"
                                    : true,
                        })}
                        placeholder="Enter the title of your blog"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Blog Content */}
                <div className="w-full">
                    <label className="block font-semibold mb-1 text-gray-800">Content</label>
                    <textarea
                        className={`w-full h-40 p-3 rounded-lg border resize-none bg-white text-gray-800 focus:outline-none focus:ring-2 
                            ${errors.blogText ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-[#d39e00]'}`}
                        {...register("blogText", {
                            required: "Content is required",
                            validate: (value) =>
                                !value || !value.trim()
                                    ? "Content cannot be empty or contain only spaces"
                                    : true,
                        })}
                        placeholder="Write your blog content here..."
                    ></textarea>
                    {errors.blogText && <p className="text-red-500 text-sm mt-1">{errors.blogText.message}</p>}
                </div>

                {/* Submit Button */}
                <input
                    className="bg-[#d39e00] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#b78600] disabled:opacity-50 cursor-pointer transition"
                    type="submit"
                    value="Publish Blog"
                    disabled={!isDirty}
                />
            </form>
        </div>
    );
}
