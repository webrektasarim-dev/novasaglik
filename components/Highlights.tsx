"use client";

import { useEffect, useState, type TouchEvent } from "react";
import Image, { StaticImageData } from "next/image";
import img4 from "@/images/4.jpg";
import img4_2 from "@/images/4-2.jpg";
import img5 from "@/images/5.jpg";
import img5_2 from "@/images/5-2.jpg";
import img6 from "@/images/6.jpg";
import img6_2 from "@/images/6-2.jpg";
import img7 from "@/images/7.jpg";
import img7_2 from "@/images/7-2.jpg";
import img8 from "@/images/8.jpg";
import img8_2 from "@/images/8-2.jpg";
import img9 from "@/images/9.jpg";
import img9_2 from "@/images/9-2.jpg";
import img10 from "@/images/10.jpg";
import img10_2 from "@/images/10-2.jpg";
import img11 from "@/images/11.jpg";
import img11_2 from "@/images/11-2.jpg";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const highlightSlides: StaticImageData[][] = [
  [img4, img4_2, img5, img5_2],
  [img6, img6_2, img7, img7_2],
  [img8, img8_2, img9, img9_2],
  [img10, img10_2, img11, img11_2],
];

export default function Highlights() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { language } = useLanguage();
  const swipeThreshold = 50;
  const slideCount = highlightSlides.length;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

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

