import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Hizmetlerimiz - Evde Sağlık Hizmetleri | Nova Sağlık",
  description: "Serum takma, enjeksiyon, hemşirelik hizmetleri, yaşlı bakımı, yara bakımı, tıbbi cihaz kullanımı ve daha fazlası. Uzman hemşirelerimizle evinizde profesyonel sağlık hizmeti.",
  openGraph: {
    title: "Hizmetlerimiz - Nova Sağlık Hizmetleri",
    description: "Evde sağlık hizmetleri: Serum takma, enjeksiyon, hemşirelik ve hasta bakımı",
    url: 'https://novasaglik.com/hizmetler',
  },
};

export default function HizmetlerPage() {
  const services = [
    {
      title: "Serum Takma",
      icon: "💉",
      description: "Evde serum tedavisi hizmetimiz ile rahatlığınızı bozmadan tedavinizi sürdürün.",
      details: [
        "IV (intravenöz) serum uygulaması",
        "Vitamin ve mineral desteği",
        "Antibiyotik tedavisi",
        "Sıvı elektrolit dengesi",
        "Günlük veya haftalık tedavi programları"
      ],
      pricing: "Hizmet başına ücretlendirme"
    },
    {
      title: "Enjeksiyon Hizmeti",
      icon: "💊",
      description: "Her türlü enjeksiyon uygulaması için uzman hemşire desteği.",
      details: [
        "İntramüsküler (kas içi) enjeksiyon",
        "Subkutan (deri altı) enjeksiyon",
        "İnsülin enjeksiyonu ve eğitimi",
        "Aşı uygulamaları",
        "Antikoagülan ilaç enjeksiyonları"
      ],
      pricing: "Uygun fiyat garantisi"
    },
    {
      title: "Hemşirelik Hizmetleri",
      icon: "👨‍⚕️",
      description: "Deneyimli ve sertifikalı hemşirelerimizle kapsamlı bakım hizmeti.",
      details: [
        "Yaşlı hasta bakımı",
        "Kronik hastalık takibi",
        "Medikal cihaz kullanımı",
        "Vital bulgu takibi (tansiyon, nabız, ateş)",
        "İlaç takibi ve hatırlatma"
      ],
      pricing: "Saatlik veya günlük paketler"
    },
    {
      title: "Yara Bakımı",
      icon: "🩹",
      description: "Profesyonel yara bakımı ve pansuman hizmetleri.",
      details: [
        "Cerrahi yara bakımı",
        "Bası yarası tedavisi ve önleme",
        "Diyabetik yara bakımı",
        "Yanık bakımı",
        "Steril pansuman uygulamaları"
      ],
      pricing: "Yara durumuna göre"
    },
    {
      title: "Sonda ve Kateter Bakımı",
      icon: "🔬",
      description: "Nazogastrik sonda, idrar sondası ve kateter bakım hizmetleri.",
      details: [
        "Nazogastrik sonda takılması ve bakımı",
        "Foley sonda (idrar sondası) bakımı",
        "PEG (gastrostomi) bakımı",
        "Sonda değişimi",
        "Enfeksiyon kontrolü"
      ],
      pricing: "İşlem başına"
    },
    {
      title: "Tansiyon ve Şeker Ölçümü",
      icon: "📊",
      description: "Düzenli vital bulgu takibi ve raporlama hizmeti.",
      details: [
        "Kan basıncı ölçümü ve takibi",
        "Kan şekeri ölçümü",
        "Nabız ve oksijen saturasyonu",
        "Ateş takibi",
        "Detaylı raporlama"
      ],
      pricing: "Paket fiyatları mevcut"
    },
    {
      title: "Taburcu Sonrası Bakım",
      icon: "🏥",
      description: "Hastaneden taburcu sonrası evde profesyonel bakım hizmeti.",
      details: [
        "Ameliyat sonrası bakım",
        "İyileşme sürecinin takibi",
        "İlaç yönetimi",
        "Komplikasyon önleme",
        "Hekim ile koordinasyon"
      ],
      pricing: "Özel paketler"
    },
    {
      title: "Yaşlı Bakımı",
      icon: "👴",
      description: "Yaşlı hastalarınız için özel bakım ve refakatçi hizmeti.",
      details: [
        "Günlük yaşam aktiviteleri desteği",
        "Hijyen ve temizlik yardımı",
        "Beslenme yardımı",
        "Mobilizasyon desteği",
        "Sosyal aktivite eşliği"
      ],
      pricing: "8/12/24 saatlik paketler"
    },
    {
      title: "Fizik Tedavi Desteği",
      icon: "🤸",
      description: "Evde fizik tedavi egzersizleri ve rehabilitasyon desteği.",
      details: [
        "Hareket kısıtlılığı egzersizleri",
        "Denge ve koordinasyon çalışmaları",
        "Eklem hareketleri",
        "Kas güçlendirme",
        "Post-operatif rehabilitasyon"
      ],
      pricing: "Seans bazlı"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Profesyonel Evde Sağlık Hizmetleri
            </h1>
            <p className="text-xl text-gray-200">
              Uzman hemşirelerimizle evinizin konforunda en kaliteli sağlık hizmetini alın. 
              7/24 hizmetinizde, güvenilir ve uygun fiyatlı.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-100 rounded-xl p-8 hover:border-[#14b8a6] hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  {service.title}
                </h2>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Hizmet Detayları:</h3>
                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <svg className="w-5 h-5 text-[#14b8a6] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-[#14b8a6] font-semibold">{service.pricing}</p>
                  <a
                    href="/iletisim"
                    className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-6 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth={2} />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    Randevu Al
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Nova Sağlık'ı Neden Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600">
              Sağlığınız için en iyi hizmeti sunmak amacıyla çalışıyoruz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-gray-800 mb-2">Sertifikalı Hemşireler</h3>
              <p className="text-gray-600 text-sm">Deneyimli ve lisanslı sağlık profesyonelleri</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🕐</div>
              <h3 className="font-bold text-gray-800 mb-2">7/24 Hizmet</h3>
              <p className="text-gray-600 text-sm">Haftanın her günü, günün her saati</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="font-bold text-gray-800 mb-2">Uygun Fiyat</h3>
              <p className="text-gray-600 text-sm">Şeffaf ve rekabetçi fiyatlandırma</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-4xl mb-3">🏠</div>
              <h3 className="font-bold text-gray-800 mb-2">Evde Konfor</h3>
              <p className="text-gray-600 text-sm">Kendi ortamınızda hizmet</p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}

