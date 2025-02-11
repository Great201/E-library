"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function AddBook() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [category, setCategory] = useState("");
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      router.push("/login"); // Redirect to login if no token
    }
  }, [router]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://elibrarybackend.vercel.app/books",
        { title, author, genre, category },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTitle("");
      setAuthor("");
      setGenre("");
      setCategory("");
      router.push("/books"); // Redirect to books page after adding
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen text-gray-800 bg-gray-100">
        <h1 className="mb-4 text-4xl font-bold">Add New Book</h1>
        <form onSubmit={handleAddBook} className="flex flex-col mb-4 space-y-4">
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
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Book
          </button>
        </form>
      </div>
    </>
  );
}
