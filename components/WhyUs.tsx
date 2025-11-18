"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const { language } = useLanguage();

  const baseIcons = [
    (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  ];

  const content = {
    tr: {
      title: "Neden Nova Sağlık?",
      description: "Sağlığınız için en iyi hizmeti sunmak amacıyla, deneyimli ekibimiz ve modern yaklaşımımızla yanınızdayız",
      features: [
        { title: "Güvenilir Hizmet", description: "Sertifikalı ve deneyimli uzman hemşireler" },
        { title: "7/24 Hizmet", description: "Her an yanınızda, kesintisiz destek" },
        { title: "Evde Hizmet", description: "Konforlu ortamınızda sağlık hizmeti" },
        { title: "Bütçe Dostu", description: "Şeffaf ve erişilebilir fiyatlandırma" },
      ],
    },
    en: {
      title: "Why Nova Sağlık?",
      description: "We combine our experienced team and modern approach to deliver the most reliable healthcare wherever you need it.",
      features: [
        { title: "Trusted Care", description: "Certified and experienced professional nurses" },
        { title: "24/7 Availability", description: "Continuous support whenever you need us" },
        { title: "In-Home Service", description: "Healthcare in the comfort of your home" },
        { title: "Budget Friendly", description: "Transparent and accessible pricing" },
      ],
    },
    ru: {
      title: "Почему Nova Sağlık?",
      description: "Мы объединяем опытную команду и современный подход, чтобы обеспечить вам максимально надежную помощь.",
      features: [
        { title: "Надёжный уход", description: "Сертифицированные и опытные медсёстры" },
        { title: "24/7 на связи", description: "Поддержка в любое время дня и ночи" },
        { title: "Услуги дома", description: "Лечение в комфорте вашей квартиры" },
        { title: "Доступные цены", description: "Прозрачное и понятное ценообразование" },
      ],
    },
    ar: {
      title: "لماذا نوفا الصحية؟",
      description: "نجمع بين خبرة فريقنا ونهجنا الحديث لنقدم لكم رعاية موثوقة أينما كنتم.",
      features: [
        { title: "رعاية موثوقة", description: "ممرضات وممرضون معتمدون وذو خبرة" },
        { title: "متاحون دائمًا", description: "دعم مستمر على مدار الساعة" },
        { title: "خدمة منزلية", description: "رعاية صحية في راحة منزلك" },
        { title: "تسعير شفاف", description: "خطط تناسب ميزانيتك وتكاليف واضحة" },
      ],
    },
  }[language];

  return (
    <section ref={ref} className={`py-10 bg-gray-50 ${isVisible ? 'scroll-animate-right visible' : 'scroll-animate-right'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.features.map((feature, index) => (
            <div
              key={index}
              className="module-card module-fade-up text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="p-6">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-[#14b8a6] to-[#10b981] rounded-xl text-white mb-4 shadow-lg">
                  {baseIcons[index]}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

