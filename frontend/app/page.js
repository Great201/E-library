"use client"
import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-100">
            <h1 className="mb-4 text-4xl font-bold">Welcome to E-Library</h1>
            <p className="mb-8 text-lg text-center">
                Discover a world of books at your fingertips. Sign up or log in to explore our collection and manage your reading list.
            </p>
            <div className="flex space-x-4">
                <Link href="/signup">
                    <button className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Sign Up</button>
                </Link>
                <Link href="/login">
                    <button className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Log In</button>
                </Link>
            </div>
            <h2 className="mt-8 text-2xl font-semibold">Featured Books</h2>
            <ul className="w-full max-w-md mt-4">
                {books.map(book => (
                    <li key={book.id} className="py-2 border-b">
                        <h3 className="font-bold">{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}