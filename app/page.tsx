import dynamic from 'next/dynamic';
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// Lazy load components - performans için
const Services = dynamic(() => import("@/components/Services"), { ssr: true });
const News = dynamic(() => import("@/components/News"), { ssr: true });
const WhyUs = dynamic(() => import("@/components/WhyUs"), { ssr: true });
const Highlights = dynamic(() => import("@/components/Highlights"), { ssr: true });
const Testimonials = dynamic(() => import("@/components/Testimonials"), { ssr: true });
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: true });
const CTA = dynamic(() => import("@/components/CTA"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-3">
            <Services />
          </div>
          <div className="lg:col-span-2">
            <News />
          </div>
        </div>
      </div>
      <Highlights />
      <WhyUs />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}

