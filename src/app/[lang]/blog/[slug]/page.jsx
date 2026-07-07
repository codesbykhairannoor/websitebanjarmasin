import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";

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
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href={`/${lang}/blog`} className="text-[#33C3B3] font-bold flex items-center gap-2 mb-8 hover:opacity-80">
          ⬅ Back to Blogs
        </Link>
        
        {blog.image && (
          <div className="w-full aspect-[21/9] rounded-3xl overflow-hidden mb-10 shadow-2xl">
            <img src={blog.image} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <p className="text-[#F4C038] font-bold mb-4">{new Date(blog.date).toLocaleDateString()}</p>
        <h1 className="text-4xl md:text-6xl font-black font-heading mb-10 leading-tight">{title}</h1>
        
        <div className="prose prose-lg dark:prose-invert max-w-none">
          {content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 leading-relaxed text-lg text-[var(--text-main)]">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
