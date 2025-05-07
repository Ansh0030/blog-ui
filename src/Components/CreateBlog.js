import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {useAuth} from "../AuthAPI";
import {createBlog} from "../Service/BlogsService";

export default function CreateBlog() {
    const { register, handleSubmit, formState: { isDirty } } = useForm();
    const [data, setData] = useState(null);
    const { username } = useAuth();

    const onSubmit = (formData) => {
        const finalPayload = {
            ...formData,
            username,
        };
        setData(finalPayload);
        createBlog(finalPayload);
        console.log(finalPayload);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("title", { required: true })} placeholder="Title" />
            <textarea {...register("blogText", { required: true })} placeholder="Write your blog..."></textarea>
            <input type="submit" value="Submit" disabled={!isDirty} />
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </form>
    );
}
