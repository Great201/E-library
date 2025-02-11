"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const genres = ["romance", "horror", "love", "science", "history", "fantasy"];

  const fetchBooks = async (page) => {
    setLoading(true);
    try {
      const allBooks = [];
      for (const genre of genres) {
        const response = await axios.get(
          `https://openlibrary.org/subjects/${genre}.json?&offset=${
            (page - 1) * 10
          }`
        );
        const fetchedBooks = response.data.works.map((book) => ({
          id: book.key,
          title: book.title,
          author: book.authors.map((author) => author.name).join(", "),
          cover: `https://covers.openlibrary.org/b/olid/${book.cover_edition_key}-M.jpg`,
          link: `https://openlibrary.org${book.key}`,
        }));
        allBooks.push(...fetchedBooks);
      }
      setBooks((prevBooks) => [...prevBooks, ...allBooks]);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      fetchBooks(page);
    }
  }, [page, router]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  const handleAddToFavorites = async (bookId) => {
    const token = localStorage.getItem('access_token');
    try {
        await axios.post('http://127.0.0.1:5000/favorites', { book_id: bookId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Book added to favorites!');
    } catch (error) {
      console.error("Error adding to favorites:", error.response ? error.response.data : error.message);
  }
};

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block w-full md:w-64 h-auto md:h-screen text-gray-900 bg-white fixed md:relative z-10`}
      >
        <div className="flex items-center justify-between px-6 py-4 md:block">
          <h2 className="text-2xl font-bold">Bells E-library</h2>
          <button
            className="text-gray-900 md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ✕
          </button>
        </div>
        <nav className="px-6">
          <ul>
            <li className="block px-3 py-2 font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
              <Link href="/">Home</Link>
            </li>
            <li className="block px-3 py-2 font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
              <Link href="/favorites"> Favorites</Link>
            </li>
            <li className="block px-3 py-2 font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
              <Link href="/add-book">Add Book</Link>
            </li>
            <li className="block px-3 py-2 font-semibold text-gray-900 rounded-lg hover:bg-gray-50">
              <Link href="#" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full p-6 bg-gray-100 md:mt-0">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <div className="flex items-center space-x-4">
            <p>{userName}</p>
            <button
              className="-m-2.5 md:hidden inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </header>

        {/* Books Section */}
        <section className="mt-6">
          <h2 className="text-xl font-bold">My Books</h2>
          <div className="grid grid-cols-2 gap-4 mt-4 sm:grid-cols-3 lg:grid-cols-4">
            {books.slice(0, page * 10).map((book, index) => (
              <div key={`${book.id}-${index}`} className="p-4 bg-white rounded shadow">
                <Link href={book.link} target="_blank" rel="noopener noreferrer">
                  <img src={book.cover} alt={book.title} className="object-cover w-full h-40 rounded" />
                  <h3 className="mt-2 text-sm font-bold">{book.title}</h3>
                  <p className="text-xs">Author: {book.author}</p>
                </Link>
                <button onClick={() => handleAddToFavorites(book.id)} className="mt-2 px-2 py-1 text-white bg-blue-500 rounded">
                  Add to Favorites
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={handleShowMore}
            className="px-4 py-2 mt-4 text-white bg-green-500 rounded hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Loading..." : "Show More"}
          </button>
        </section>
      </main>
    </div>
  );
}
