import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthAPI';
import { SlTrash } from 'react-icons/sl';
import { HiInformationCircle } from 'react-icons/hi2';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function CommentSection({ blogId, toDelete = false }) {
    const { register, handleSubmit, reset, formState: { isDirty,errors} } = useForm();
    const [comments, setComments] = useState([]);
    const { userId, username } = useAuth();

    // Alert states
    const [alertError, setAlertError] = useState(false);
    const [alertSucc, setAlertSucc] = useState(false);
    const [content, setContent] = useState("");

    const URL = "https://blog-backend-45sp.onrender.com/comment";
    const URL_API = "http://localhost:5000/comment";

    // Fetch comments
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`${URL}/${blogId}`);
                const data = await response.json();
                if (Array.isArray(data.comments)) {
                    setComments(data.comments);
                } else {
                    console.warn('Unexpected comment data format', data);
                }
            } catch (error) {
                console.error('Failed to load comments:', error);
                triggerAlert("error", "Failed to load comments");
            }
        };
        fetchComments();
    }, []);

    // Trigger alert helper
    const triggerAlert = (type, message) => {
        setContent(message);
        if (type === "success") {
            setAlertSucc(true);
            setTimeout(() => setAlertSucc(false), 5000);
        } else if (type === "error") {
            setAlertError(true);
            setTimeout(() => setAlertError(false), 5000);
        }
    };

    // Delete handler
    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`${URL}/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentId));
                triggerAlert("success", "Comment deleted successfully");
            } else {
                triggerAlert("error", "Failed to delete comment");
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
            triggerAlert("error", "Error deleting comment");
        }
    };

    // Submit handler
    const onSubmit = async (data) => {
        try {
            const response = await fetch(`${URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: data.text,
                    username: userId,
                    blogId,
                }),
            });

            if (response.ok) {
                const result = await response.json();
                const newComment = result?.comment;
                if (newComment) {
                    setComments((prev) => [...prev, newComment]);
                }
                reset();
                triggerAlert("success", "Comment posted successfully");
            } else {
                triggerAlert("error", "Failed to post comment");
            }
        } catch (error) {
            console.error('Error posting comment:', error);
            triggerAlert("error", "Error posting comment");
        }
    };

    return (
        <div className="relative">
            {/* 🔔 Alert Box Top-Right */}
            <div className="fixed top-4 right-4 z-50 space-y-4 w-96 pointer-events-none">
                {alertError && (
                    <div
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-center shadow-lg pointer-events-auto">
                        <HiInformationCircle className="mr-2 text-xl"/>
                        <span className="font-medium mr-2">Error:</span>
                        <span>{content}</span>
                    </div>
                )}
                {alertSucc && (
                    <div
                        className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg pointer-events-auto">
                        <AiOutlineCheckCircle className="mr-2 text-xl"/>
                        <span className="font-medium mr-2">Success:</span>
                        <span>{content}</span>
                    </div>
                )}
            </div>

            <div className="p-4 border rounded bg-white shadow mt-4 max-w-full">
                <h2 className="text-lg font-semibold mb-2">Comment Section</h2>

                {!!toDelete && (
                    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
                        <div className="flex gap-2 items-start">
                            <input
                                {...register("text", {
                                    required: "Comment is required",
                                    validate: (value) =>
                                        !value || !value.trim()
                                            ? "Comment cannot be empty or only spaces"
                                            : true,
                                })}
                                placeholder="Write your comment..."
                                className={`flex-1 h-10 px-3 border rounded focus:outline-none focus:ring-2 ${
                                    errors.text
                                        ? "border-red-500 focus:ring-red-500"
                                        : "border-gray-300 focus:ring-[#d39e00]"
                                }`}
                            />
                            <button
                                type="submit"
                                disabled={!isDirty}
                                className="text-white w-1/5 px-4 h-10 rounded flex items-center justify-center disabled:opacity-50"
                            >
                                Post
                            </button>
                        </div>
                        {errors.text && (
                            <span className="text-red-500 text-sm mt-1 block">{errors.text.message}</span>
                        )}
                    </form>

                )}

                <div className="space-y-4">
                    {comments.length > 0 ? (
                        comments.map((comment) => {
                            const isAuthor = comment?.author?.username === username;

                            return (
                                <div key={comment._id} className="border-b pb-4 flex items-start gap-3">
                                    {/* Avatar */}
                                    <img
                                        src={comment?.author?.imageUrl || "/assets/profilePhoto.jpg"}
                                        alt="User Avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                      <span className="text-lg font-semibold text-gray-900">
                        {comment.author?.name} {comment.author?.surname}
                      </span>
                                            {isAuthor && (
                                                <SlTrash
                                                    onClick={() => handleDelete(comment._id)}
                                                    className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-800"
                                                />
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-md px-2">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
