"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function DashboardHome() {
  const [stats, setStats] = useState({ blogs: 0, events: 0 });

  useEffect(() => {
    Promise.all([
      fetch("/api/blogs").then(r => r.json()),
      fetch("/api/events").then(r => r.json())
    ]).then(([blogs, events]) => {
      setStats({
        blogs: blogs.length || 0,
        events: events.length || 0
      });
    }).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-black font-heading mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#091422] border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-white/60 font-bold mb-2 uppercase tracking-widest text-sm">Total Blogs</h3>
            <p className="text-6xl font-black text-[#33C3B3] mb-6">{stats.blogs}</p>
            <Link href="/admin/dashboard/blogs" className="inline-flex items-center text-sm font-bold text-white hover:text-[#33C3B3] transition-colors">
              Manage Blogs ➔
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 text-[10rem] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            📝
          </div>
        </div>

        <div className="bg-[#091422] border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
          <div className="relative z-10">
            <h3 className="text-white/60 font-bold mb-2 uppercase tracking-widest text-sm">Total Events</h3>
            <p className="text-6xl font-black text-[#F4C038] mb-6">{stats.events}</p>
            <Link href="/admin/dashboard/events" className="inline-flex items-center text-sm font-bold text-white hover:text-[#F4C038] transition-colors">
              Manage Events ➔
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 text-[10rem] opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-500">
            🎉
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-[#091422] border border-white/10 p-8 rounded-2xl">
        <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
        <ul className="list-disc pl-5 space-y-2 text-white/70">
          <li>Always provide all 4 languages (ID, EN, MS, ZH) for maximum SEO impact.</li>
          <li>Blog slugs must be unique and URL-friendly (e.g., <code className="text-[#33C3B3]">pasar-terapung-guide</code>).</li>
          <li>After saving changes here, commit and push to GitHub so Vercel can rebuild the static pages!</li>
        </ul>
      </div>
    </div>
  );
}
