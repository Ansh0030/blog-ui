import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../AuthAPI";
import { getImage } from "../../Service/imageService";
import { uploadImage } from "../../Service/imageService"; // <-- Import your upload function
import { useNavigate } from "react-router-dom";
import {CiLogout} from "react-icons/ci";
import {logout} from "../service";

const Profile = () => {
    const [profile, setProfile] = useState({
        imagePath: "",
        fullName: "",
        aboutUs: "",
    });

    const fileInputRef = useRef(null);
    const { username } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getImage(username);
                setProfile({
                    imagePath: data.getImage?.path || "",
                    fullName: `${data.user?.name || ""} ${data.user?.surname || ""}`,
                    aboutUs: "This is a web based application made with MERN Stack, Tailwind CSS, Cloudinary Cloud Serivce.",
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        // await logout();
        navigate("/");
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const data = await uploadImage(file, username);
            setProfile((prev) => ({
                ...prev,
                imagePath: data.fileUrl,
            }));
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };

    const profileImageAlt = "./assets/profilePhoto.jpg";

    return (
        <div className="flex items-center justify-center  min-h-screen px-4">
            <div
                className="bg-[#fcfcfa] w-full max-w-5xl h-[90vh] rounded-xl shadow-md p-8 flex flex-col items-center justify-center border border-gray-200">

                {/* Profile Image with Hover Upload Icon */}
                <div className="relative group w-60 h-60 mb-6">
                    <img
                        src={profile.imagePath || profileImageAlt}
                        alt="Profile"
                        className="w-60 h-60 rounded-full object-cover border border-gray-300"
                    />
                    <div
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
                        onClick={handleImageClick}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4-4m0 0l-4 4m4-4v12"/>
                        </svg>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </div>

                {/* Full Name */}
                <h1 className="text-4xl text-[#d39e00] font-bold mb-2">{profile.fullName}</h1>

                {/* About Us */}
                <div className="mt-4 mb-8 px-4 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">About Us</h2>
                    <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
                        {profile.aboutUs}
                    </p>
                </div>

                {/* Logout Button */}
                <p
                    onClick={handleLogout}
                    className="text-white w-1/3 text-center py-3 px-6 rounded-xl font-semibold bg-[#d39e00] hover:bg-[#b78600] cursor-pointer"
                >
                    Logout <CiLogout className="inline ml-2 text-2xl"/>
                </p>
            </div>
        </div>

    );
};

export default Profile;
