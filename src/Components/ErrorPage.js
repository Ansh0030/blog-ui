import React from 'react'
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
    const navigate = useNavigate();

    const handleNav = () => {
        navigate("/profile");
    }

    return (
        <main className="grid min-h-full place-items-center font-sans bg-white px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-8xl font-bold  text-amber-600">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Page
                    not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find
                    the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="#" onClick={handleNav}
                       className="rounded-md bg-amber-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs
                       hover:bg-amber-900">Go
                        back home</a>
                    <a href="#" className="border-4 border-amber-500 rounded px-2 py-1 font-semibold text-gray-900">Contact support <span
                        aria-hidden="true">&rarr;</span></a>
                </div>
            </div>
        </main>
    )

}
