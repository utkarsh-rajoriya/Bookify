"use client";
import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoutes from "@/components/auth/ProtectedRoutes";
import { useAuthContext } from "@/contexts/authContext";

const PublishPage = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [book, setBook] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    bookImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setBook((prev) => ({
      ...prev,
      bookImage: e.target.files[0],
    }));
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("🚀 Publishing book...");

      const imageBase64 = book.bookImage
        ? await fileToBase64(book.bookImage)
        : null;

      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: book.title,
          price: book.price,
          category: book.category,
          description: book.description,
          bookImage: imageBase64,
          author: user.email,
        }),
      });

      if (!res.ok) {
        throw new Error("Upload failed");
      }

      const data = await res.json();
      console.log("🎉 Book published successfully!", data);

      setBook({
        title: "",
        price: "",
        category: "",
        description: "",
        bookImage: null,
      });
      setLoading(false);
    } catch (error) {
      console.error("❌ Publish failed:", error);
    }
  };

  return (
    <div className="pt-20 max-w-3xl mx-auto px-4 py-10">
      <Card className="mt-10">
        <CardHeader>
          <CardTitle className="text-2xl">Publish a Book</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Atomic Habits"
                value={book.title}
                onChange={handleChange}
                required
              />
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                placeholder="399"
                value={book.price}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                placeholder="Self Help"
                value={book.category}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="A book about building habits..."
                value={book.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label>Book Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Submit */}
            {!loading ? (
              <Button type="submit" className="w-full">
                Publish Book
              </Button>
            ) : (
              <Button className="w-full" disabled>
                Publishing...
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

// export default PublishPage;

const page = () => {
  return (
    <ProtectedRoutes>
      <PublishPage />
    </ProtectedRoutes>
  );
};
export default page;
