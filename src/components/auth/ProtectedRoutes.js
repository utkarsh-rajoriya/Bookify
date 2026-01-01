"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "@/contexts/authContext";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/?login=true");
    }
  }, [user, loading, router]);

  if (loading) return null;

  if (user) return <>{children}</>;

  return null;
};

export default ProtectedRoutes;
