"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string | null;
  views: number;
  createdAt: string;
}

export default function BlogPage() {
  const { language } = useLanguage();
  const texts = {
    tr: {
      heroTitle: "Sağlık Blog",
      heroDescription: "Evde sağlık bakımı, hasta bakımı ve sağlıklı yaşam hakkında uzman hemşirelerimizden ipuçları ve öneriler.",
      all: "Tümü",
      noPosts: "Henüz blog yazısı yok",
      noPostsHint: "Admin panelden blog ekleyebilirsiniz",
      readMore: "Devamını Oku",
      newsletterTitle: "Sağlık İpuçlarını Kaçırmayın",
      newsletterDescription: "Yeni makalelerimizden ve sağlık ipuçlarından haberdar olmak için e-posta listemize katılın.",
      emailPlaceholder: "E-posta adresiniz",
      subscribe: "Abone Ol",
      dateLocale: "tr-TR",
    },
    en: {
      heroTitle: "Health Blog",
      heroDescription: "Tips from our expert nurses about at-home care, patient support, and healthy living.",
      all: "All",
      noPosts: "No blog posts yet",
      noPostsHint: "Add content from the admin panel.",
      readMore: "Read More",
      newsletterTitle: "Stay Informed",
      newsletterDescription: "Subscribe to receive new articles and helpful healthcare tips.",
      emailPlaceholder: "Email address",
      subscribe: "Subscribe",
      dateLocale: "en-US",
    },
    ru: {
      heroTitle: "Медицинский блог",
      heroDescription: "Советы наших медсестёр о домашнем уходе, поддержке пациентов и здоровом образе жизни.",
      all: "Все",
      noPosts: "Пока нет публикаций",
      noPostsHint: "Добавьте записи через административную панель.",
      readMore: "Читать далее",
      newsletterTitle: "Получайте полезные советы",
      newsletterDescription: "Подпишитесь, чтобы первыми узнавать о новых статьях и рекомендациях.",
      emailPlaceholder: "Ваш e-mail",
      subscribe: "Подписаться",
      dateLocale: "ru-RU",
    },
    ar: {
      heroTitle: "مدونة الصحة",
      heroDescription: "نصائح من فريقنا التمريضي حول الرعاية المنزلية، دعم المرضى، ونمط الحياة الصحي.",
      all: "الكل",
      noPosts: "لا توجد مقالات حالياً",
      noPostsHint: "يمكن إضافة المقالات من لوحة التحكم.",
      readMore: "اقرأ المزيد",
      newsletterTitle: "لا تفوّت نصائحنا الصحية",
      newsletterDescription: "اشترك ليصلك كل جديد من المقالات والإرشادات الطبية.",
      emailPlaceholder: "عنوان بريدك الإلكتروني",
      subscribe: "اشترك الآن",
      dateLocale: "ar-EG",
    },
  }[language];

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [allCategories, setAllCategories] = useState<string[]>([]);

  useEffect(() => {
    // Paralel fetch - daha hızlı yükleme
    Promise.all([
      fetch('/api/blogs?published=true').then(res => res.json()),
      fetch("/api/categories").then(res => res.json()).catch(() => [])
    ]).then(([blogsData, categoriesData]) => {
      setBlogPosts(blogsData);
      if (Array.isArray(categoriesData) && categoriesData.length > 0) {
        const categoryNames = categoriesData.map((cat: { name: string }) => cat.name);
        setAllCategories(categoryNames);
      } else {
        // Fallback: bloglardan kategorileri çıkar
        const postCategories = Array.from(new Set(blogsData.map((post: BlogPost) => post.category)));
        setAllCategories(postCategories);
      }
      setLoading(false);
    }).catch((error) => {
      console.error('Error fetching data:', error);
      setLoading(false);
    });
  }, []);

  const categories = allCategories.length > 0 ? allCategories : Array.from(new Set(blogPosts.map((post) => post.category)));

  const getCategoryCount = (categoryName: string) => {
    if (categoryName === "all") {
      return blogPosts.length;
    }
    return blogPosts.filter((post) => post.category === categoryName).length;
  };

  const filteredPosts =
    selectedCategory === "all"
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);



  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{texts.heroTitle}</h1>
            <p className="text-xl text-gray-200">{texts.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { label: texts.all, value: "all" },
              ...categories.map((category) => ({ label: category, value: category })),
            ].map((category) => {
              const count = getCategoryCount(category.value);
              return (
                <button
                  key={category.value}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    selectedCategory === category.value ? "bg-[#14b8a6] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {category.label} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="shimmer h-96 rounded-xl"></div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="medical-card text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-600 text-lg">{texts.noPosts}</p>
              <p className="text-gray-500 text-sm mt-2">{texts.noPostsHint}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow card-hover-lift"
                >
                  <div className="h-48 bg-gray-200 flex items-center justify-center relative overflow-hidden">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl">📄</span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm">
                      <span className="bg-[#14b8a6] text-white px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-gray-500">
                        {new Date(post.createdAt).toLocaleDateString(texts.dateLocale)}
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#14b8a6] transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          {post.views}
                        </span>
                      </div>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-[#14b8a6] hover:text-[#0d9488] font-semibold inline-flex items-center gap-2"
                      >
                        {texts.readMore}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{texts.newsletterTitle}</h2>
            <p className="text-gray-600 mb-8">{texts.newsletterDescription}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder={texts.emailPlaceholder}
                className="flex-1 px-6 py-3 rounded-lg border-2 border-gray-200 focus:border-[#14b8a6] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap"
              >
                {texts.subscribe}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

