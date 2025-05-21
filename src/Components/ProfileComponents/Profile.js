import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from "../../AuthAPI";
import { getImage, uploadImage } from "../../Service/imageService";
import { useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { HiInformationCircle } from "react-icons/hi";
import { AiOutlineCheckCircle } from "react-icons/ai"; // success icon
import { logout } from "../service";

const Profile = () => {
    const [profile, setProfile] = useState({
        imagePath: "",
        fullName: "",
        aboutUs: "",
    });

    const fileInputRef = useRef(null);
    const { username } = useAuth();
    const navigate = useNavigate();

    const [alertError, setAlertError] = useState(false);
    const [alertSucc, setAlertSucc] = useState(false);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false); // 🔄 Loader state

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            try {
                const data = await getImage(username);
                setProfile({
                    imagePath: data.getImage?.path || "",
                    fullName: `${data.user?.name || ""} ${data.user?.surname || ""}`,
                    aboutUs: "This is a web based application made with MERN Stack, Tailwind CSS, Cloudinary Cloud Serivce.",
                });
            } catch (error) {
                console.error("Error fetching profile data:", error);
                setAlertError(true);
                setContent("Failed to load profile data.");
                setTimeout(() => setAlertError(false), 5000);
            } finally {
                setLoading(false);
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

        setLoading(true);
        try {
            const data = await uploadImage(file, username);
            setProfile((prev) => ({
                ...prev,
                imagePath: data.fileUrl,
            }));
            setAlertSucc(true);
            setContent("Profile photo updated successfully!");
            setTimeout(() => setAlertSucc(false), 5000);
        } catch (error) {
            console.error("Upload failed:", error);
            setAlertError(true);
            setContent("Failed to upload image.");
            setTimeout(() => setAlertError(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    const profileImageAlt = "./assets/profilePhoto.jpg";

    return (
        <div className="flex items-center justify-center max-h-screen px-4 relative">

            {/* 🔔 Alerts in Top Right */}
            <div className="fixed top-4 right-4 z-50 space-y-4 w-fit pointer-events-none">
                {loading && (
                    <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded flex items-center shadow-lg pointer-events-auto animate-pulse">
                        <svg className="animate-spin h-5 w-5 mr-3 text-blue-500" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        <span>Loading...</span>
                    </div>
                )}
                {alertError && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center shadow-lg pointer-events-auto">
                        <HiInformationCircle className="mr-2 text-xl" />
                        <span className="font-medium mr-2">Error:</span>
                        <span>{content}</span>
                    </div>
                )}
                {alertSucc && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg pointer-events-auto">
                        <AiOutlineCheckCircle className="mr-2 text-xl" />
                        <span className="font-medium mr-2">Success:</span>
                        <span>{content}</span>
                    </div>
                )}
            </div>

            {/* 🧾 Profile Card */}
            <div className="bg-[#fcfcfa] w-full max-w-5xl h-[90vh] rounded-xl shadow-md p-8 flex flex-col items-center justify-center border border-gray-200">

                {/* 👤 Profile Image with Hover Upload */}
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

                {/* 📛 Full Name */}
                <h1 className="text-4xl text-[#d39e00] font-bold mb-2">{profile.fullName}</h1>

                {/* 📖 About Us */}
                <div className="mt-4 mb-8 px-4 text-center">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">About Us</h2>
                    <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
                        {profile.aboutUs}
                    </p>
                </div>

                {/* 🚪 Logout Button */}
                <p
                    onClick={handleLogout}
                    className="text-white w-1/3 text-center py-3 px-6 rounded-xl font-semibold bg-[#d39e00] hover:bg-[#b78600] cursor-pointer"
                >
                    Logout <CiLogout className="inline ml-2 text-2xl" />
                </p>
            </div>
        </div>
    );
};

export default Profile;
