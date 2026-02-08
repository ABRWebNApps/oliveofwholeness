"use client";

import { useEffect } from "react";
import { checkAdminAuth } from "@/lib/auth";

export default function AdminProtection({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const checkAuth = async () => {
      const isAdmin = await checkAdminAuth();
      if (!isAdmin) {
        window.location.href = "/admin/login";
      }
    };

    checkAuth();
  }, []);

  return <>{children}</>;
}
