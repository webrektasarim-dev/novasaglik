"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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
  const [newsItems, setNewsItems] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

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
    <section id="blog">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        En Son Haberler
      </h2>
      
      {loading ? (
        <div className="space-y-6">
          <div className="shimmer h-40 rounded-lg"></div>
          <div className="shimmer h-40 rounded-lg"></div>
        </div>
      ) : newsItems.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-gray-600">Henüz blog yazısı yok</p>
        </div>
      ) : (
        <div className="space-y-6">
          {newsItems.map((news) => (
            <Link
              key={news.id}
              href={`/blog/${news.slug}`}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer block group"
            >
              <div className="flex flex-col sm:flex-row h-full min-h-[160px] sm:min-h-[140px]">
                {/* Image */}
                <div className="relative w-full sm:w-40 md:w-48 h-40 sm:h-full flex-shrink-0 bg-gray-200 overflow-hidden">
                  {news.image ? (
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 160px, 192px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#14b8a6] to-[#10b981]">
                      <span className="text-4xl">📄</span>
                    </div>
                  )}
                </div>
                
                {/* Content */}
                <div className="flex-1 p-4 sm:p-6 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <span className="inline-block bg-[#14b8a6] text-white px-2 py-1 rounded-full text-xs font-medium">
                        {news.category}
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 line-clamp-2 group-hover:text-[#14b8a6] transition-colors">
                      {news.title}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                      {news.excerpt}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-[#14b8a6] hover:text-[#0d9488] font-semibold text-sm group-hover:gap-2 transition-all">
                    Devamını oku
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
      
      <div className="mt-8">
        <Link
          href="/blog"
          className="inline-flex items-center text-[#1e3a5f] hover:text-[#14b8a6] font-bold text-base"
        >
          Tüm Yazılar
          <svg
            className="w-5 h-5 ml-2"
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

