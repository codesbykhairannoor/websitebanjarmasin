import React from "react";
import Link from "next/link";
import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Navbar from "../../../../components/Navbar";
import Footer from "../../../../components/Footer";
import BlogDetailClient from "./BlogDetailClient";

async function getBlogs() {
  try {
    const dataPath = path.join(process.cwd(), "src", "data", "blogs.json");
    if (fs.existsSync(dataPath)) {
      return JSON.parse(fs.readFileSync(dataPath, "utf8"));
    }
  } catch (e) {
    console.error(e);
  }
  return [];
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  const langs = ["id", "en", "ms", "zh"];
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
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) return { title: "Not Found" };
  const title = blog.title[lang] || blog.title.id;
  const content = blog.content[lang] || blog.content.id;
  const firstPara = content.split("\n").find((p) => p.trim() && !p.startsWith("#"));
  return {
    title: `${title} | Visit Banjarmasin Blog`,
    description: firstPara?.substring(0, 160),
    openGraph: {
      title,
      description: firstPara?.substring(0, 160),
      images: blog.image ? [{ url: blog.image, width: 1200, height: 630 }] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const { lang, slug } = await params;
  const blogs = await getBlogs();
  const blog = blogs.find((b) => b.slug === slug);
  if (!blog) notFound();

  const otherBlogs = blogs.filter((b) => b.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Navbar />
      <BlogDetailClient blog={blog} otherBlogs={otherBlogs} lang={lang} />
      <Footer />
    </div>
  );
}
