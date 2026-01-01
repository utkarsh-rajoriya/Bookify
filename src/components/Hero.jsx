"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SignupModal from "./auth/SignupModal";

const Hero = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [signupOpen, setSignupOpen] = useState(false);

  // AUTO OPEN MODAL IF login=true
  useEffect(() => {
    const loginParam = searchParams.get("login");
    if (loginParam === "true") {
      setSignupOpen(true);
    }
  }, [searchParams]);

  return (
    <section className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center max-w-2xl px-4">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900">
          Discover Your Next Favorite Book
        </h1>

        <p className="mt-4 text-gray-600 text-lg">
          Bookify helps you explore, manage, and organize books with a simple
          and beginner-friendly experience.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
            onClick={() => router.push("/books")}
          >
            Browse Books
          </button>

          <button
            className="px-6 py-3 border border-black rounded-lg hover:bg-gray-100 transition"
            onClick={() => router.push("/publish")}
          >
            Add Book
          </button>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal open={signupOpen} setOpen={setSignupOpen} />
    </section>
  );
};

export default Hero;
