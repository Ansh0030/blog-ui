import React from 'react';

const Profile = () => {
    const profileImage = 'https://via.placeholder.com/200'; // Replace with actual image URL
    const fullName = 'John Doe';
    const aboutUs = 'We are a team of passionate developers building scalable and user-friendly apps.';

    const handleLogout = () => {
        console.log('Logging out...');
        // Your logout logic here
    };

    return (
        <div className="flex items-center justify-center">
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="w-40 h-40 rounded-full object-cover mb-6"
                />
                <h1 className="text-4xl font-bold mb-2">{fullName}</h1>

                <div className="mt-4 mb-8 px-4 text-center">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-2">About Us</h2>
                    <p className="text-gray-600 text-lg">
                        {aboutUs}
                    </p>
                </div>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-xl text-lg"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Profile;
