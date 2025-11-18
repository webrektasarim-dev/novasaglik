"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import serumImage from "@/images/serum.png";
import enjeksiyonImage from "@/images/enjeksiyon.png";
import hemsireImage from "@/images/hemsire.png";
import heroImage from "@/images/hero.png";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServiceContent {
  title: string;
  slug: string;
  description: string;
  image: any;
}

function ServiceCard({
  service,
  index,
  detailLabel,
}: {
  service: ServiceContent;
  index: number;
  detailLabel: string;
}) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const animationClass = index % 2 === 0 ? 'scroll-card-left' : 'scroll-card-right';
  const visibleClass = isVisible ? 'visible' : '';
  
  return (
    <div
      ref={ref}
      className={`${animationClass} ${visibleClass} module-fade-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <Link
        href={`/hizmetler/${service.slug}`}
        className="relative overflow-hidden rounded-xl shadow-lg card-hover-lift cursor-pointer group h-full min-h-[280px] sm:min-h-[300px] block"
      >
      {/* Full Card Image */}
      <div className="absolute inset-0">
        <Image
          src={service.image}
          alt={service.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/70 transition-all duration-300"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-4 text-white">
        <h3 className="text-xl font-bold mb-2 drop-shadow-lg">
          {service.title}
        </h3>
        <p className="text-gray-200 text-xs mb-3 leading-relaxed drop-shadow">
          {service.description}
        </p>
        <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
          <span>{detailLabel}</span>
          <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
    </div>
  );
}

export default function Services() {
  const { language } = useLanguage();

  const servicesContent: Record<"tr" | "en" | "ru" | "ar", { title: string; detail: string; cards: ServiceContent[] }> = {
    tr: {
      title: "Hizmetlerimiz",
      detail: "Detaylı Bilgi",
      cards: [
        {
          title: "Serum Takma",
          slug: "serum-takma",
          description: "Serum takma, enjeksiyon uygulamaları",
          image: serumImage,
        },
        {
          title: "Enjeksiyon",
          slug: "enjeksiyon",
          description: "Hemşirelik hizmetleri ile enjeksiyon",
          image: enjeksiyonImage,
        },
        {
          title: "Hemşirelik Hizmeti",
          slug: "hemsirelik-hizmeti",
          description: "Hemşirelik hizmetleri uzmanından",
          image: hemsireImage,
        },
      ],
    },
    en: {
      title: "Our Services",
      detail: "See Details",
      cards: [
        {
          title: "IV Therapy",
          slug: "serum-takma",
          description: "Professional IV and injection applications at home.",
          image: serumImage,
        },
        {
          title: "Injection Care",
          slug: "enjeksiyon",
          description: "Safe injections applied by licensed nurses.",
          image: enjeksiyonImage,
        },
        {
          title: "Nursing Support",
          slug: "hemsirelik-hizmeti",
          description: "Personalised nursing services from our experts.",
          image: hemsireImage,
        },
      ],
    },
    ru: {
      title: "Наши услуги",
      detail: "Подробнее",
      cards: [
        {
          title: "Внутривенная терапия",
          slug: "serum-takma",
          description: "Капельницы и инъекции у вас дома.",
          image: serumImage,
        },
        {
          title: "Инъекции",
          slug: "enjeksiyon",
          description: "Безопасные уколы, выполняемые лицензированными медсёстрами.",
          image: enjeksiyonImage,
        },
        {
          title: "Сестринский уход",
          slug: "hemsirelik-hizmeti",
          description: "Персональный уход от опытных специалистов.",
          image: hemsireImage,
        },
      ],
    },
    ar: {
      title: "خدماتنا",
      detail: "المزيد من التفاصيل",
      cards: [
        {
          title: "العلاج الوريدي",
          slug: "serum-takma",
          description: "محاليل وعلاجات وريدية ومتابعة داخل منزلك.",
          image: serumImage,
        },
        {
          title: "خدمات الحقن",
          slug: "enjeksiyon",
          description: "جميع أنواع الحقن يقدمها فريق تمريضي معتمد.",
          image: enjeksiyonImage,
        },
        {
          title: "الرعاية التمريضية",
          slug: "hemsirelik-hizmeti",
          description: "رعاية شاملة وشخصية يقدمها كادرنا المتمرس.",
          image: hemsireImage,
        },
      ],
    },
  };

  const currentContent = servicesContent[language];

  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  return (
    <section id="hizmetler" ref={ref} className={isVisible ? 'scroll-animate-left visible' : 'scroll-animate-left'}>
      <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">
        {currentContent.title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        {currentContent.cards.map((service, index) => (
          <ServiceCard key={service.slug} service={service} index={index} detailLabel={currentContent.detail} />
        ))}
      </div>
    </section>
  );
}

