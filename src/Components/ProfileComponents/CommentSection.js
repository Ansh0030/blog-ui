import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../AuthAPI';

export default function CommentSection({ blogId }) {
    const { register, handleSubmit, reset, formState:{isDirty} } = useForm();
    const [comments, setComments] = useState([]);
    const { userId } = useAuth(); // username == userId

    // Fetch comments on component mount
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/comment/${blogId}`);
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

    // Handle form submission
    const onSubmit = async (data) => {
        try {
            const response = await fetch('http://localhost:5000/comment', {
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
                    setComments((prev) => [...(Array.isArray(prev) ? prev : []), newComment]);
                    reset(); // clear form
                }
            } else {
                console.error('Failed to post comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="p-4 border rounded bg-white shadow mt-4">
            <h2 className="text-lg font-semibold mb-2">Comment Section</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4 h-10">
                <input
                    {...register('text', {required: true})}
                    placeholder="Write your comment..."
                    className="flex-1 border-b-gray-500 rounded"
                />
                <button type="submit" className=" text-white -mt-0.5 py-5 w-1/5 h-10 rounded">
                    Post
                </button>
            </form>

            <div className="space-y-4">
                {Array.isArray(comments) && comments.length > 0 ? (
                    comments.map((comment) => (
                        <div key={comment._id} className="border-b pb-4 flex items-start gap-3">
                            {/* Avatar */}
                            <img
                                src="./assets/profilePhoto.jpg" // replace with actual default path
                                alt="User Avatar"
                                className="w-10 h-10 rounded-full object-cover"
                            />

                            {/* Comment content */}
                            <div className="flex flex-col">
                                {/* Author Name */}
                                <span className="text-base font-semibold text-gray-900">
                                    {comment.author?.name} {comment.author?.surname}
                                </span>

                                {/* Comment Text */}
                                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-md px-2">No comments yet.</p>
                )}
            </div>

        </div>
    );
}
