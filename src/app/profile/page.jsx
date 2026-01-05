"use client"
import ProtectedRoutes from "@/components/auth/ProtectedRoutes";
import React from "react";

export const ProfilePage = () => {
  return <div>ProfilePage</div>;
};

export default function page() {
  return (
    <ProtectedRoutes>
      <ProfilePage />
    </ProtectedRoutes>
  );
};
