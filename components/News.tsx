"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string | null;
  category: string;
  createdAt: string;
}

export default function News() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const [newsItems, setNewsItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();

  const texts = {
    tr: {
      title: "En Son Haberler",
      empty: "Henüz blog yazısı yok",
      readMore: "Devamını oku",
      allPosts: "Tüm Yazılar",
    },
    en: {
      title: "Latest News",
      empty: "No blog posts yet",
      readMore: "Read more",
      allPosts: "View All Posts",
    },
    ru: {
      title: "Свежие новости",
      empty: "Пока нет опубликованных записей",
      readMore: "Читать далее",
      allPosts: "Все статьи",
    },
    ar: {
      title: "أحدث المقالات",
      empty: "لا توجد مقالات منشورة حالياً",
      readMore: "اقرأ المزيد",
      allPosts: "عرض جميع المقالات",
    },
  }[language];

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  const fetchLatestBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?published=true');
      const data = await res.json();
      // En son 2 blog yazısını al
      const latestBlogs = data.slice(0, 2);
      setNewsItems(latestBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="blog" ref={ref} className={isVisible ? 'scroll-animate-right visible' : 'scroll-animate-right'}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        {texts.title}
      </h2>
      
      {loading ? (
        <div className="space-y-4">
          <div className="shimmer h-32 rounded-lg"></div>
          <div className="shimmer h-32 rounded-lg"></div>
        </div>
      ) : newsItems.length === 0 ? (
        <div className="module-card p-6 text-center">
          <svg className="w-10 h-10 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600 text-sm">{texts.empty}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {newsItems.map((news, index) => (
            <Link
              key={news.id}
              href={`/blog/${news.slug}`}
              className="module-card module-fade-up block h-full min-h-[280px] sm:min-h-[300px] group"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="flex flex-col h-full">
                {/* Image */}
                <div className="relative w-full h-40 flex-shrink-0 bg-gray-200 overflow-hidden">
                  {news.image ? (
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#14b8a6] to-[#10b981]">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <span className="inline-block bg-[#14b8a6] text-white px-2 py-0.5 rounded-full text-xs font-medium">
                        {news.category}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-[#14b8a6] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-xs leading-relaxed line-clamp-3">
                      {news.excerpt}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-[#14b8a6] hover:text-[#0d9488] font-semibold text-xs group-hover:gap-2 transition-all">
                    {texts.readMore}
                    <svg
                      className="w-3 h-3 ml-1.5 transform group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      
      <div className="mt-4">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#1e3a5f] hover:text-[#14b8a6] font-bold text-sm"
        >
          {texts.allPosts}
          <svg
            className="w-4 h-4 ml-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

