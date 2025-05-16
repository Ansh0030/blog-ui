import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, useLocation } from "react-router-dom";
import "./comp.css";
import HomeComp from "./ProfileComponents/HomeComp";
import OwnBlogs from "./ProfileComponents/OwnBlogs";
import Profile from "./ProfileComponents/Profile";
import { FiAlignJustify } from "react-icons/fi";
import { CiEdit, CiLogout } from "react-icons/ci";
import ErrorPage from "./ErrorPage";
import CreateBlog from "./CreateBlog";
import {logout} from "./service";

export default function ProfilePage() {
    const navigate = useNavigate();
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => location.pathname === path;

    useEffect(() => {
        navigate("/home");
    }, []);

    const handleNavigate = (path) => {
        navigate(path);
        setIsMenuOpen(false); // close menu after click
    };

    const handleLogout = async () => {
        navigate("/");
        // await logout();
        setIsMenuOpen(false); // close menu after logout
    };

    const isCreateBlogPage = location.pathname === "/createBlog";

    return (
        <div className="flex flex-col items-center min-h-screen relative">
            {/* Navbar */}
            <div className="h-12 w-full md:w-3/4 font-sans text-xl mt-2 flex items-center justify-between">
                <div className="pl-2 text-gray-600 text-2xl md:text-4xl font-bold hover:cursor-pointer border-b-4 border-b-gray-600" onClick={() => navigate("/home")}>BLO<span className="text-amber-400">GG</span>HUB</div>

                {/* Desktop Menu */}
                <div className="md:flex hidden">
                    <div
                        className={`pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl px-2 ${
                            isActive("/home") ? "bg-amber-200 rounded-2xl px-2" : "" }`} onClick={() => handleNavigate("/home")}>
                        Home
                    </div>
                    <div
                        className={`pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl px-2 ${
                            isActive("/own-blogs") ? "bg-amber-200 rounded-2xl px-2" : ""
                        }`}
                        onClick={() => handleNavigate("/own-blogs")}
                    >
                        Own Blogs
                    </div>
                    <div
                        className={`pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl px-2 ${
                            isActive("/profile") ? "bg-amber-200 rounded-2xl px-2" : ""
                        }`}
                        onClick={() => handleNavigate("/profile")}
                    >
                        Profile
                    </div>
                    <div
                        className="pr-2 text-black font-bold hover:cursor-pointer hover:underline hover:bg-red-300 hover:rounded-2xl px-2"
                        onClick={handleLogout}
                    >
                        Logout <CiLogout className="inline ml-2 text-2xl " />
                    </div>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
                    <FiAlignJustify size={24} />
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md p-4 md:hidden z-50">
                    <ul className="space-y-2 ">
                        <li
                            className={`py-2 font-bold hover:bg-amber-200 rounded-xl ${
                                isActive("/home") ? "bg-amber-200" : ""
                            }`}
                            onClick={() => handleNavigate("/home")}
                        >
                            Home
                        </li>
                        <li
                            className={`py-2 font-bold hover:bg-amber-200 rounded-xl ${
                                isActive("/own-blogs") ? "bg-amber-200" : ""
                            }`}
                            onClick={() => handleNavigate("/own-blogs")}
                        >
                            Own Blogs
                        </li>
                        <li
                            className={`py-2 font-bold hover:bg-amber-200 rounded-xl ${
                                isActive("/profile") ? "bg-amber-200" : ""
                            }`}
                            onClick={() => handleNavigate("/profile")}
                        >
                            Profile
                        </li>
                        <li
                            className="py-2 font-bold hover:bg-red-300 rounded-xl"
                            onClick={handleLogout}
                        >
                            Logout <CiLogout className="inline ml-2 text-xl" />
                        </li>
                    </ul>
                </div>
            )}

            {/* Page Content */}
            <div className="w-full h-auto md:w-3/4 mt-6 ml-3">
                <Routes>
                    <Route path="/home" element={<HomeComp />} />
                    <Route path="/own-blogs" element={<OwnBlogs />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/createBlog" element={<CreateBlog />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
            </div>

            {/* Create Blog Button */}
            {!isCreateBlogPage && (
                <div
                    className="fixed bottom-6 right-10 flex items-center space-x-2 bg-amber-400 hover:bg-amber-600 text-black px-4 py-2 rounded-full shadow-lg cursor-pointer z-50"
                    onClick={() => navigate("/createBlog")}
                >
                    <CiEdit className="text-3xl" />
                    <span className="hidden md:flex md:text-xl md:font-light">Create Blog</span>
                </div>
            )}
        </div>
    );
}
