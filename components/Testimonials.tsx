"use client";

import React from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  const { language } = useLanguage();

  const content = {
    tr: {
      title: "Müşteri Yorumları",
      description: "Hizmetlerimizden yararlanan hastalarımızın deneyimlerini okuyun",
      items: [
        {
          name: "Ayşe K.",
          location: "İstanbul, Kadıköy",
          rating: 5,
          text: "Annem için serum takma hizmeti aldık. Hemşirelerimiz çok profesyonel ve nazikti. Evde bu kadar kaliteli hizmet alabileceğimizi bilmiyorduk. Kesinlikle tavsiye ederim!",
          service: "Serum Takma",
        },
        {
          name: "Mehmet Y.",
          location: "İstanbul, Şişli",
          rating: 5,
          text: "Yaşlı babam için hemşirelik hizmeti alıyoruz. Haftanın 5 günü geliyorlar ve çok düzenli. Babamın durumu çok daha iyi. Nova Sağlık ekibine teşekkürler.",
          service: "Hemşirelik Hizmetleri",
        },
        {
          name: "Zeynep A.",
          location: "İstanbul, Beşiktaş",
          rating: 5,
          text: "Yara bakımı için başvurduk. Hemşireler çok deneyimli ve yaralar çok hızlı iyileşti. Evde bu kadar profesyonel bakım almak harika bir deneyim.",
          service: "Yara Bakımı",
        },
        {
          name: "Ali R.",
          location: "İstanbul, Bakırköy",
          rating: 5,
          text: "7/24 hizmet verdikleri için çok memnunuz. Gece yarısı bile aradığımızda hemen geliyorlar. Güvenilir ve profesyonel bir ekip.",
          service: "7/24 Hizmet",
        },
      ],
    },
    en: {
      title: "Patient Stories",
      description: "Hear from families who trust our nurses and at-home care services.",
      items: [
        {
          name: "Ayşe K.",
          location: "Kadıköy, Istanbul",
          rating: 5,
          text: "We booked IV therapy for my mother. The nurses were professional and gentle. I never knew we could get such quality care at home!",
          service: "IV Therapy",
        },
        {
          name: "Mehmet Y.",
          location: "Şişli, Istanbul",
          rating: 5,
          text: "We receive nursing support for my elderly father five days a week. He feels much better now. Thank you to the Nova Sağlık team.",
          service: "Nursing Services",
        },
        {
          name: "Zeynep A.",
          location: "Beşiktaş, Istanbul",
          rating: 5,
          text: "We reached out for wound care. The nurses were very experienced and healing was fast. Amazing to have this level of care at home.",
          service: "Wound Care",
        },
        {
          name: "Ali R.",
          location: "Bakırköy, Istanbul",
          rating: 5,
          text: "We love that they are available 24/7. Even late at night they arrive quickly. A trustworthy and professional team.",
          service: "24/7 Support",
        },
      ],
    },
    ru: {
      title: "Отзывы пациентов",
      description: "Истории семей, которые доверяют нашим медсёстрам и домашнему уходу.",
      items: [
        {
          name: "Айше К.",
          location: "Кадыкёй, Стамбул",
          rating: 5,
          text: "Заказывали капельницу для мамы. Медсёстры очень профессиональные и заботливые. Даже не думали, что дома можно получить такой уровень сервиса!",
          service: "Внутривенная терапия",
        },
        {
          name: "Мехмет Й.",
          location: "Шишли, Стамбул",
          rating: 5,
          text: "Получаем сестринскую помощь для моего отца пять дней в неделю. Его состояние заметно улучшилось. Спасибо команде Nova Sağlık.",
          service: "Сестринский уход",
        },
        {
          name: "Зейнеп А.",
          location: "Бешикташ, Стамбул",
          rating: 5,
          text: "Обратились за обработкой ран. Медсёстры очень опытные, заживление прошло быстро. Прекрасно, что такой профессиональный уход доступен дома.",
          service: "Уход за ранами",
        },
        {
          name: "Али Р.",
          location: "Бакыркёй, Стамбул",
          rating: 5,
          text: "Очень удобно, что они доступны 24/7. Даже ночью приезжают оперативно. Надёжная и профессиональная команда.",
          service: "Круглосуточная поддержка",
        },
      ],
    },
    ar: {
      title: "آراء مرضانا",
      description: "قصص حقيقية لعائلات تثق بخدمات التمريض والرعاية المنزلية لدينا.",
      items: [
        {
          name: "عائشة ك.",
          location: "كاديكوي، إسطنبول",
          rating: 5,
          text: "قمنا بحجز جلسة حقن وريد لوالدتي. كانت الممرضات محترفات ولطيفات، ولم نتوقع أن نحصل على خدمة بهذا المستوى في المنزل.",
          service: "العلاج الوريدي",
        },
        {
          name: "محمد ي.",
          location: "شيشلي، إسطنبول",
          rating: 5,
          text: "نحصل على رعاية تمريضية يومية لوالدي المسن. حالته تحسّنت كثيراً بفضل متابعة الفريق. شكراً لفريق نوفا الصحية.",
          service: "الرعاية التمريضية",
        },
        {
          name: "زينب أ.",
          location: "بشكتاش، إسطنبول",
          rating: 5,
          text: "طلبنا خدمة العناية بالجروح. الفريق محترف جداً والتئمت الجروح بسرعة. تجربة مريحة وآمنة في المنزل.",
          service: "العناية بالجروح",
        },
        {
          name: "علي ر.",
          location: "بكيركوي، إسطنبول",
          rating: 5,
          text: "ما يعجبنا هو توافرهم على مدار الساعة. حتى عند الاتصال ليلاً يصلون بسرعة. فريق موثوق وذو خبرة.",
          service: "دعم 24/7",
        },
      ],
    },
  }[language];

  return (
    <section ref={ref} className={`py-20 bg-white ${isVisible ? 'scroll-animate-right visible' : 'scroll-animate-right'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {content.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {content.items.map((testimonial, index) => (
            <div
              key={index}
              className="module-card module-fade-up"
              style={{ animationDelay: `${index * 0.12}s` }}
            >
              <div className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <p className="font-bold text-gray-800">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                  <span className="bg-[#14b8a6] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {testimonial.service}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

