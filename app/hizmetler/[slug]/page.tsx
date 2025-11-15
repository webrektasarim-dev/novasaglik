import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import serumImage from "@/images/serum.png";
import enjeksiyonImage from "@/images/enjeksiyon.png";
import hemsireImage from "@/images/hemsire.png";
import AppointmentForm from "@/components/AppointmentForm";

const services = {
  "serum-takma": {
    title: "Serum Takma Hizmeti",
    description: "Evde serum tedavisi hizmetimiz ile rahatlığınızı bozmadan tedavinizi sürdürün.",
    image: serumImage,
    content: `
      <h2>Serum Takma Hizmeti Hakkında</h2>
      <p>Nova Sağlık olarak, evde serum takma hizmeti ile hastalarımıza konforlu ve güvenli bir tedavi deneyimi sunuyoruz. Uzman hemşirelerimiz, steril ortamda ve en yüksek hijyen standartlarında serum uygulaması yapmaktadır.</p>
      
      <h3>Hizmet Kapsamımız</h3>
      <p>Serum takma hizmetimiz kapsamında şunları sunuyoruz:</p>
      <ul>
        <li><strong>IV (İntravenöz) Serum Uygulaması:</strong> Damar yolu açma ve serum takma işlemi profesyonelce gerçekleştirilir.</li>
        <li><strong>Vitamin ve Mineral Desteği:</strong> Vücudunuzun ihtiyaç duyduğu vitamin ve mineralleri serum yoluyla alabilirsiniz.</li>
        <li><strong>Antibiyotik Tedavisi:</strong> Doktorunuzun önerdiği antibiyotik tedavisini evde güvenle alabilirsiniz.</li>
        <li><strong>Sıvı Elektrolit Dengesi:</strong> Dehidratasyon durumlarında sıvı ve elektrolit desteği sağlanır.</li>
        <li><strong>Günlük veya Haftalık Tedavi Programları:</strong> Uzun süreli tedaviler için düzenli takip ve uygulama yapılır.</li>
      </ul>
      
      <h3>Hizmetimizden Nasıl Faydalanabilirsiniz?</h3>
      <p>Serum takma hizmetimizden faydalanmak için:</p>
      <ol>
        <li><strong>Randevu Alın:</strong> Web sitemizden veya telefon ile randevu oluşturun.</li>
        <li><strong>Doktor Raporu:</strong> Doktorunuzun serum takılması için verdiği raporu hazır bulundurun.</li>
        <li><strong>İlaç ve Malzeme:</strong> Gerekli ilaç ve serum malzemelerini temin edin (eczaneden reçete ile).</li>
        <li><strong>Uzman Hemşire Gelir:</strong> Randevu saatinde uzman hemşiremiz evinize gelir.</li>
        <li><strong>Steril Uygulama:</strong> Tüm işlemler steril ortamda ve hijyen kurallarına uygun şekilde yapılır.</li>
        <li><strong>Takip ve Kontrol:</strong> Serum takıldıktan sonra gerekli kontroller yapılır ve bilgilendirme yapılır.</li>
      </ol>
      
      <h3>Neden Nova Sağlık?</h3>
      <ul>
        <li>✅ Sertifikalı ve deneyimli hemşire kadromuz</li>
        <li>✅ 7/24 hizmet imkanı</li>
        <li>✅ Steril ve güvenli uygulama</li>
        <li>✅ Ev konforunda tedavi</li>
        <li>✅ Uygun fiyat garantisi</li>
        <li>✅ Hızlı ve güvenilir hizmet</li>
      </ul>
      
      <h3>Önemli Notlar</h3>
      <p>Serum takma işlemi öncesi:</p>
      <ul>
        <li>Doktor raporu ve reçete mutlaka hazır bulundurulmalıdır.</li>
        <li>İlaç ve serum malzemeleri eczaneden temin edilmelidir.</li>
        <li>Alerji durumları önceden bildirilmelidir.</li>
        <li>Mevcut sağlık durumu hakkında bilgi verilmelidir.</li>
      </ul>
    `,
    serviceName: "Serum Takma"
  },
  "enjeksiyon": {
    title: "Enjeksiyon Hizmeti",
    description: "Her türlü enjeksiyon uygulaması için uzman hemşire desteği.",
    image: enjeksiyonImage,
    content: `
      <h2>Enjeksiyon Hizmeti Hakkında</h2>
      <p>Nova Sağlık, evde enjeksiyon hizmeti ile hastalarımıza güvenli ve profesyonel enjeksiyon uygulamaları sunmaktadır. Uzman hemşirelerimiz, her türlü enjeksiyon işlemini doğru teknik ve steril koşullarda gerçekleştirmektedir.</p>
      
      <h3>Hizmet Kapsamımız</h3>
      <p>Enjeksiyon hizmetimiz kapsamında şunları sunuyoruz:</p>
      <ul>
        <li><strong>İntramüsküler (Kas İçi) Enjeksiyon:</strong> Kalça, kol veya uygun kas bölgelerine enjeksiyon uygulaması.</li>
        <li><strong>Subkutan (Deri Altı) Enjeksiyon:</strong> İnsülin ve benzeri ilaçların deri altına uygulanması.</li>
        <li><strong>İnsülin Enjeksiyonu ve Eğitimi:</strong> Diyabet hastaları için insülin enjeksiyonu ve kendi kendine uygulama eğitimi.</li>
        <li><strong>Aşı Uygulamaları:</strong> Grip, tetanos ve diğer aşıların güvenli uygulanması.</li>
        <li><strong>Antikoagülan İlaç Enjeksiyonları:</strong> Kan sulandırıcı ilaçların düzenli uygulanması.</li>
      </ul>
      
      <h3>Hizmetimizden Nasıl Faydalanabilirsiniz?</h3>
      <p>Enjeksiyon hizmetimizden faydalanmak için:</p>
      <ol>
        <li><strong>Randevu Oluşturun:</strong> Web sitemizden veya telefon ile randevu alın.</li>
        <li><strong>İlaç Hazırlığı:</strong> Doktorunuzun reçete ettiği ilacı eczaneden temin edin.</li>
        <li><strong>Bilgilendirme:</strong> Alerji durumları ve mevcut sağlık durumunuzu paylaşın.</li>
        <li><strong>Uygulama:</strong> Uzman hemşiremiz randevu saatinde gelir ve enjeksiyonu uygular.</li>
        <li><strong>Eğitim:</strong> Gerekli durumlarda kendi kendine enjeksiyon eğitimi verilir.</li>
        <li><strong>Takip:</strong> Enjeksiyon sonrası gerekli kontroller yapılır.</li>
      </ol>
      
      <h3>Neden Nova Sağlık?</h3>
      <ul>
        <li>✅ Doğru enjeksiyon tekniği</li>
        <li>✅ Steril ve güvenli uygulama</li>
        <li>✅ Ağrısız enjeksiyon deneyimi</li>
        <li>✅ Eğitim ve danışmanlık desteği</li>
        <li>✅ 7/24 hizmet imkanı</li>
        <li>✅ Uygun fiyat garantisi</li>
      </ul>
      
      <h3>Önemli Notlar</h3>
      <p>Enjeksiyon işlemi öncesi:</p>
      <ul>
        <li>İlaç mutlaka buzdolabında saklanmalıdır (gerekiyorsa).</li>
        <li>Son kullanma tarihi kontrol edilmelidir.</li>
        <li>Alerji durumları mutlaka bildirilmelidir.</li>
        <li>Doktor reçetesi hazır bulundurulmalıdır.</li>
      </ul>
    `,
    serviceName: "Enjeksiyon Hizmeti"
  },
  "hemsirelik-hizmeti": {
    title: "Hemşirelik Hizmeti",
    description: "Deneyimli ve sertifikalı hemşirelerimizle kapsamlı bakım hizmeti.",
    image: hemsireImage,
    content: `
      <h2>Hemşirelik Hizmeti Hakkında</h2>
      <p>Nova Sağlık, evde hemşirelik hizmeti ile hastalarımıza kapsamlı ve profesyonel bakım hizmeti sunmaktadır. Sertifikalı ve deneyimli hemşirelerimiz, yaşlı bakımından kronik hastalık takibine kadar geniş bir yelpazede hizmet vermektedir.</p>
      
      <h3>Hizmet Kapsamımız</h3>
      <p>Hemşirelik hizmetimiz kapsamında şunları sunuyoruz:</p>
      <ul>
        <li><strong>Yaşlı Hasta Bakımı:</strong> Yaşlı hastalarınız için günlük yaşam aktiviteleri desteği ve medikal bakım.</li>
        <li><strong>Kronik Hastalık Takibi:</strong> Diyabet, hipertansiyon gibi kronik hastalıkların düzenli takibi.</li>
        <li><strong>Medikal Cihaz Kullanımı:</strong> Nebulizatör, oksijen konsantratörü gibi cihazların kullanımı ve bakımı.</li>
        <li><strong>Vital Bulgu Takibi:</strong> Tansiyon, nabız, ateş, oksijen saturasyonu ölçümü ve kayıt tutma.</li>
        <li><strong>İlaç Takibi ve Hatırlatma:</strong> İlaçların zamanında alınması ve doğru dozaj kontrolü.</li>
        <li><strong>Yara Bakımı:</strong> Cerrahi yaralar, bası yaraları ve diğer yara bakımları.</li>
        <li><strong>Hijyen ve Temizlik:</strong> Hasta hijyeni ve temizlik desteği.</li>
      </ul>
      
      <h3>Hizmetimizden Nasıl Faydalanabilirsiniz?</h3>
      <p>Hemşirelik hizmetimizden faydalanmak için:</p>
      <ol>
        <li><strong>İhtiyaç Belirleme:</strong> Hangi konularda desteğe ihtiyacınız olduğunu belirleyin.</li>
        <li><strong>Randevu Oluşturun:</strong> Web sitemizden veya telefon ile randevu oluşturun.</li>
        <li><strong>Bilgilendirme:</strong> Hasta durumu, ilaçlar ve özel ihtiyaçlar hakkında bilgi verin.</li>
        <li><strong>Hizmet Planı:</strong> Uzman hemşiremiz gelir ve hizmet planı oluşturur.</li>
        <li><strong>Düzenli Takip:</strong> Günlük, haftalık veya aylık düzenli takip programı oluşturulur.</li>
        <li><strong>Raporlama:</strong> Yapılan işlemler ve vital bulgular düzenli olarak raporlanır.</li>
      </ol>
      
      <h3>Hizmet Paketlerimiz</h3>
      <ul>
        <li><strong>8 Saatlik Paket:</strong> Günlük 8 saatlik hemşirelik hizmeti</li>
        <li><strong>12 Saatlik Paket:</strong> Günlük 12 saatlik kapsamlı bakım</li>
        <li><strong>24 Saatlik Paket:</strong> Tam gün refakatçi hemşirelik hizmeti</li>
        <li><strong>Haftalık Paket:</strong> Haftalık düzenli takip ve bakım</li>
        <li><strong>Aylık Paket:</strong> Aylık kapsamlı hemşirelik hizmeti</li>
      </ul>
      
      <h3>Neden Nova Sağlık?</h3>
      <ul>
        <li>✅ Sertifikalı ve deneyimli hemşire kadrosu</li>
        <li>✅ Kişiye özel bakım planı</li>
        <li>✅ Düzenli raporlama ve takip</li>
        <li>✅ 7/24 hizmet imkanı</li>
        <li>✅ Aile ile koordinasyon</li>
        <li>✅ Uygun fiyat garantisi</li>
      </ul>
      
      <h3>Önemli Notlar</h3>
      <p>Hemşirelik hizmeti için:</p>
      <ul>
        <li>Hasta durumu hakkında detaylı bilgi verilmelidir.</li>
        <li>İlaç listesi ve doktor raporları hazır bulundurulmalıdır.</li>
        <li>Özel ihtiyaçlar önceden bildirilmelidir.</li>
        <li>Düzenli takip için sabit bir program oluşturulması önerilir.</li>
      </ul>
    `,
    serviceName: "Hemşirelik Hizmetleri"
  }
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];
  
  if (!service) {
    return {
      title: "Hizmet Bulunamadı - Nova Sağlık",
    };
  }
  
  return {
    title: `${service.title} - Nova Sağlık Hizmetleri`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      url: `https://novasaglik.com/hizmetler/${slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = services[slug as keyof typeof services];
  
  if (!service) {
    notFound();
  }
  
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {service.title}
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl drop-shadow">
              {service.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div 
              className="service-content"
              dangerouslySetInnerHTML={{ __html: service.content }}
            />
          </div>
        </div>
      </section>
      
      {/* Appointment Form Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Hemen Randevu Oluşturun
              </h2>
              <p className="text-xl text-gray-600">
                {service.serviceName} için randevu oluşturmak için formu doldurun
              </p>
            </div>
            <AppointmentForm defaultService={service.serviceName} />
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

