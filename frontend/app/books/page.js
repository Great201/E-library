"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Books() {
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const genres = ['love', 'science', 'history', 'fantasy']; // Add more genres as needed

    const fetchBooks = async (page) => {
        setLoading(true);
        try {
            const allBooks = [];
            for (const genre of genres) {
                const response = await axios.get(`https://openlibrary.org/subjects/${genre}.json?limit=10&offset=${(page - 1) * 10}`);
                const fetchedBooks = response.data.works.map(book => ({
                    id: `${genre}-${book.key}`,
                    title: book.title,
                    author: book.authors.map(author => author.name).join(', '),
                    genre: genre.charAt(0).toUpperCase() + genre.slice(1), // Capitalize genre
                    link: `https://openlibrary.org${book.key}`
                }));
                allBooks.push(...fetchedBooks);
            }
            setBooks(prevBooks => [...prevBooks, ...allBooks]);
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            router.push('/login');
        } else {
            fetchBooks(page);
        }
    }, [page, router]);

    const handleShowMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
            <h1 className="mb-4 text-4xl font-bold">Books</h1>
            <Link href="/add-book">
                <button className="mb-4 px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Add New Book</button>
            </Link>
            <ul className="w-full max-w-md">
                {books.map(book => (
                    <li key={book.id} className="py-2 border-b">
                        <h3 className="font-bold">{book.title}</h3>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <a href={book.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">View Book</a>
                    </li>
                ))}
            </ul>
            <button 
                onClick={handleShowMore} 
                className="mt-4 px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600"
                disabled={loading}
            >
                {loading ? 'Loading...' : 'Show More'}
            </button>
        </div>
    );
}