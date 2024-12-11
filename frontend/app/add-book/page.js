"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

export default function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [category, setCategory] = useState('');
    const router = useRouter();

    const handleAddBook = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        try {
            await axios.post('http://127.0.0.1:5000/books', { title, author, genre, category }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setAuthor('');
            setGenre('');
            setCategory('');
            router.push('/books'); // Redirect to books page after adding
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <>
        <Navbar/>
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="mb-4 text-4xl font-bold">Add New Book</h1>
            <form onSubmit={handleAddBook} className="flex flex-col space-y-4 mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    required
                    className="px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    required
                    className="px-4 py-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="px-4 py-2 border rounded"
                />
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add Book</button>
            </form>
        </div>
        </>
    );
} 