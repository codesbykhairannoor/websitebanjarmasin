"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "../../../../context/LanguageContext";

const labels = {
  id: { back: "← Kembali ke Blog", readAlso: "✦ BACA JUGA", by: "Oleh Tim Redaksi", share: "Bagikan Artikel Ini" },
  en: { back: "← Back to Blog", readAlso: "✦ READ ALSO", by: "By Editorial Team", share: "Share This Article" },
  ms: { back: "← Kembali ke Blog", readAlso: "✦ BACA JUGA", by: "Oleh Pasukan Editorial", share: "Kongsi Artikel Ini" },
  zh: { back: "← 返回博客", readAlso: "✦ 相关阅读", by: "编辑团队", share: "分享此文章" },
};

function renderContent(content) {
  return content.split("\n").map((line, idx) => {
    if (!line.trim()) return <div key={idx} className="h-4" />;
    if (line.startsWith("## ")) {
      return (
        <h2 key={idx} className="text-2xl sm:text-3xl font-black font-heading mt-12 mb-4 text-[#33C3B3] flex items-center gap-3 before:content-[''] before:w-1 before:h-7 before:bg-[#33C3B3] before:rounded-full">
          {line.replace("## ", "")}
        </h2>
      );
    }
    if (line.startsWith("# ")) {
      return (
        <h2 key={idx} className="text-3xl sm:text-4xl font-black font-heading mt-12 mb-5 text-[#F4C038]">
          {line.replace("# ", "")}
        </h2>
      );
    }
    if (line.match(/^\d+\.\s\*\*/)) {
      const [num, ...rest] = line.split(" ");
      const bold = rest.join(" ").replace(/\*\*(.*?)\*\*/g, (_, m) => `<strong class="text-[var(--text-main)]">${m}</strong>`);
      return (
        <div key={idx} className="flex gap-4 mb-4 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)]">
          <span className="text-[#F4C038] font-black text-lg shrink-0">{num}</span>
          <p className="text-[var(--text-main)] leading-relaxed" dangerouslySetInnerHTML={{ __html: bold }} />
        </div>
      );
    }
    if (line.match(/^\d+\.\s/)) {
      return (
        <div key={idx} className="flex gap-4 mb-4 p-4 rounded-xl bg-[var(--card-bg)] border border-[var(--glass-border)] hover:border-[#33C3B3]/40 transition-colors">
          <span className="text-[#F4C038] font-black text-sm shrink-0 mt-0.5">{line.match(/^\d+/)[0]}.</span>
          <p className="text-[var(--text-muted)] leading-relaxed">{line.replace(/^\d+\.\s/, "")}</p>
        </div>
      );
    }
    const withBold = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-[var(--text-main)] font-bold">$1</strong>');
    return (
      <p
        key={idx}
        className="text-[var(--text-muted)] text-base sm:text-lg leading-[1.9] mb-5"
        dangerouslySetInnerHTML={{ __html: withBold }}
      />
    );
  });
}

export default function BlogDetailClient({ blog, otherBlogs, lang }) {
  const { language } = useLanguage();
  const currentLang = language || lang || "id";
  const L = labels[currentLang] || labels.id;

  const title = blog.title[currentLang] || blog.title.id;
  const content = blog.content[currentLang] || blog.content.id;

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

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="flex-1 pt-28 pb-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link
            href={`/${currentLang}/blog`}
            className="inline-flex items-center gap-2 text-[#33C3B3] font-bold text-sm hover:gap-4 transition-all duration-300 mb-10 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            {L.back}
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 rounded-full bg-[#33C3B3]/10 border border-[#33C3B3]/30 text-[#33C3B3] text-xs font-bold">
              📰 Blog
            </span>
            <span className="text-[var(--text-muted)] text-sm">{formatDate(blog.date)}</span>
            <span className="text-[var(--text-muted)] text-xs">·</span>
            <span className="text-[var(--text-muted)] text-xs">{L.by}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-heading leading-tight mb-6">
            {title}
          </h1>
        </motion.div>

        {/* Hero Image */}
        {blog.image && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative w-full rounded-3xl overflow-hidden mb-14 shadow-2xl border border-[var(--glass-border)] aspect-[16/7]"
          >
            <img
              src={blog.image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-main)]/40 to-transparent" />
          </motion.div>
        )}

        {/* Article Content */}
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          {renderContent(content)}
        </motion.article>

        {/* Share Bar */}
        <div className="p-6 rounded-2xl bg-[var(--card-bg)] border border-[var(--glass-border)] flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
          <p className="font-bold text-[var(--text-main)]">{L.share}</p>
          <div className="flex gap-3">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#1DA1F2]/10 border border-[#1DA1F2]/30 text-[#1DA1F2] text-xs font-bold hover:bg-[#1DA1F2]/20 transition-all"
            >
              𝕏 Twitter
            </a>
            <a
              href={`https://wa.me/?text=${encodeURIComponent(title + " " + shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs font-bold hover:bg-[#25D366]/20 transition-all"
            >
              WhatsApp
            </a>
            <button
              onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(shareUrl); }}
              className="px-4 py-2 rounded-xl bg-[var(--glass-border)] text-[var(--text-muted)] text-xs font-bold hover:text-[var(--text-main)] transition-all"
            >
              📋 Copy
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {otherBlogs.length > 0 && (
          <div>
            <p className="text-[#F4C038] text-xs font-black tracking-[0.3em] uppercase mb-6">{L.readAlso}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {otherBlogs.map((b) => {
                const t = b.title[currentLang] || b.title.id;
                return (
                  <Link
                    key={b.id}
                    href={`/${currentLang}/blog/${b.slug}`}
                    className="group flex flex-col bg-[var(--card-bg)] border border-[var(--glass-border)] rounded-2xl overflow-hidden hover:border-[#33C3B3]/60 hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative h-36 overflow-hidden">
                      {b.image ? (
                        <img
                          src={b.image}
                          alt={t}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#33C3B3]/20 to-[#F4C038]/10" />
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[#F4C038] text-[10px] font-bold mb-2">{formatDate(b.date)}</p>
                      <p className="text-sm font-bold font-heading line-clamp-2 group-hover:text-[#33C3B3] transition-colors">
                        {t}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
