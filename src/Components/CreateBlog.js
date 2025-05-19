import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from "../AuthAPI";
import { createBlog } from "../Service/BlogsService";
import {useNavigate} from "react-router-dom";
import { FiRotateCw } from "react-icons/fi";

export default function CreateBlog() {
    const { register, handleSubmit, formState: { isDirty }, reset } = useForm();
    const [data, setData] = useState(null);
    const { username } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (formData) => {
        const finalPayload = {
            ...formData,
            username,
        };
        setData(finalPayload);
        createBlog(finalPayload);
        navigate("/home");
        console.log(finalPayload);
    };

    return (
        <div className="flex justify-center px-4 py-8">
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
                        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#d39e00] bg-white text-gray-800"
                        type="text"
                        {...register("title", {required: true})}
                        placeholder="Enter the title of your blog"
                    />
                </div>

                {/* Blog Content */}
                <div className="w-full">
                    <label className="block font-semibold mb-1 text-gray-800">Content</label>
                    <textarea
                        className="w-full h-40 p-3 rounded-lg border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-[#d39e00] bg-white text-gray-800"
                        {...register("blogText", {required: true})}
                        placeholder="Write your blog content here..."
                    ></textarea>
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
