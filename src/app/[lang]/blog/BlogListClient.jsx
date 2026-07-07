"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "../../../context/LanguageContext";

const labels = {
  id: {
    heading: "Blog & Artikel",
    sub: "Temukan kisah menarik, panduan rahasia, dan berita terbaru seputar pesona wisata Kota Seribu Sungai.",
    readMore: "Baca Selengkapnya →",
    latest: "✦ TERBARU",
    allArticles: "Semua Artikel",
    empty: "Belum ada artikel saat ini.",
    featured: "ARTIKEL UNGGULAN",
    explore: "Jelajah Cerita →",
    by: "Oleh Tim Redaksi",
  },
  en: {
    heading: "Blog & Articles",
    sub: "Discover fascinating stories, insider guides, and the latest news about the City of a Thousand Rivers.",
    readMore: "Read More →",
    latest: "✦ LATEST",
    allArticles: "All Articles",
    empty: "No articles yet.",
    featured: "FEATURED ARTICLE",
    explore: "Explore Stories →",
    by: "By Editorial Team",
  },
  ms: {
    heading: "Blog & Artikel",
    sub: "Temukan kisah menarik, panduan dalaman, dan berita terbaru tentang Kota Seribu Sungai.",
    readMore: "Baca Selengkapnya →",
    latest: "✦ TERKINI",
    allArticles: "Semua Artikel",
    empty: "Tiada artikel buat masa ini.",
    featured: "ARTIKEL PILIHAN",
    explore: "Teroka Cerita →",
    by: "Oleh Pasukan Editorial",
  },
  zh: {
    heading: "博客与文章",
    sub: "发现有趣的故事、内部指南以及关于千河之城的最新新闻。",
    readMore: "阅读更多 →",
    latest: "✦ 最新",
    allArticles: "所有文章",
    empty: "暂无文章。",
    featured: "特色文章",
    explore: "探索故事 →",
    by: "编辑团队",
  },
};

export default function BlogListClient({ blogs, lang }) {
  const { language } = useLanguage();
  const currentLang = language || lang || "id";
  const L = labels[currentLang] || labels.id;
  const [filter, setFilter] = useState("all");

  const featured = blogs[0];
  const rest = blogs.slice(1);

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString(
        currentLang === "id" ? "id-ID" : currentLang === "zh" ? "zh-CN" : currentLang === "ms" ? "ms-MY" : "en-US",
        { day: "numeric", month: "long", year: "numeric" }
      );
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] flex flex-col">
      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #33C3B3 0%, transparent 50%), radial-gradient(circle at 80% 20%, #F4C038 0%, transparent 40%)",
          }}
        />
        <div className="absolute inset-0" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2333C3B3' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
        />
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#33C3B3] text-xs font-black tracking-[0.3em] uppercase mb-4"
          >
            {L.latest}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-7xl font-black font-heading mb-6 bg-gradient-to-r from-[var(--text-main)] via-[#33C3B3] to-[#F4C038] bg-clip-text text-transparent"
          >
            {L.heading}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {L.sub}
          </motion.p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-24 w-full flex-1">
        {blogs.length === 0 ? (
          <div className="text-center text-[var(--text-muted)] py-24 bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-3xl text-lg">
            {L.empty}
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="mb-16"
              >
                <p className="text-[#F4C038] text-xs font-black tracking-[0.3em] uppercase mb-4">
                  {L.featured}
                </p>
                <Link
                  href={`/${currentLang}/blog/${featured.slug}`}
                  className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-[var(--glass-border)] hover:border-[#33C3B3] transition-all duration-500 bg-[var(--card-bg)] shadow-2xl hover:shadow-[0_20px_60px_rgba(51,195,179,0.15)]"
                >
                  <div className="relative h-72 lg:h-auto min-h-[300px] overflow-hidden">
                    {featured.image ? (
                      <img
                        src={featured.image}
                        alt={featured.title[currentLang] || featured.title.id}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#33C3B3]/30 to-[#F4C038]/20" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[var(--card-bg)] hidden lg:block" />
                  </div>
                  <div className="p-8 lg:p-12 flex flex-col justify-center">
                    <p className="text-[#33C3B3] text-xs font-bold uppercase tracking-widest mb-4">
                      {formatDate(featured.date)}
                    </p>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black font-heading leading-tight mb-5 group-hover:text-[#33C3B3] transition-colors duration-300">
                      {featured.title[currentLang] || featured.title.id}
                    </h2>
                    <p className="text-[var(--text-muted)] leading-relaxed mb-8 line-clamp-4">
                      {(featured.content[currentLang] || featured.content.id)
                        .split("\n")
                        .find((p) => p.trim() && !p.startsWith("#") && !p.startsWith("//"))
                        ?.substring(0, 200)}
                      ...
                    </p>
                    <span className="inline-flex items-center gap-2 text-[#F4C038] font-black text-sm group-hover:gap-4 transition-all duration-300">
                      {L.explore}
                    </span>
                  </div>
                </Link>
              </motion.div>
            )}

            {/* Article Grid */}
            {rest.length > 0 && (
              <>
                <p className="text-[#33C3B3] text-xs font-black tracking-[0.3em] uppercase mb-6">
                  {L.allArticles}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {rest.map((blog, idx) => {
                    const title = blog.title[currentLang] || blog.title.id;
                    const content = blog.content[currentLang] || blog.content.id;
                    const firstPara =
                      content
                        .split("\n")
                        .find((p) => p.trim() && !p.startsWith("#"))
                        ?.substring(0, 130) + "...";

                    return (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                      >
                        <Link
                          href={`/${currentLang}/blog/${blog.slug}`}
                          className="group flex flex-col h-full bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden hover:border-[#33C3B3]/60 hover:shadow-[0_8px_30px_rgba(51,195,179,0.12)] transition-all duration-400 hover:-translate-y-1"
                        >
                          {/* Image */}
                          <div className="relative h-52 overflow-hidden bg-[var(--glass-border)]">
                            {blog.image ? (
                              <img
                                src={blog.image}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            ) : (
                              <div className="absolute inset-0 bg-gradient-to-br from-[#33C3B3]/20 to-[#F4C038]/10 flex items-center justify-center text-5xl opacity-30">
                                📰
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[var(--card-bg)] via-transparent to-transparent opacity-60" />
                          </div>

                          {/* Content */}
                          <div className="p-6 flex flex-col flex-1">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#33C3B3] shrink-0" />
                              <p className="text-[#F4C038] text-xs font-bold">
                                {formatDate(blog.date)}
                              </p>
                            </div>
                            <h2 className="text-lg font-bold font-heading mb-3 line-clamp-2 group-hover:text-[#33C3B3] transition-colors">
                              {title}
                            </h2>
                            <p className="text-[var(--text-muted)] text-sm line-clamp-3 leading-relaxed flex-1 mb-5">
                              {firstPara}
                            </p>
                            <div className="flex items-center justify-between border-t border-[var(--glass-border)] pt-4">
                              <span className="text-xs text-[var(--text-muted)]">{L.by}</span>
                              <span className="text-[#33C3B3] font-bold text-xs group-hover:gap-3 flex items-center gap-1 transition-all">
                                {L.readMore}
                              </span>
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
