"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Protected() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access_token");
      try {
        const response = await axios.get(
          "https://elibrarybackend.vercel.app/protected",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(response.data.logged_in_as);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Protected Page</h1>
      {user ? (
        <p>Logged in as: {user}</p>
      ) : (
        <p>Please log in to see this page.</p>
      )}
    </div>
  );
}
