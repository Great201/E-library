"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const router = useRouter();

  const genres = ["love", "science", "history", "fantasy"];

  const fetchBooks = async (page) => {
    setLoading(true);
    try {
      const allBooks = [];
      for (const genre of genres) {
        const response = await axios.get(
          `https://openlibrary.org/subjects/${genre}.json?limit=10&offset=${
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

  const fetchUserName = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:5000/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserName(response.data.name);
    } catch (error) {
      console.error("Error fetching user data:", error);
      router.push("/");
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/login");
    } else {
      fetchBooks(page);
      // fetchUserName();
    }
  }, [page, router]);

  const handleShowMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="fixed w-64 h-screen text-gray-900 bg-white">
        <div className="px-6 py-4">
          <h2 className="text-2xl font-bold">Bells E-library</h2>
        </div>
        <nav className="px-6">
          <ul>
            <li className="py-2 block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">
              <Link href="/dashboard">Home</Link>
            </li>
            <li className="py-2 block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">
              Categories
            </li>
            <li className="py-2 block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">
              Favourites
            </li>
            <li className="py-2 block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">
              <Link href="/add-book">Add Book</Link>
            </li>
            <li className="py-2 block px-3 py-2 -mx-3 font-semibold text-gray-900 rounded-lg text-base/7 hover:bg-gray-50">
              <Link href="#" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full min-h-screen p-6 ml-64 bg-gray-100">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Dashboard</h1>
          <div className="flex items-center space-x-4">
            <p>userName</p>
          </div>
        </header>

        {/* Content Sections */}
        <div className="grid grid-cols-3 gap-6 mt-6">
          {/* Popular Books */}
          <section>
            <h2 className="text-xl font-bold">Popular</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {books.slice(0, 4).map((book) => (
                <div key={book.id} className="p-4 bg-white rounded shadow">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="object-cover w-full h-40"
                  />
                  <h3 className="mt-2 text-sm font-bold">{book.title}</h3>
                  <p className="text-xs">{book.author}</p>
                </div>
              ))}
            </div>
          </section>

          {/* My Books */}
          <section className="col-span-2">
            <h2 className="text-xl font-bold">My Books</h2>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {books.slice(4, 10).map((book) => (
                <div key={book.id} className="p-4 bg-white rounded shadow">
                  <h3 className="mt-2 text-sm font-bold">{book.title}</h3>
                  <p className="text-xs">Author: {book.author}</p>
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
        </div>
      </main>
    </div>
  );
}
