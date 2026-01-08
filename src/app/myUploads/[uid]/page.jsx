"use client";
import React, { use, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";

const MyUploads = ({ params }) => {
  const { uid } = use(params);

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (!uid) return;

    const fetchMyUploads = async () => {
      try {
        const res = await fetch(`/api/books?uid=${uid}`, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error();

        const data = await res.json();
        setBooks(data);
      } catch {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMyUploads();
  }, [uid]);

  const formatDate = (timestamp) => {
    if (!timestamp?.seconds) return "";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const handleDelete = async (bookId) => {
    const confirmDelete = window.confirm("Delete this book?");
    if (!confirmDelete) return;

    try {
      setDeletingId(bookId);

      const res = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      // ✅ Optimistic UI update
      setBooks((prev) => prev.filter((book) => book.id !== bookId));
    } catch {
      alert("Failed to delete book");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="mt-20 text-center">Loading your uploads…</div>;
  }

  if (error) {
    return <div className="mt-20 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-20 max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">📤 My Uploads</h1>

      {books.length === 0 ? (
        <p className="text-gray-500">You haven’t uploaded any books yet.</p>
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

              <div className="absolute top-2 left-2 px-3 italic text-lg text-white bg-black/70 rounded-2xl">
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

                  <button
                    onClick={() => handleDelete(book.id)}
                    disabled={deletingId === book.id}
                    className="p-2 rounded-full hover:bg-red-50 transition disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === book.id ? (
                      <span className="text-xs text-red-500">…</span>
                    ) : (
                      <Trash2
                        className="scale-90 hover:scale-105 transition"
                        color="red"
                      />
                    )}
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

export default MyUploads;
