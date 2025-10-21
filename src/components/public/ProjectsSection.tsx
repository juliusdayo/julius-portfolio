import ProjectCard from "./ProjectCard";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
  icon: React.ReactNode;
}

interface ProjectsSectionProps {
  scrollToSection: (sectionId: string) => void;
}

export default function ProjectsSection({
  scrollToSection,
}: ProjectsSectionProps) {
  const projects: Project[] = [
    {
      title: "GoRocky - Motorcycle Marketplace",
      description:
        "A modern motorcycle reselling platform where users can buy and sell motorcycles. Features include advanced search filters, detailed listings, and secure transaction handling.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      link: "https://gorocky.vercel.app/",
      icon: (
        <svg
          className="w-16 h-16"
          style={{ color: "var(--orange-web)" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19.44 9.03L15.41 5H11v2h3.59l2 2H5c-2.8 0-5 2.2-5 5s2.2 5 5 5c2.46 0 4.45-1.69 4.9-4h4.2c.45 2.31 2.44 4 4.9 4 2.76 0 5-2.24 5-5 0-1.91-1.07-3.57-2.64-4.39zM5 17c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm14 0c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
        </svg>
      ),
    },
    {
      title: "Spotify Music Analytics",
      description:
        "A personal music analytics dashboard that connects to Spotify API to display your top tracks, artists, and generates AI-powered witty comments about your music taste.",
      technologies: ["Next.js", "Spotify API", "Google Gemini AI", "OAuth"],
      link: "/spotify",
      icon: (
        <svg
          className="w-16 h-16"
          style={{ color: "var(--orange-web)" }}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="projects"
      className="py-20"
      style={{ backgroundColor: "var(--white)" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ color: "var(--oxford-blue)" }}
          >
            My <span style={{ color: "var(--orange-web)" }}>Projects</span>
          </h2>
          <p
            className="text-xl text-center mb-16 max-w-3xl mx-auto"
            style={{ color: "var(--oxford-blue)" }}
          >
            Here are some of the projects I&apos;ve worked on. Each one
            represents a unique challenge and learning experience.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                icon={project.icon}
                liveDemo={project.link}
              />
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <p className="text-lg mb-6" style={{ color: "var(--oxford-blue)" }}>
              Interested in working together or want to see more of my work?
            </p>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all hover:transform hover:scale-105"
              style={{ backgroundColor: "var(--orange-web)" }}
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
