"use client";

import AdminProtection from "@/components/admin-protection";
import { AdminNav } from "@/components/admin-nav";
import { usePathname } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.includes("/login") || pathname.includes("/signup");

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <AdminProtection>
      <div className="min-h-screen bg-background">
        <AdminNav />
        <main>{children}</main>
      </div>
    </AdminProtection>
  );
}
