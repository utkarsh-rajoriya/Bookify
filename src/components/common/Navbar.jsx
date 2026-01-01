"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import SignupModal from "@/components/auth/SignupModal"; 
import { useAuthContext } from "@/contexts/authContext"; 

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, logout } = useAuthContext();

  const dropdownRef = useRef(null);

  const firstLetter = user?.displayName
    ? user.displayName.split(" ")[0][0].toUpperCase()
    : user?.email
    ? user.email[0].toUpperCase()
    : null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      if (logout) await logout();
      setDropdownOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <>
      <nav className="bg-neutral-primary fixed w-full z-20 top-0 start-0 border-b border-default">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* 1. Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/assets/book-logo.png"
              className="h-7"
              alt="Bookify Logo"
            />
            <span className="self-center text-xl text-heading font-semibold whitespace-nowrap">
              Bookify
            </span>
          </Link>

          <div className="flex items-center gap-2 md:order-2">
            {/* Auth Section */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* Avatar Button */}
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center focus:outline-none"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover border border-default"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-sm">
                      {firstLetter}
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-default z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
                      <p className="font-medium truncate">
                        {user.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 font-medium"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Button
                onClick={() => setSignupOpen(true)}
                className="hidden md:inline-flex"
                size="sm"
              >
                Sign in
              </Button>
            )}

            {/* Mobile Toggle Button */}
            <button
              type="button"
              onClick={() => setOpen(!open)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 7h14M5 12h14M5 17h14"
                />
              </svg>
            </button>
          </div>

          {/* 3. Navigation Links (Collapsible) */}
          <div
            id="navbar-default"
            className={`w-full md:flex md:w-auto md:order-1 ${
              open ? "block" : "hidden"
            }`}
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary items-center">
              <li>
                <Link
                  href="/books"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:hover:text-fg-brand md:p-0"
                >
                  Books
                </Link>
              </li>

              <li>
                <Link
                  href="/publish"
                  className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:hover:text-fg-brand md:p-0"
                >
                  Publish
                </Link>
              </li>

              <li>
                <a className="block py-2 px-3 text-heading text-gray-500 rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:hover:text-fg-brand md:p-0 cursor-pointer">
                  Pricing
                </a>
              </li>

              {/* Mobile Only Sign In (If user is NOT logged in) */}
              {!user && (
                <li className="md:hidden mt-2 w-full">
                  <Button
                    onClick={() => setSignupOpen(true)}
                    className="w-full"
                  >
                    Sign in
                  </Button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Signup Modal */}
      <SignupModal open={signupOpen} setOpen={setSignupOpen} />
    </>
  );
};

export default Navbar;
