"use client";

import { useEffect, useState, useMemo, type TouchEvent } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Default Turkish images
const defaultImages = [
  "/images/4.jpg",
  "/images/4-2.jpg",
  "/images/5.jpg",
  "/images/5-2.jpg",
  "/images/6.jpg",
  "/images/6-2.jpg",
  "/images/7.jpg",
  "/images/7-2.jpg",
  "/images/8.jpg",
  "/images/8-2.jpg",
  "/images/9.jpg",
  "/images/9-2.jpg",
  "/images/10.jpg",
  "/images/10-2.jpg",
  "/images/11.jpg",
  "/images/11-2.jpg",
  "/images/IMG-20251121-WA0001.jpg",
  "/images/IMG-20251121-WA0003.jpg",
  "/images/IMG-20251121-WA0004.jpg",
  "/images/IMG-20251121-WA0010.jpg",
];

// English images
const englishImages = [
  "/images/en/IMG-20251119-WA0032.jpg",
  "/images/en/IMG-20251119-WA0033.jpg",
  "/images/en/IMG-20251119-WA0034.jpg",
  "/images/en/IMG-20251119-WA0035.jpg",
  "/images/en/IMG-20251119-WA0036.jpg",
  "/images/en/IMG-20251119-WA0037.jpg",
  "/images/en/IMG-20251119-WA0038.jpg",
  "/images/en/IMG-20251119-WA0039.jpg",
  "/images/en/IMG-20251119-WA0040.jpg",
  "/images/en/IMG-20251119-WA0041.jpg",
  "/images/en/IMG-20251119-WA0042.jpg",
  "/images/en/IMG-20251119-WA0043.jpg",
  "/images/en/IMG-20251119-WA0044.jpg",
  "/images/en/IMG-20251119-WA0045.jpg",
  "/images/en/IMG-20251119-WA0046.jpg",
  "/images/en/IMG-20251119-WA0047.jpg",
  "/images/en/IMG-20251119-WA0048.jpg",
  "/images/en/IMG-20251119-WA0049.jpg",
  "/images/en/IMG-20251119-WA0050.jpg",
  "/images/en/IMG-20251121-WA0005.jpg",
  "/images/en/IMG-20251121-WA0007.jpg",
  "/images/en/IMG-20251121-WA0008.jpg",
  "/images/en/IMG-20251121-WA0014.jpg",
];

// Russian images
const russianImages = [
  "/images/ru/IMG-20251119-WA0011.jpg",
  "/images/ru/IMG-20251119-WA0012.jpg",
  "/images/ru/IMG-20251119-WA0013.jpg",
  "/images/ru/IMG-20251119-WA0014.jpg",
  "/images/ru/IMG-20251119-WA0015.jpg",
  "/images/ru/IMG-20251119-WA0016.jpg",
  "/images/ru/IMG-20251119-WA0017.jpg",
  "/images/ru/IMG-20251119-WA0018.jpg",
  "/images/ru/IMG-20251119-WA0019.jpg",
  "/images/ru/IMG-20251119-WA0020.jpg",
  "/images/ru/IMG-20251119-WA0021.jpg",
  "/images/ru/IMG-20251119-WA0022.jpg",
  "/images/ru/IMG-20251119-WA0023.jpg",
  "/images/ru/IMG-20251119-WA0024.jpg",
  "/images/ru/IMG-20251119-WA0025.jpg",
  "/images/ru/IMG-20251119-WA0026.jpg",
  "/images/ru/IMG-20251119-WA0027.jpg",
  "/images/ru/IMG-20251119-WA0028.jpg",
  "/images/ru/IMG-20251119-WA0029.jpg",
  "/images/ru/IMG-20251121-WA0002.jpg",
  "/images/ru/IMG-20251121-WA0013.jpg",
  "/images/ru/IMG-20251121-WA0015.jpg",
];

// Arabic images
const arabicImages = [
  "/images/ar/IMG-20251117-WA0043.jpg",
  "/images/ar/IMG-20251117-WA0044.jpg",
  "/images/ar/IMG-20251117-WA0045.jpg",
  "/images/ar/IMG-20251117-WA0046.jpg",
  "/images/ar/IMG-20251117-WA0047.jpg",
  "/images/ar/IMG-20251117-WA0048.jpg",
  "/images/ar/IMG-20251117-WA0049.jpg",
  "/images/ar/IMG-20251117-WA0050.jpg",
  "/images/ar/IMG-20251117-WA0051.jpg",
  "/images/ar/IMG-20251117-WA0052.jpg",
  "/images/ar/IMG-20251117-WA0053.jpg",
  "/images/ar/IMG-20251117-WA0054.jpg",
  "/images/ar/IMG-20251117-WA0055.jpg",
  "/images/ar/IMG-20251117-WA0056.jpg",
  "/images/ar/IMG-20251117-WA0057.jpg",
  "/images/ar/IMG-20251117-WA0058.jpg",
  "/images/ar/IMG-20251117-WA0059.jpg",
  "/images/ar/IMG-20251117-WA0060.jpg",
  "/images/ar/IMG-20251121-WA0006.jpg",
  "/images/ar/IMG-20251121-WA0009.jpg",
  "/images/ar/IMG-20251121-WA0011.jpg",
  "/images/ar/IMG-20251121-WA0012.jpg",
];

export default function Highlights() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { language } = useLanguage();
  const swipeThreshold = 50;

  // Select images based on language
  const selectedImages = useMemo(() => {
    if (language === "en") {
      return englishImages;
    } else if (language === "ru") {
      return russianImages;
    } else if (language === "ar") {
      return arabicImages;
    }
    return defaultImages;
  }, [language]);

  // Group images into slides (4 images per slide)
  const highlightSlides = useMemo(() => {
    const slides: string[][] = [];
    for (let i = 0; i < selectedImages.length; i += 4) {
      slides.push(selectedImages.slice(i, i + 4));
    }
    return slides;
  }, [selectedImages]);

  const slideCount = highlightSlides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  useEffect(() => {
    setCurrentSlide(0); // Reset to first slide when language changes
  }, [language]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideCount]);

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart === null || touchEnd === null) return;
    const distance = touchStart - touchEnd;

    if (distance > swipeThreshold) {
      nextSlide();
    } else if (distance < -swipeThreshold) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section ref={ref} className={`py-12 md:py-16 ${isVisible ? 'scroll-animate-left visible' : 'scroll-animate-left'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <span className="medical-badge mb-3 inline-block">Nova Sağlık</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            {language === "en"
              ? "Always By Your Side"
              : language === "ru"
              ? "Всегда рядом с вами"
              : language === "ar"
              ? "نحن معك دائمًا"
              : "Her Daim Yanınızda"}
          </h2>
        </div>

        <div
          className="relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {highlightSlides.map((images, index) => (
              <div key={index} className="w-full flex-shrink-0 px-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {images.map((imageSrc, innerIndex) => (
                    <div
                      key={innerIndex}
                      className="relative overflow-hidden rounded-2xl shadow-lg border border-white/40 bg-white/80 min-h-[220px] sm:min-h-[260px] flex items-center justify-center p-4"
                    >
                      <div className="relative w-full h-[220px] sm:h-[260px]">
                        <Image
                          src={imageSrc}
                          alt="Nova Sağlık"
                          fill
                          className="object-contain"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority={index === 0 && innerIndex === 0}
                          unoptimized
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 mt-6">
          {highlightSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                currentSlide === index ? "w-10 bg-[#14b8a6]" : "w-4 bg-gray-300"
              }`}
              aria-label={`Görsel ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

