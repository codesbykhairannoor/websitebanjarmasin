import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// Function to fetch blogs locally during build
async function getBlogs() {
  try {
    const dataPath = path.join(process.cwd(), 'src', 'data', 'blogs.json');
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function generateMetadata({ params }) {
  const { lang } = await params;
  return {
    title: "Blog & Artikel - Visit Banjarmasin",
    description: "Kumpulan artikel, berita, dan tips wisata seputar kota Banjarmasin.",
  };
}

export default async function BlogListPage({ params }) {
  const { lang } = await params;
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black font-heading mb-4 text-center">Blog & Artikel</h1>
          <p className="text-center text-[var(--text-muted)] mb-16 max-w-2xl mx-auto">
            Temukan kisah menarik, panduan rahasia, dan berita terbaru seputar pesona wisata Kota Seribu Sungai.
          </p>

          {blogs.length === 0 ? (
            <div className="text-center text-[var(--text-muted)] py-20 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl">
              Belum ada artikel saat ini.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map(blog => {
                const title = blog.title[lang] || blog.title.id;
                const content = blog.content[lang] || blog.content.id;
                const excerpt = content.substring(0, 100) + "...";
                
                return (
                  <Link key={blog.id} href={`/${lang}/blog/${blog.slug}`} className="group bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl overflow-hidden hover:border-[#33C3B3] transition-all hover:-translate-y-2 flex flex-col">
                    <div className="aspect-video bg-[#091422] relative overflow-hidden">
                      {blog.image ? (
                        <img src={blog.image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#33C3B3]/20 to-[#F4C038]/20" />
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-[#F4C038] text-xs font-bold mb-3">{new Date(blog.date).toLocaleDateString()}</p>
                      <h2 className="text-xl font-bold font-heading mb-3 line-clamp-2 group-hover:text-[#33C3B3] transition-colors">{title}</h2>
                      <p className="text-[var(--text-muted)] text-sm line-clamp-3 mb-6 flex-1">{excerpt}</p>
                      <span className="text-[#33C3B3] font-bold text-sm flex items-center gap-2">Read More ➔</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
