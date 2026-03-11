"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";

type SlideLanguages = "tr" | "en" | "ru" | "ar";

type SlideItem = {
  image: string;
  texts: Record<SlideLanguages, { title: string; description: string }>;
};

// Turkish slides (default)
const turkishSlides: SlideItem[] = [
  {
    image: "/images/1.jpg",
    texts: {
      tr: {
        title: "Evde Sağlık Ekiplerimiz",
        description: "Sertifikalı hemşire kadromuzla her yerde yanınızdayız.",
      },
      en: {
        title: "In-Home Care Teams",
        description: "Certified nurses providing wherever-you-are support.",
      },
      ru: {
        title: "Команды домашнего ухода",
        description: "Наши сертифицированные медсёстры рядом с вами в любом районе.",
      },
      ar: {
        title: "فرق الرعاية المنزلية",
        description: "ممرضات معتمدات إلى جوارك أينما كنت في المدينة.",
      },
    },
  },
  {
    image: "/images/2.jpg",
    texts: {
      tr: {
        title: "Laboratuvar Destekleri",
        description: "Kan alma ve hızlı sonuç süreçleri için mobil ekipmanlarımız.",
      },
      en: {
        title: "Laboratory Support",
        description: "Mobile equipment for blood draw and rapid lab results.",
      },
      ru: {
        title: "Лабораторная поддержка",
        description: "Мобильное оборудование для забора крови и быстрых результатов.",
      },
      ar: {
        title: "دعم مختبر متنقل",
        description: "معدات متنقلة لسحب العينات والحصول على نتائج سريعة.",
      },
    },
  },
  {
    image: "/images/3.jpg",
    texts: {
      tr: {
        title: "Evde Rehabilitasyon",
        description: "Fizik tedavi desteğiyle hareket özgürlüğünüzü geri kazanın.",
      },
      en: {
        title: "Home Rehabilitation",
        description: "Restore mobility with tailored physical therapy support.",
      },
      ru: {
        title: "Домашняя реабилитация",
        description: "Верните подвижность с помощью индивидуальной физиотерапии дома.",
      },
      ar: {
        title: "إعادة التأهيل في المنزل",
        description: "استعد نشاطك مع جلسات علاج طبيعي مخصصة في منزلك.",
      },
    },
  },
];

// English slides
const englishSlides: SlideItem[] = [
  {
    image: "/images/en/IMG-20251119-WA0043.jpg",
    texts: {
      tr: {
        title: "Evde Sağlık Ekiplerimiz",
        description: "Sertifikalı hemşire kadromuzla her yerde yanınızdayız.",
      },
      en: {
        title: "In-Home Care Teams",
        description: "Certified nurses providing wherever-you-are support.",
      },
      ru: {
        title: "Команды домашнего ухода",
        description: "Наши сертифицированные медсёстры рядом с вами в любом районе.",
      },
      ar: {
        title: "فرق الرعاية المنزلية",
        description: "ممرضات معتمدات إلى جوارك أينما كنت في المدينة.",
      },
    },
  },
  {
    image: "/images/en/IMG-20251119-WA0047.jpg",
    texts: {
      tr: {
        title: "Laboratuvar Destekleri",
        description: "Kan alma ve hızlı sonuç süreçleri için mobil ekipmanlarımız.",
      },
      en: {
        title: "Laboratory Support",
        description: "Mobile equipment for blood draw and rapid lab results.",
      },
      ru: {
        title: "Лабораторная поддержка",
        description: "Мобильное оборудование для забора крови и быстрых результатов.",
      },
      ar: {
        title: "دعم مختبر متنقل",
        description: "معدات متنقلة لسحب العينات والحصول على نتائج سريعة.",
      },
    },
  },
  {
    image: "/images/en/IMG-20251119-WA0037.jpg",
    texts: {
      tr: {
        title: "Evde Rehabilitasyon",
        description: "Fizik tedavi desteğiyle hareket özgürlüğünüzü geri kazanın.",
      },
      en: {
        title: "Home Rehabilitation",
        description: "Restore mobility with tailored physical therapy support.",
      },
      ru: {
        title: "Домашняя реабилитация",
        description: "Верните подвижность с помощью индивидуальной физиотерапии дома.",
      },
      ar: {
        title: "إعادة التأهيل في المنزل",
        description: "استعد نشاطك مع جلسات علاج طبيعي مخصصة في منزلك.",
      },
    },
  },
];

// Russian slides
const russianSlides: SlideItem[] = [
  {
    image: "/images/ru/IMG-20251119-WA0021.jpg",
    texts: {
      tr: {
        title: "Evde Sağlık Ekiplerimiz",
        description: "Sertifikalı hemşire kadromuzla her yerde yanınızdayız.",
      },
      en: {
        title: "In-Home Care Teams",
        description: "Certified nurses providing wherever-you-are support.",
      },
      ru: {
        title: "Команды домашнего ухода",
        description: "Наши сертифицированные медсёстры рядом с вами в любом районе.",
      },
      ar: {
        title: "فرق الرعاية المنزلية",
        description: "ممرضات معتمدات إلى جوارك أينما كنت في المدينة.",
      },
    },
  },
  {
    image: "/images/ru/IMG-20251119-WA0017.jpg",
    texts: {
      tr: {
        title: "Laboratuvar Destekleri",
        description: "Kan alma ve hızlı sonuç süreçleri için mobil ekipmanlarımız.",
      },
      en: {
        title: "Laboratory Support",
        description: "Mobile equipment for blood draw and rapid lab results.",
      },
      ru: {
        title: "Лабораторная поддержка",
        description: "Мобильное оборудование для забора крови и быстрых результатов.",
      },
      ar: {
        title: "دعم مختبر متنقل",
        description: "معدات متنقلة لسحب العينات والحصول على نتائج سريعة.",
      },
    },
  },
  {
    image: "/images/ru/IMG-20251119-WA0023.jpg",
    texts: {
      tr: {
        title: "Evde Rehabilitasyon",
        description: "Fizik tedavi desteğiyle hareket özgürlüğünüzü geri kazanın.",
      },
      en: {
        title: "Home Rehabilitation",
        description: "Restore mobility with tailored physical therapy support.",
      },
      ru: {
        title: "Домашняя реабилитация",
        description: "Верните подвижность с помощью индивидуальной физиотерапии дома.",
      },
      ar: {
        title: "إعادة التأهيل في المنزل",
        description: "استعد نشاطك مع جلسات علاج طبيعي مخصصة في منزلك.",
      },
    },
  },
];

// Arabic slides
const arabicSlides: SlideItem[] = [
  {
    image: "/images/ar/IMG-20251117-WA0051.jpg",
    texts: {
      tr: {
        title: "Evde Sağlık Ekiplerimiz",
        description: "Sertifikalı hemşire kadromuzla her yerde yanınızdayız.",
      },
      en: {
        title: "In-Home Care Teams",
        description: "Certified nurses providing wherever-you-are support.",
      },
      ru: {
        title: "Команды домашнего ухода",
        description: "Наши сертифицированные медсёстры рядом с вами в любом районе.",
      },
      ar: {
        title: "فرق الرعاية المنزلية",
        description: "ممرضات معتمدات إلى جوارك أينما كنت في المدينة.",
      },
    },
  },
  {
    image: "/images/ar/IMG-20251117-WA0049.jpg",
    texts: {
      tr: {
        title: "Laboratuvar Destekleri",
        description: "Kan alma ve hızlı sonuç süreçleri için mobil ekipmanlarımız.",
      },
      en: {
        title: "Laboratory Support",
        description: "Mobile equipment for blood draw and rapid lab results.",
      },
      ru: {
        title: "Лабораторная поддержка",
        description: "Мобильное оборудование для забора крови и быстрых результатов.",
      },
      ar: {
        title: "دعم مختبر متنقل",
        description: "معدات متنقلة لسحب العينات والحصول على نتائج سريعة.",
      },
    },
  },
  {
    image: "/images/ar/IMG-20251117-WA0046.jpg",
    texts: {
      tr: {
        title: "Evde Rehabilitasyon",
        description: "Fizik tedavi desteğiyle hareket özgürlüğünüzü geri kazanın.",
      },
      en: {
        title: "Home Rehabilitation",
        description: "Restore mobility with tailored physical therapy support.",
      },
      ru: {
        title: "Домашняя реабилитация",
        description: "Верните подвижность с помощью индивидуальной физиотерапии дома.",
      },
      ar: {
        title: "إعادة التأهيل في المنزل",
        description: "استعد نشاطك مع جلسات علاج طبيعي مخصصة في منزلك.",
      },
    },
  },
];

const statIcons = [
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.383 2.459a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.538 1.118l-3.383-2.459a1 1 0 00-1.175 0l-3.383 2.459c-.783.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.997 9.393c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.966z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h4l3 12h8l3-8H9" />
    </svg>
  ),
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { language } = useLanguage();

  // Select slides based on language
  const slides = useMemo(() => {
    if (language === "en") {
      return englishSlides;
    } else if (language === "ru") {
      return russianSlides;
    } else if (language === "ar") {
      return arabicSlides;
    }
    return turkishSlides;
  }, [language]);

  useEffect(() => {
    setCurrentSlide(0); // Reset to first slide when language changes
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const heroTexts = {
    tr: {
      badge: "✓ Sertifikalı Uzman Kadro",
      titleLine1: "Nova Sağlık Hizmetleri",
      titleLine2: "7/24 Evde Sağlık Hizmeti",
      description: "Serum takma, enjeksiyon, hemşirelik hizmetleri ve daha fazlası. Uzman hemşirelerimizle evinizdeyiz.",
      pricingBullet: "Bütçe dostu hizmet · Şeffaf ve erişilebilir fiyatlandırma",
      ctaPrimary: "Hemen Randevu Al",
      stats: [
        { value: "10+", label: "YIL DENEYİM" },
        { value: "500+", label: "MEMNUN HASTA" },
        { value: "15", label: "UZMAN HEMŞİRE" },
      ],
    },
    en: {
      badge: "✓ Certified Expert Team",
      titleLine1: "24/7 In-Home",
      titleLine2: "Healthcare Service",
      description: "IV therapy, injections, nursing services and more delivered by our expert nurses at your home.",
      pricingBullet: "Budget-friendly service · Transparent and accessible pricing",
      ctaPrimary: "Book Appointment",
      stats: [
        { value: "10+", label: "YEARS EXPERIENCE" },
        { value: "500+", label: "HAPPY PATIENTS" },
        { value: "15", label: "SPECIALIST NURSES" },
      ],
    },
    ru: {
      badge: "✓ Сертифицированная команда",
      titleLine1: "24/7 Домашнее",
      titleLine2: "Медицинское обслуживание",
      description: "Внутривенные вливания, инъекции, уход медсестры и многое другое прямо у вас дома.",
      pricingBullet: "Доступные решения · Прозрачное ценообразование",
      ctaPrimary: "Записаться сейчас",
      stats: [
        { value: "10+", label: "ЛЕТ ОПЫТА" },
        { value: "500+", label: "ДОВОЛЬНЫХ ПАЦИЕНТОВ" },
        { value: "15", label: "СПЕЦИАЛИСТОВ-МЕДСЁСТЕР" },
      ],
    },
    ar: {
      badge: "✓ فريق تمريضي معتمد",
      titleLine1: "رعاية صحية منزلية",
      titleLine2: "على مدار 24/7",
      description: "خدمات المحاليل والحقن والتمريض وغيرها نقدمها لك في منزلك براحة وأمان.",
      pricingBullet: "خدمة ميسورة · تسعير واضح ومتاح للجميع",
      ctaPrimary: "احجز موعدك الآن",
      stats: [
        { value: "10+", label: "سنوات الخبرة" },
        { value: "500+", label: "مرضى راضون" },
        { value: "15", label: "ممرضات متخصصات" },
      ],
    },
  }[language];

  const slideText = slides[currentSlide].texts[language];

  return (
    <section className="relative overflow-hidden bg-[#071529] text-white">
      <div className="absolute inset-0 medical-pattern opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-32 w-80 h-80 bg-[#14b8a6]/10 blur-3xl rounded-full"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#215d8c]/20 blur-3xl rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <span className="medical-badge inline-flex items-center gap-2 animate-pulse bg-white/10 border-white/30 text-white">
              {heroTexts.badge}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-lg">
              {heroTexts.titleLine1}
              <span className="block text-[#14b8a6]">{heroTexts.titleLine2}</span>
            </h1>
            <p className="text-base md:text-lg text-gray-200 leading-relaxed">
              {heroTexts.description}
            </p>
            <p className="text-sm md:text-base text-emerald-200 font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {heroTexts.pricingBullet}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full max-w-lg">
              <a href="/randevu" className="btn-medical text-center px-10 py-4 text-base md:text-lg shadow-xl w-full">
                <span className="flex items-center justify-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {heroTexts.ctaPrimary}
                </span>
              </a>
              <a
                href="tel:+905334866111"
                className="bg-white text-[#1e3a5f] px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all shadow-lg flex items-center justify-center gap-3 text-base md:text-lg w-full whitespace-nowrap"
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="whitespace-nowrap">+90 533 486 61 11</span>
              </a>
            </div>
          </div>

          {/* Right Slider */}
          <div className="relative w-full md:w-auto rounded-none md:rounded-[32px] bg-transparent md:bg-black/20 border border-transparent md:border-white/10 shadow-2xl overflow-hidden -mx-4 md:mx-0">
            <div className="relative h-[420px] sm:h-[460px] md:h-[420px] lg:h-[460px] w-full bg-black/10">
              <Image
                key={`${language}-${currentSlide}`}
                src={slides[currentSlide].image}
                alt={slideText.title}
                fill
                className="object-contain transition-opacity duration-700"
                sizes="100vw"
                priority
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

              <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
                <button
                  onClick={prevSlide}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors border border-white/30"
                  aria-label="Önceki görsel"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="pointer-events-auto w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors border border-white/30"
                  aria-label="Sonraki görsel"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${currentSlide === index ? "w-8 bg-[#14b8a6]" : "w-4 bg-white/40"}`}
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white text-[#0b1a2d]">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {heroTexts.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="module-card module-fade-up"
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                <div className="p-6 md:p-7">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#14b8a6]/10 text-[#14b8a6] flex items-center justify-center">
                        {statIcons[index % statIcons.length]}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
                        Nova
                      </span>
                    </div>
                    <div className="flex gap-1 opacity-70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#14b8a6]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]"></span>
                    </div>
                  </div>
                  <div className="text-4xl md:text-5xl font-extrabold leading-none tracking-tight mb-1 text-[#0b1a2d]">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm font-semibold tracking-[0.3em] text-gray-500">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

