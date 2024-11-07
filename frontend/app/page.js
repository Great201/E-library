"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/books')
            .then(response => setBooks(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div>
            <h1>E-Library</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <h2>{book.title}</h2>
                        <p>Author: {book.author}</p>
                        <p>Genre: {book.genre}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
