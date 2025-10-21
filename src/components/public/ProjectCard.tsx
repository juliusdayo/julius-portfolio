interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  liveDemo?: string;
  github?: string;
}

export default function ProjectCard({
  title,
  description,
  technologies,
  icon,
  liveDemo = "#",
  github = "#",
}: ProjectCardProps) {
  return (
    <div
      className="rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
      style={{ backgroundColor: "var(--platinum)" }}
    >
      <div
        className="h-48 flex items-center justify-center"
        style={{ backgroundColor: "var(--oxford-blue)" }}
      >
        {icon}
      </div>
      <div className="p-6">
        <h3
          className="text-xl font-semibold mb-3"
          style={{ color: "var(--oxford-blue)" }}
        >
          {title}
        </h3>
        <p
          className="mb-4 leading-relaxed"
          style={{ color: "var(--oxford-blue)" }}
        >
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 rounded text-xs font-medium"
              style={{
                backgroundColor: "var(--orange-web)",
                color: "var(--white)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          <a
            href={liveDemo}
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--oxford-blue)" }}
          >
            Live Demo
          </a>
          <a
            href={github}
            className="text-sm font-medium hover:underline"
            style={{ color: "var(--oxford-blue)" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
