import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import News from "@/components/News";
import WhyUs from "@/components/WhyUs";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Hero />
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-3">
            <Services />
          </div>
          <div className="lg:col-span-2">
            <News />
          </div>
        </div>
      </div>
      <WhyUs />
      <CTA />
      <Footer />
    </main>
  );
}

