"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin");
  };

  const menu = [
    { name: "Dashboard", path: "/admin/dashboard", icon: "📊" },
    { name: "Blogs", path: "/admin/dashboard/blogs", icon: "📝" },
    { name: "Events", path: "/admin/dashboard/events", icon: "🎉" },
  ];

  return (
    <div className="min-h-screen flex bg-[#050B14] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#091422] border-r border-white/10 flex flex-col hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-black font-heading tracking-tight text-[#F4C038]">CMS Admin</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {menu.map((item) => {
            const active = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  active ? "bg-[#33C3B3] text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all"
          >
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Mobile Header */}
        <header className="md:hidden bg-[#091422] border-b border-white/10 p-4 flex justify-between items-center sticky top-0 z-10">
          <h2 className="text-xl font-black text-[#F4C038]">CMS Admin</h2>
          <button onClick={handleLogout} className="text-red-500 text-sm font-bold">Logout</button>
        </header>

        {/* Content */}
        <div className="p-6 md:p-10 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
