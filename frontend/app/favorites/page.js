"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("access_token");
      if (!token) {
        router.push("/login");
        return;
      }
      try {
        const response = await axios.get("http://127.0.0.1:5000/favorites", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavorites(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, [router]);

  const handleAddToFavorites = async (bookId) => {
    const token = localStorage.getItem('access_token');
    try {
        await axios.post('http://127.0.0.1:5000/favorites', { book_id: bookId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        alert('Book added to favorites!');
    } catch (error) {
        console.error("Error adding to favorites:", error.response ? error.response.data : error.message);
        alert("Failed to add to favorites. Please check the console for more details.");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">My Favorites</h1>
      <ul>
        {favorites.map((favorite, index) => (
          <li key={`${favorite.book_id}-${index}`}>{favorite.title}</li>
        ))}
      </ul>
    </div>
  );
}
