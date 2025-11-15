"use client";

import React from "react";
import Image from "next/image";
import serumImage from "@/images/serum.png";
import enjeksiyonImage from "@/images/enjeksiyon.png";
import hemsireImage from "@/images/hemsire.png";

export default function Services() {
  const services = [
    {
      title: "Serum Takma",
      description: "Serum takma, enjeksiyon uygulamaları",
      image: serumImage,
    },
    {
      title: "Enjeksiyon",
      description: "Hemşirelik hizmetleri ile enjeksiyon",
      image: enjeksiyonImage,
    },
    {
      title: "Hemşirelik Hizmeti",
      description: "Hemşirelik hizmetleri uzmanından",
      image: hemsireImage,
    },
  ];

  return (
    <section id="hizmetler">
      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
        Hizmetlerimiz
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg card-hover-lift cursor-pointer group h-80"
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
            <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
              <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">
                {service.title}
              </h3>
              <p className="text-gray-200 text-sm mb-4 leading-relaxed drop-shadow">
                {service.description}
              </p>
              <div className="flex items-center gap-2 text-white font-semibold group-hover:gap-4 transition-all">
                <span>Detaylı Bilgi</span>
                <svg className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

