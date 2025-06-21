import CTASection from "@/components/CTASection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Toaster } from "@/components/ui/sonner";
import { arSA } from "@clerk/localizations";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MRServices - Professional Healthcare & Home Services",
  description:
    "Find trusted medical professionals, food services, and cleaning experts in your area. Book verified professionals for all your home service needs.",
  icons: {
    icon: "/logo-couleur.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={arSA}>
      <html lang="en" className="scroll-smooth">
        <body className={" font-notoArabic"}>
          <Toaster />
          <SignedOut>
            <main className="min-h-screen bg-white">
              <Navigation />
              <HeroSection />
              <ServicesSection />
              <FeaturesSection />
              <TestimonialsSection />
              <CTASection />
              <Footer />
            </main>
          </SignedOut>
          <SignedIn>{children}</SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
