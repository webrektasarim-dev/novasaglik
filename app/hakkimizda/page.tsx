"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTA from "@/components/CTA";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

type TeamMember = {
  name: string;
  title: string;
  experience: string;
  specialty: string;
};

type ValueItem = {
  icon: string;
  title: string;
  description: string;
};

const aboutContent: Record<
  "tr" | "en" | "ru" | "ar",
  {
    heroTitle: string;
    heroDescription: string;
    storyTitle: string;
    storyParagraphs: string[];
    values: ValueItem[];
    milestonesTitle: string;
    milestones: { year: string; event: string }[];
    teamTitle: string;
    teamSubtitle: string;
    team: TeamMember[];
    stats: { value: string; label: string }[];
  }
> = {
  tr: {
    heroTitle: "Hakkımızda",
    heroDescription: "2014'ten beri evde sağlık hizmetlerinde güvenilir adresiniz. Deneyimli ekibimiz ve hasta odaklı yaklaşımımızla yanınızdayız.",
    storyTitle: "Hikayemiz",
    storyParagraphs: [
      "Nova Sağlık Hizmetleri, 2014 yılında evde sağlık hizmetlerine olan ihtiyacı gören ve bu alanda fark yaratmak isteyen bir grup sağlık profesyoneli tarafından kuruldu.",
      "Kuruluşumuzdan bu yana, hastalarımızın evlerinde en kaliteli sağlık hizmetini almalarını sağlamak için çalışıyoruz. Hastane ortamının stresinden uzak, kendi konforunuzda güvenilir ve profesyonel sağlık hizmeti almayı hak ettiğinize inanıyoruz.",
      "10 yılı aşkın deneyimimiz boyunca 500'den fazla hastaya hizmet verdik. Her hastamız bizim için özeldir ve her birine ailemizin bir ferdi gibi özen gösteririz.",
      "Sürekli gelişen sağlık sektöründe ekibimizi en son medikal bilgilerle donatarak sizlere en iyi hizmeti sunmayı taahhüt ediyoruz.",
    ],
    values: [
      {
        icon: "🎯",
        title: "Misyonumuz",
        description:
          "Hasta ve yakınlarının evlerinde en yüksek kalitede sağlık hizmeti almasını sağlamak. Hastane ortamına alternatif, konforlu ve güvenilir evde sağlık hizmetleri sunmak.",
      },
      {
        icon: "👁️",
        title: "Vizyonumuz",
        description:
          "Türkiye'nin en güvenilir ve tercih edilen evde sağlık hizmetleri markası olmak. Sağlık sektöründe yenilikçi ve hasta odaklı yaklaşımımızla örnek teşkil etmek.",
      },
      {
        icon: "💎",
        title: "Değerlerimiz",
        description:
          "Güven, profesyonellik, empati, sürekli gelişim ve hasta memnuniyeti. Her hastamıza ailemizin bir ferdi gibi özen gösteriyoruz.",
      },
    ],
    milestonesTitle: "Yolculuğumuz",
    milestones: [
      { year: "2014", event: "Nova Sağlık Hizmetleri kuruldu" },
      { year: "2016", event: "İlk 100 hastaya ulaşıldı" },
      { year: "2018", event: "Ekip 10 hemşireye genişletildi" },
      { year: "2020", event: "7/24 hizmet modeline geçildi" },
      { year: "2022", event: "500+ memnun hasta sayısına ulaşıldı" },
      { year: "2024", event: "15 uzman hemşire ve tam donanımlı ekip" },
    ],
    teamTitle: "Uzman Ekibimiz",
    teamSubtitle: "Alanında uzman, deneyimli ve sertifikalı hemşirelerimizle hizmetinizdeyiz",
    team: [
      { name: "Uzm. Hemş. Ayşe Yılmaz", title: "Kurucu ve Baş Hemşire", experience: "15 yıl deneyim", specialty: "Yoğun Bakım ve Evde Sağlık" },
      { name: "Hemş. Mehmet Demir", title: "Klinik Sorumlusu", experience: "12 yıl deneyim", specialty: "Yaşlı Bakımı ve Kronik Hastalıklar" },
      { name: "Hemş. Zeynep Kaya", title: "Eğitim Koordinatörü", experience: "10 yıl deneyim", specialty: "Hasta Eğitimi ve Rehabilitasyon" },
      { name: "Hemş. Ahmet Şahin", title: "Saha Koordinatörü", experience: "8 yıl deneyim", specialty: "Acil Müdahale ve Yara Bakımı" },
    ],
    stats: [
      { value: "10+", label: "Yıl Deneyim" },
      { value: "500+", label: "Memnun Hasta" },
      { value: "15", label: "Uzman Hemşire" },
      { value: "7/24", label: "Kesintisiz Hizmet" },
    ],
  },
  en: {
    heroTitle: "About Us",
    heroDescription: "Your trusted in-home healthcare partner since 2014. Our experienced team delivers patient-first care around the clock.",
    storyTitle: "Our Story",
    storyParagraphs: [
      "Nova Sağlık Services was founded in 2014 by a group of healthcare professionals who wanted to reinvent at-home medical care.",
      "Since day one, we have focused on delivering hospital-grade quality inside the comfort of our patients’ homes. We believe everyone deserves safe, professional care without the stress of hospital visits.",
      "With more than a decade of experience, we have supported over 500 patients. Each person we care for is treated like part of our family.",
      "We constantly train our team with the latest medical knowledge and technology to provide the safest and most effective service possible.",
    ],
    values: [
      {
        icon: "🎯",
        title: "Our Mission",
        description: "To deliver the highest quality healthcare directly at home, offering a safe and comfortable alternative to hospital stays.",
      },
      {
        icon: "👁️",
        title: "Our Vision",
        description: "To become Turkey’s most trusted and preferred at-home healthcare brand through innovation and patient-focused care.",
      },
      {
        icon: "💎",
        title: "Our Values",
        description: "Trust, professionalism, empathy, continuous improvement, and patient satisfaction. We care for every patient like family.",
      },
    ],
    milestonesTitle: "Our Journey",
    milestones: [
      { year: "2014", event: "Nova Sağlık Services was founded" },
      { year: "2016", event: "Reached our first 100 patients" },
      { year: "2018", event: "Expanded to a 10-nurse team" },
      { year: "2020", event: "Launched our 24/7 care model" },
      { year: "2022", event: "Celebrated 500+ happy patients" },
      { year: "2024", event: "Grew to 15 specialist nurses" },
    ],
    teamTitle: "Our Expert Team",
    teamSubtitle: "Experienced, certified nurses dedicated to compassionate care",
    team: [
      { name: "Ayşe Yılmaz, RN", title: "Founder & Head Nurse", experience: "15 years experience", specialty: "Intensive Care & Home Health" },
      { name: "Mehmet Demir, RN", title: "Clinical Lead", experience: "12 years experience", specialty: "Elderly & Chronic Care" },
      { name: "Zeynep Kaya, RN", title: "Training Coordinator", experience: "10 years experience", specialty: "Patient Education & Rehab" },
      { name: "Ahmet Şahin, RN", title: "Field Coordinator", experience: "8 years experience", specialty: "Emergency & Wound Care" },
    ],
    stats: [
      { value: "10+", label: "Years of Experience" },
      { value: "500+", label: "Satisfied Patients" },
      { value: "15", label: "Specialist Nurses" },
      { value: "24/7", label: "Continuous Support" },
    ],
  },
  ru: {
    heroTitle: "О нас",
    heroDescription: "Ваш надёжный партнёр в сфере домашнего здравоохранения с 2014 года. Наша опытная команда предоставляет помощь 24/7.",
    storyTitle: "Наша история",
    storyParagraphs: [
      "Nova Sağlık была создана в 2014 году группой медицинских специалистов, решивших изменить подход к домашнему уходу.",
      "С первых дней мы стремимся обеспечить больным hospital-grade качество прямо у них дома, без стресса поездок в клинику.",
      "За более чем 10 лет мы помогли более чем 500 пациентам. Каждый человек для нас — член семьи.",
      "Мы постоянно обучаем команду и внедряем новые технологии, чтобы вы получали самый безопасный и эффективный уход.",
    ],
    values: [
      {
        icon: "🎯",
        title: "Наша миссия",
        description: "Предоставлять медицинскую помощь высочайшего уровня у вас дома, делая её комфортной и безопасной.",
      },
      {
        icon: "👁️",
        title: "Наша визия",
        description: "Стать самым доверенным брендом домашнего здравоохранения в Турции благодаря инновациям и ориентации на пациента.",
      },
      {
        icon: "💎",
        title: "Наши ценности",
        description: "Доверие, профессионализм, эмпатия, постоянное развитие и удовлетворение пациентов.",
      },
    ],
    milestonesTitle: "Наш путь",
    milestones: [
      { year: "2014", event: "Основана Nova Sağlık" },
      { year: "2016", event: "Обслужено первые 100 пациентов" },
      { year: "2018", event: "Команда выросла до 10 медсестёр" },
      { year: "2020", event: "Запущен режим работы 24/7" },
      { year: "2022", event: "500+ довольных пациентов" },
      { year: "2024", event: "15 специалистов в команде" },
    ],
    teamTitle: "Наша экспертная команда",
    teamSubtitle: "Опытные и сертифицированные медсёстры, ориентированные на заботу",
    team: [
      { name: "Айше Йылмаз, медсестра", title: "Основатель и главная медсестра", experience: "15 лет опыта", specialty: "Реанимация и домашний уход" },
      { name: "Мехмет Демир, медбрат", title: "Клинический руководитель", experience: "12 лет опыта", specialty: "Гериатрия и хронические болезни" },
      { name: "Зейнеп Кая, медсестра", title: "Координатор обучения", experience: "10 лет опыта", specialty: "Обучение пациентов и реабилитация" },
      { name: "Ахмет Шахин, медбрат", title: "Координатор выездов", experience: "8 лет опыта", specialty: "Неотложная помощь и лечение ран" },
    ],
    stats: [
      { value: "10+", label: "Лет опыта" },
      { value: "500+", label: "Довольных пациентов" },
      { value: "15", label: "Специалистов" },
      { value: "24/7", label: "Поддержка" },
    ],
  },
  ar: {
    heroTitle: "من نحن",
    heroDescription: "منذ عام 2014 ونحن نقدم خدمات الرعاية الصحية المنزلية والعيادية بدقة واحترافية وعلى مدار الساعة.",
    storyTitle: "قصتنا",
    storyParagraphs: [
      "تأسست Nova Sağlık على يد فريق من المختصين الذين آمنوا بأهمية تقديم رعاية طبية عالية الجودة داخل المنزل.",
      "منذ البداية ركزنا على منح مرضانا راحة البال بعيداً عن ضغوط المستشفيات من خلال رعاية محترفة في بيئة مألوفة.",
      "خلال أكثر من عشر سنوات قدمنا خدماتنا لمئات المرضى، ونحرص دائماً على معاملة كل حالة كجزء من عائلتنا.",
      "نستثمر باستمرار في تدريب فريقنا واستخدام أحدث التقنيات لنضمن تقديم رعاية آمنة ومتمحورة حول المريض.",
    ],
    values: [
      {
        icon: "🎯",
        title: "رسالتنا",
        description: "تقديم رعاية صحية منزلية موثوقة وذات جودة عالية تضمن راحة المريض وعائلته.",
      },
      {
        icon: "👁️",
        title: "رؤيتنا",
        description: "أن نكون الخيار الأول للرعاية الصحية المنزلية في تركيا بفضل الابتكار والتركيز على الإنسان.",
      },
      {
        icon: "💎",
        title: "قيمنا",
        description: "الثقة، المهنية، التعاطف، التطوير المستمر ورضا المرضى.",
      },
    ],
    milestonesTitle: "محطاتنا",
    milestones: [
      { year: "2014", event: "انطلاق Nova Sağlık" },
      { year: "2016", event: "خدمة أكثر من 100 مريض" },
      { year: "2018", event: "توسيع الفريق إلى 10 ممرضين" },
      { year: "2020", event: "الانتقال إلى خدمة 24/7" },
      { year: "2022", event: "تخطي 500 مريض راضٍ" },
      { year: "2024", event: "فريق من 15 متخصصاً" },
    ],
    teamTitle: "فريقنا المتميز",
    teamSubtitle: "ممرضون وممرضات معتمدون يمتلكون سنوات طويلة من الخبرة العملية.",
    team: [
      { name: "عايشة يلماز", title: "المؤسِسة ورئيسة التمريض", experience: "15 عاماً من الخبرة", specialty: "العناية المركزة والرعاية المنزلية" },
      { name: "محمد دمير", title: "مدير العيادة", experience: "12 عاماً من الخبرة", specialty: "رعاية المسنين والأمراض المزمنة" },
      { name: "زينب قايا", title: "منسقة التدريب", experience: "10 أعوام من الخبرة", specialty: "تثقيف المرضى وإعادة التأهيل" },
      { name: "أحمد شاهين", title: "منسق الفرق الميدانية", experience: "8 أعوام من الخبرة", specialty: "الاستجابة الطارئة والعناية بالجروح" },
    ],
    stats: [
      { value: "10+", label: "سنوات خبرة" },
      { value: "500+", label: "مرضى راضون" },
      { value: "15", label: "ممرضات متخصصات" },
      { value: "24/7", label: "دعم مستمر" },
    ],
  },
};

export default function HakkimizdaPage() {
  const { language } = useLanguage();
  const content = aboutContent[language];

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{content.heroTitle}</h1>
            <p className="text-xl text-gray-200">{content.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">{content.storyTitle}</h2>
            <div className="prose prose-lg max-w-none text-gray-600 space-y-4">
              {content.storyParagraphs.map((paragraph, index) => (
                <p key={`${language}-story-${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.values.map((value, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
              const animationClass = index % 2 === 0 ? "scroll-card-left" : "scroll-card-right";
              const visibleClass = isVisible ? "visible" : "";

              return (
                <div key={`${language}-value-${index}`} ref={ref} className={`bg-white p-8 rounded-xl shadow-lg ${animationClass} ${visibleClass}`}>
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">{content.milestonesTitle}</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              {content.milestones.map((milestone, index) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
                const animationClass = index % 2 === 0 ? "scroll-card-left" : "scroll-card-right";
                const visibleClass = isVisible ? "visible" : "";

                return (
                  <div key={`${language}-milestone-${index}`} ref={ref} className={`flex gap-6 items-start ${animationClass} ${visibleClass}`}>
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-[#14b8a6] text-white flex items-center justify-center font-bold">{milestone.year}</div>
                    </div>
                    <div className="flex-1 pt-4">
                      <div className="bg-gray-50 p-6 rounded-lg">
                        <p className="text-gray-800 font-semibold">{milestone.event}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 text-center">{content.teamTitle}</h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">{content.teamSubtitle}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {content.team.map((member, index) => {
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const { ref, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
              const animationClass = index % 2 === 0 ? "scroll-card-left" : "scroll-card-right";
              const visibleClass = isVisible ? "visible" : "";

              return (
                <div
                  key={`${language}-team-${index}`}
                  ref={ref}
                  className={`bg-white p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow ${animationClass} ${visibleClass}`}
                >
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
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2a4a6f] rounded-2xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-center">
              {content.stats.map((stat) => (
                <div key={`${language}-${stat.label}`}>
                  <div className="text-5xl font-bold text-[#14b8a6] mb-2">{stat.value}</div>
                  <div className="text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}
