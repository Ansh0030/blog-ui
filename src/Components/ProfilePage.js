// ProfielPage.js
import React from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import "./comp.css";
import HomeComp from "./ProfileComponents/HomeComp";
import OwnBlogs from "./ProfileComponents/OwnBlogs";
import Profile from "./ProfileComponents/Profile";
import { FiAlignJustify } from "react-icons/fi";
export default function ProfielPage() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Navbar */}
            <div className="h-12 w-full md:w-3/4 font-sans text-xl mt-2 flex items-center justify-between">
                <div className="pl-2 text-amber-500 font-bold">bloGGGhub</div>
                <div className="md:flex hidden">
                    <div
                        className={`pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl ${
                            isActive("/home") ? "bg-amber-200 rounded-2xl" : ""
                        }`}
                        onClick={() => handleNavigate("/home")}
                    >
                        Home
                    </div>
                    <div
                        className={`pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl ${
                            isActive("/own-blogs") ? "bg-amber-200 rounded-2xl" : ""
                        }`}
                        onClick={() => handleNavigate("/own-blogs")}
                    >
                        Own Blogs
                    </div>
                    <div
                        className={`pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl ${
                            isActive("/profile") ? "bg-amber-200 rounded-2xl" : ""
                        }`}
                        onClick={() => handleNavigate("/profile")}
                    >
                        Profile
                    </div>
                    <div
                        className="pr-2 text-black font-bold hover:cursor-pointer hover:underline hover:bg-red-300 hover:rounded-2xl"
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                </div>
                <div className="md:hidden">
                    <FiAlignJustify />
                </div>
            </div>

            {/* Page Content */}
            <div className="w-full h-auto md:w-3/4 mt-6 ml-3 border-2 border-dashed border-black">
                <Routes>
                    <Route path="/home" element={<HomeComp />} />
                    <Route path="/own-blogs" element={<OwnBlogs />} />
                    <Route path="/profile" element={<Profile />} />
                    {/* Default route */}
                    <Route path="*" element={<HomeComp />} />
                </Routes>
            </div>
        </div>
    );
}
