"use client";

import { useState } from "react";
import Header from "../components/public/Header";
import HeroSection from "../components/public/HeroSection";
import AboutSection from "../components/public/AboutSection";
import ProjectsSection from "../components/public/ProjectsSection";
import ContactSection from "../components/public/ContactSection";
import Footer from "../components/public/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveTab(sectionId);
  };

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--white)", color: "var(--oxford-blue)" }}
    >
      <Header activeTab={activeTab} scrollToSection={scrollToSection} />
      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <ProjectsSection scrollToSection={scrollToSection} />
      <ContactSection />
      <Footer />
    </div>
  );
}
