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
        <div className="flex justify-center  ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center gap-8 w-full md:w-full  p-8 rounded-xl shadow-lg bg-white"
            >
                <h1 className="text-amber-500 font-extrabold text-3xl mb-2">Share Your Thoughts</h1>

                <div className="w-full">
                    <div className="flex justify-between items-center mb-1">
                        <label className="font-semibold text-gray-700">Blog Title</label>
                        <div
                            className="flex items-center gap-1 text-amber-500 cursor-pointer hover:text-amber-400 hover:underline"
                            onClick={() => {reset()}}
                        >
                            <FiRotateCw/>
                            <span>Reset</span>
                        </div>
                    </div>
                    <input
                        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-400"
                        type="text"
                        {...register("title", {required: true})}
                        placeholder="Enter the title of your blog"
                    />
                </div>

                <div className="w-full">
                    <label className="block font-semibold mb-1 text-gray-700">Content</label>
                    <textarea
                        className="w-full h-40 p-3 rounded-xl border border-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                        {...register("blogText", {required: true})}
                        placeholder="Write your blog content here..."
                    ></textarea>
                </div>

                <input
                    className="bg-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-amber-600 disabled:opacity-50 cursor-pointer transition"
                    type="submit"
                    value="Publish Blog"
                    disabled={!isDirty}
                />
            </form>
        </div>

    );
}
