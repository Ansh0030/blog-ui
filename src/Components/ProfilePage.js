import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./comp.css";

export default function ProfielPage() {
    const navigate = useNavigate();
    const [page, setPage] = useState({
        home: true,
        ownBlog: false,
        profile: false,
    });

    useEffect(() => {
        console.log("Updated page state:", page);
    }, [page]);

    const handleHome = () => {
        setPage({
            home: true,
            ownBlog: false,
            profile: false,
        });
    };

    const handleOBlog = () => {
        setPage({
            home: false,
            ownBlog: true,
            profile: false,
        });
    };

    const handleProfile = () => {
        setPage({
            home: false,
            ownBlog: false,
            profile: true,
        });
    };

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <div className="flex flex-col items-center min-h-screen">
            {/* Navbar */}
            <div className="h-12 w-3/4 font-sans text-xl mt-2 flex items-center justify-between">
                <div className="pl-2 text-amber-500 font-bold">BLOGGERhub</div>
                <div className="flex">
                    <div
                        className="pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl"
                        onClick={handleHome}
                    >
                        Home
                    </div>
                    <div
                        className="pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl"
                        onClick={handleOBlog}
                    >
                        Own Blogs
                    </div>
                    <div
                        className="pr-4 text-black font-bold hover:cursor-pointer hover:bg-amber-200 hover:rounded-2xl"
                        onClick={handleProfile}
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
            </div>

            {/* Page Content */}
            <div className="w-3/4 mt-6">
                {page.home && (
                    <div className="text-lg font-medium text-blue-700">🏠 Welcome to the Home Page!</div>
                )}
                {page.ownBlog && (
                    <div className="text-lg font-medium text-green-700">📝 These are your blogs.</div>
                )}
                {page.profile && (
                    <div className="text-lg font-medium text-purple-700">👤 This is your profile.</div>
                )}
            </div>
        </div>
    );
}
