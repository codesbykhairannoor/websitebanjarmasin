import React from "react";
import fs from "fs";
import path from "path";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import BlogListClient from "./BlogListClient";

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

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const titles = {
    id: "Blog & Artikel Wisata | Visit Banjarmasin",
    en: "Blog & Travel Articles | Visit Banjarmasin",
    ms: "Blog & Artikel Pelancongan | Visit Banjarmasin",
    zh: "博客与旅游文章 | Visit Banjarmasin",
  };
  const descs = {
    id: "Kisah menarik, panduan rahasia, dan berita terbaru seputar pesona Kota Banjarmasin — Kota Seribu Sungai.",
    en: "Fascinating stories, insider guides, and the latest news about the charm of Banjarmasin — The City of a Thousand Rivers.",
    ms: "Kisah menarik, panduan dalaman, dan berita terkini tentang pesona Banjarmasin — Kota Seribu Sungai.",
    zh: "关于班贾尔马辛（千河之城）魅力的精彩故事、内部指南和最新新闻。",
  };
  return {
    title: titles[lang] || titles.id,
    description: descs[lang] || descs.id,
    openGraph: {
      title: titles[lang] || titles.id,
      description: descs[lang] || descs.id,
    },
  };
}

export default async function BlogListPage({ params }) {
  const { lang } = await params;
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      <Navbar />
      <BlogListClient blogs={blogs} lang={lang} />
      <Footer />
    </div>
  );
}
