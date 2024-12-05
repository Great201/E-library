"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
        } else {
            const fetchBooks = async () => {
                try {
                    const response = await axios.get('http://127.0.0.1:5000/books', {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setBooks(response.data);
                } catch (error) {
                    console.error("Error fetching books:", error);
                }
            };

            fetchBooks();
        }
    }, [router]);

    const handleAddBook = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        try {
            await axios.post('http://127.0.0.1:5000/books', { title, author, genre }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTitle('');
            setAuthor('');
            setGenre('');
            const response = await axios.get('http://127.0.0.1:5000/books', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="mb-4 text-4xl font-bold">Books</h1>
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
                <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add Book</button>
            </form>
            <ul className="w-full max-w-md">
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