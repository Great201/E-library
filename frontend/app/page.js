"use client";
import Navbar from "./components/Navbar";

export default function Home() {
    return (
        <div className="flex flex-col items-center min-h-screen text-gray-800 bg-gray-50">
            {/* Navbar */}
            <Navbar />
            
            {/* Hero Section */}
            <section className="flex flex-col items-center justify-center w-full px-6 pt-16 pb-12 bg-gray-100">
                <h1 className="mb-4 text-5xl font-bold text-purple-700">Welcome To Bells E-library</h1>
                <p className="text-lg text-gray-700 text-center">
                    Track your Reading and Build your Library.<br />
                    Discover your next Favourite Book.<br />
                    Browse from the Largest Collections of Ebooks.<br />
                    Read stories from anywhere at anytime.
                </p>
                <button className="px-6 py-3 mt-6 text-white bg-orange-400 rounded-lg hover:bg-orange-500">
                    Get Started For Free
                </button>
            </section>
        </div>
    );
}
