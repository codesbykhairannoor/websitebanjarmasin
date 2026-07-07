import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";

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

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const langs = ['id', 'en', 'ms', 'zh'];
  const params = [];
  
  for (const lang of langs) {
    for (const blog of blogs) {
      params.push({ lang, slug: blog.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);
  
  if (!blog) return { title: "Not Found" };
  
  const title = blog.title[lang] || blog.title.id;
  const content = blog.content[lang] || blog.content.id;
  
  return {
    title: `${title} | Visit Banjarmasin Blog`,
    description: content.substring(0, 160),
    openGraph: {
      title,
      images: blog.image ? [blog.image] : [],
    }
  };
}

export default async function BlogDetailPage({ params }) {
  const { lang, slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    notFound();
  }

  const title = blog.title[lang] || blog.title.id;
  const content = blog.content[lang] || blog.content.id;

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href={`/${lang}/blog`} className="text-[#33C3B3] font-bold flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
            <span className="text-xl">⬅</span> Back to Blogs
          </Link>
          
          <p className="text-[#F4C038] font-bold mb-4 uppercase tracking-widest text-sm">{new Date(blog.date).toLocaleDateString()}</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black font-heading mb-10 leading-tight">{title}</h1>
          
          {blog.image && (
            <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-12 shadow-2xl border border-[var(--glass-border)]">
              <img src={blog.image} alt={title} className="w-full h-full object-cover" />
            </div>
          )}
          
          <article className="prose prose-lg dark:prose-invert max-w-none font-body leading-relaxed text-[var(--text-main)] text-justify md:text-left">
            {content.split('\n').map((paragraph, idx) => {
              if (!paragraph.trim()) return <br key={idx} />;
              if (paragraph.startsWith('# ')) {
                return <h2 key={idx} className="text-3xl font-black font-heading mt-10 mb-4 text-[#33C3B3]">{paragraph.replace('# ', '')}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h3 key={idx} className="text-2xl font-bold font-heading mt-8 mb-3 text-[#F4C038]">{paragraph.replace('## ', '')}</h3>;
              }
              if (paragraph.match(/^\d+\.\s/)) {
                return <p key={idx} className="mb-4 pl-4 border-l-2 border-[#33C3B3]">{paragraph}</p>;
              }
              return (
                <p key={idx} className="mb-6 opacity-90 text-lg">
                  {paragraph}
                </p>
              );
            })}
          </article>
        </div>
      </div>

      <Footer />
    </div>
  );
}
