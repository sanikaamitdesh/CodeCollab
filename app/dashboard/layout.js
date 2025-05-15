"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setUser(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  return (
    <div className="flex h-screen flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white p-4 flex flex-col">
        <h2 className="text-lg font-bold mb-4">CodeCollab</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className="bg-gray-700 p-2 rounded">
            Dashboard
          </Link>
          <Link href="/create-room" className="bg-gray-700 p-2 rounded">
            Create Room
          </Link>
          <Link href="/join-room" className="bg-gray-700 p-2 rounded">
            Join Room
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 p-2 mt-4 rounded"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
