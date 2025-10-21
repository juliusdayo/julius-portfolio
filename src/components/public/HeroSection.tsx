interface HeroSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function HeroSection({ scrollToSection }: HeroSectionProps) {
  return (
    <section id="home" className="pt-20 min-h-screen flex items-center">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: "var(--oxford-blue)" }}
          >
            Hi, I&apos;m{" "}
            <span style={{ color: "var(--orange-web)" }}>Julius</span>
          </h1>
          <p
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ color: "var(--oxford-blue)" }}
          >
            A passionate developer creating amazing digital experiences
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:transform hover:scale-105"
              style={{ backgroundColor: "var(--orange-web)" }}
            >
              View My Projects
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="px-8 py-4 rounded-lg font-semibold border-2 transition-all hover:transform hover:scale-105"
              style={{
                borderColor: "var(--oxford-blue)",
                color: "var(--oxford-blue)",
                backgroundColor: "transparent",
              }}
            >
              Learn More About Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
