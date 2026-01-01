"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProtectedRoutes from "@/components/auth/ProtectedRoutes";

const PublishPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Book object:", book);
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
            <Button type="submit" className="w-full">
              Publish Book
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PublishPage;

// const page = () => {
//   return (
//     <ProtectedRoutes>
//       <PublishPage />
//     </ProtectedRoutes>
//   );
// };
// export default page;