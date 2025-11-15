"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const res = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.");
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        alert("Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              İletişim
            </h1>
            <p className="text-xl text-gray-200">
              Sizlere nasıl yardımcı olabiliriz? Sorularınız için bize ulaşın, 
              en kısa sürede size dönüş yapalım.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">
                İletişim Bilgilerimiz
              </h2>
              
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Telefon</h3>
                    <a href="tel:+905334866111" className="text-gray-600 hover:text-[#14b8a6] transition-colors font-semibold">
                      +90 533 486 61 11
                    </a>
                    <p className="text-sm text-gray-500 mt-1">7/24 Destek Hattı</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">WhatsApp</h3>
                    <a href="https://wa.me/905334866111" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#25D366] transition-colors font-semibold">
                      +90 533 486 61 11
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Hızlı mesajlaşma</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">E-posta</h3>
                    <a href="mailto:info@novasaglik.com" className="text-gray-600 hover:text-[#14b8a6] transition-colors font-semibold">
                      info@novasaglik.com
                    </a>
                    <p className="text-sm text-gray-500 mt-1">24 saat içinde yanıt</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Adres</h3>
                    <p className="text-gray-600">
                      Örnek Mahallesi, Sağlık Caddesi<br />
                      No: 123, Kat: 4<br />
                      Beşiktaş / İstanbul
                    </p>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-[#14b8a6] rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">Her Gün 24 Saat</p>
                    <p className="text-sm text-gray-500 mt-1">Kesintisiz hizmet</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-gray-50 p-8 rounded-xl">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Bize Mesaj Gönderin
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                      placeholder="Adınızı ve soyadınızı girin"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                      placeholder="ornek@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-gray-700 font-semibold mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                      placeholder="05XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-gray-700 font-semibold mb-2">
                      Konu *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none"
                    >
                      <option value="">Konu seçiniz</option>
                      <option value="randevu">Randevu Talebi</option>
                      <option value="bilgi">Bilgi Almak İstiyorum</option>
                      <option value="fiyat">Fiyat Teklifi</option>
                      <option value="sikayet">Şikayet/Öneri</option>
                      <option value="diger">Diğer</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-gray-700 font-semibold mb-2">
                      Mesajınız *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#14b8a6] focus:outline-none resize-none"
                      placeholder="Mesajınızı buraya yazın..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#14b8a6] hover:bg-[#0d9488] text-white py-4 rounded-lg font-semibold transition-colors text-lg"
                  >
                    Mesajı Gönder
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Ofis Konumumuz
          </h2>
          <div className="h-96 bg-gray-300 rounded-xl overflow-hidden">
            {/* Buraya Google Maps iframe veya harita entegrasyonu eklenebilir */}
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-[#14b8a6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-lg font-semibold">Beşiktaş / İstanbul</p>
                <p className="text-sm text-gray-500 mt-2">Harita entegrasyonu yakında eklenecek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Sıkça Sorulan Sorular
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Hizmetleriniz hangi bölgeleri kapsıyor?
              </summary>
              <p className="text-gray-600 mt-3">
                İstanbul'un tüm ilçelerine hizmet vermekteyiz. Acil durumlar için 7/24 ulaşılabiliyoruz.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Randevu almak için ne kadar önceden başvurmalıyım?
              </summary>
              <p className="text-gray-600 mt-3">
                Rutin hizmetler için en az 24 saat önceden, acil durumlar için aynı gün randevu alabilirsiniz.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Evde sağlık hizmeti güvenli mi?
              </summary>
              <p className="text-gray-600 mt-3">
                Evet, tüm hemşirelerimiz sertifikalı ve deneyimlidir. Steril ekipman kullanımı ve hijyen kurallarına tam uyum sağlanır. Güvenliğiniz bizim önceliğimizdir.
              </p>
            </details>

            <details className="bg-gray-50 p-6 rounded-lg">
              <summary className="font-semibold text-gray-800 cursor-pointer">
                Hemşireleriniz sertifikalı mı?
              </summary>
              <p className="text-gray-600 mt-3">
                Evet, tüm hemşirelerimiz lisanslı ve sertifikalıdır. Düzenli eğitimlerle kendilerini geliştirmektedirler.
              </p>
            </details>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

