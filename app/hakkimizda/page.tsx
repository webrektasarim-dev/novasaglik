import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda - Nova Sağlık Hizmetleri Kimdir?",
  description: "Nova Sağlık Hizmetleri olarak 2014'ten beri evde sağlık hizmetleri sunuyoruz. Misyonumuz, vizyonumuz ve değerlerimiz hakkında bilgi alın.",
  openGraph: {
    title: "Hakkımızda - Nova Sağlık Hizmetleri",
    description: "10+ yıllık tecrübe, 500+ memnun hasta, 15 uzman hemşire",
    url: 'https://novasaglik.com/hakkimizda',
  },
};

export default function HakkimizdaPage() {
  const team = [
    {
      name: "Uzm. Hemş. Ayşe Yılmaz",
      title: "Kurucü ve Baş Hemşire",
      experience: "15 yıl deneyim",
      specialty: "Yoğun Bakım ve Evde Sağlık"
    },
    {
      name: "Hemş. Mehmet Demir",
      title: "Klinik Sorumlusu",
      experience: "12 yıl deneyim",
      specialty: "Yaşlı Bakımı ve Kronik Hastalıklar"
    },
    {
      name: "Hemş. Zeynep Kaya",
      title: "Eğitim Koordinatörü",
      experience: "10 yıl deneyim",
      specialty: "Hasta Eğitimi ve Rehabilitasyon"
    },
    {
      name: "Hemş. Ahmet Şahin",
      title: "Saha Koordinatörü",
      experience: "8 yıl deneyim",
      specialty: "Acil Müdahale ve Yara Bakımı"
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Misyonumuz",
      description: "Hasta ve yakınlarının evlerinde, en yüksek kalitede sağlık hizmeti almasını sağlamak. Hastane ortamına alternatif, konforlu ve güvenilir evde sağlık hizmetleri sunmak."
    },
    {
      icon: "👁️",
      title: "Vizyonumuz",
      description: "Türkiye'nin en güvenilir ve tercih edilen evde sağlık hizmetleri markası olmak. Sağlık sektöründe yenilikçi ve hasta odaklı yaklaşımımızla örnek teşkil etmek."
    },
    {
      icon: "💎",
      title: "Değerlerimiz",
      description: "Güven, profesyonellik, empatik yaklaşım, sürekli gelişim ve hasta memnuniyeti. Her hastamıza ailemizin bir ferdi gibi özen gösteriyoruz."
    }
  ];

  const milestones = [
    { year: "2014", event: "Nova Sağlık Hizmetleri kuruldu" },
    { year: "2016", event: "İlk 100 hastaya ulaşıldı" },
    { year: "2018", event: "Ekip 10 hemşireye genişletildi" },
    { year: "2020", event: "7/24 hizmet modeline geçildi" },
    { year: "2022", event: "500+ memnun hasta sayısına ulaşıldı" },
    { year: "2024", event: "15 uzman hemşire ve tam donanımlı ekip" }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-gray-200">
              2014'ten beri evde sağlık hizmetlerinde güvenilir adresiniz. 
              Deneyimli ekibimiz ve hasta odaklı yaklaşımımızla yanınızdayız.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
              Hikayemiz
            </h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              <p>
                <strong className="text-gray-800">Nova Sağlık Hizmetleri</strong>, 2014 yılında evde sağlık hizmetlerine olan ihtiyacı gören ve bu alanda fark yaratmak isteyen bir grup sağlık profesyoneli tarafından kuruldu.
              </p>
              <p>
                Kuruluşumuzdan bu yana, hastalarımızın evlerinde en kaliteli sağlık hizmetini almalarını sağlamak için çalışıyoruz. Hastane ortamının stresinden uzak, kendi konforunuzda, güvenilir ve profesyonel sağlık hizmeti almayı hak ettiğinize inanıyoruz.
              </p>
              <p>
                <strong className="text-gray-800">10 yılı aşkın deneyimimiz</strong> boyunca 500'den fazla hastaya hizmet verdik. Her hastamız bizim için özeldir ve her birine ailemizin bir ferdi gibi özen gösteririz.
              </p>
              <p>
                Sürekli gelişen ve değişen sağlık sektöründe, ekibimizi en son medikal bilgilerle ve teknolojilerle donatarak, sizlere en iyi hizmeti sunmayı taahhüt ediyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
            Yolculuğumuz
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-[#14b8a6] text-white flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <div className="flex-1 pt-4">
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-800 font-semibold">{milestone.event}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">
            Uzman Ekibimiz
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Alanında uzman, deneyimli ve sertifikalı hemşirelerimizle hizmetinizdeyiz
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
                <div className="w-24 h-24 bg-gradient-to-br from-[#14b8a6] to-[#0d9488] rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-[#14b8a6] font-semibold mb-2">{member.title}</p>
                <p className="text-sm text-gray-600 mb-2">{member.experience}</p>
                <p className="text-xs text-gray-500">{member.specialty}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
              <div>
                <div className="text-5xl font-bold text-[#14b8a6] mb-2">10+</div>
                <div className="text-lg">Yıl Deneyim</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#14b8a6] mb-2">500+</div>
                <div className="text-lg">Memnun Hasta</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#14b8a6] mb-2">15</div>
                <div className="text-lg">Uzman Hemşire</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-[#14b8a6] mb-2">7/24</div>
                <div className="text-lg">Kesintisiz Hizmet</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}

