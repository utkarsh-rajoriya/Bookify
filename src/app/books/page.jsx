"use client";
import React, { useEffect, useState } from "react";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("/api/books");
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg font-medium">Loading books...</p>
      </div>
    );
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📚 All Books</h1>

      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div
              key={book.id}
              className="relative border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
            >
              {/* Image */}
              <div className="h-56 w-full bg-gray-100">
                <img
                  src={book.imageUrl}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-2 left-2 px-3 italic text-lg text-white bg-black/40 rounded-2xl">
                {book.category}
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h2 className="text-lg font-semibold line-clamp-1">
                  {book.title}
                </h2>

                <p className="text-sm line-clamp-2 text-gray-600">
                  {book.description}
                </p>
                
                <p className="text-sm font-bold text-gray-500">
                  Author: {book.author}
                </p>

                <p className="text-xs text-gray-400">
                  Published on {formatDate(book.createdAt)}
                </p>

                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{book.price}
                  </span>

                  <button className="text-sm px-3 py-1 border rounded hover:bg-indigo-600 hover:text-white transition">
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BooksPage;
