import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  return (
    <div>
      {" "}
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <Footer />
    </div>
  );
}
