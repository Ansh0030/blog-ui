import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthAPI';
import { SlTrash } from 'react-icons/sl';

export default function CommentSection({ blogId , toDelete = false }) {
    const { register, handleSubmit, reset, formState: { isDirty } } = useForm();
    const [comments, setComments] = useState([]);
    const { userId, username } = useAuth(); // username == userId

    const URL = "https://blog-backend-45sp.onrender.com/comment"
    const URL_API = "http://localhost:5000/comment"
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
            }
        };
        fetchComments();
    }, [blogId]);

    // Delete handler
    const handleDelete = async (commentId) => {
        try {
            const response = await fetch(`${URL}/${commentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setComments((prev) => prev.filter((comment) => comment._id !== commentId));
            } else {
                console.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Error deleting comment:', error);
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
                    reset();
                }
            } else {
                console.error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow mt-4 max-w-full`">
            <h2 className="text-lg font-semibold mb-2">Comment Section</h2>

            {!!toDelete && (
                <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4 h-10">
                    <input
                        {...register('text', {required: true})}
                        placeholder="Write your comment..."
                        className="flex-1 border-b-gray-500 rounded focus-visible:border-b-gray-500"
                    />
                    <button
                        type="submit"
                        disabled={!isDirty}
                        className="text-white w-1/5 h-10 rounded bg-[#d39e00] flex items-center justify-center"
                    >
                        Post
                    </button>

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
    );
}
