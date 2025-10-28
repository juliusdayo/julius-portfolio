export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20"
      style={{ backgroundColor: "var(--platinum)" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl md:text-5xl font-bold text-center mb-12"
            style={{ color: "var(--oxford-blue)" }}
          >
            About <span style={{ color: "var(--orange-web)" }}>Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3
                className="text-2xl font-semibold mb-4"
                style={{ color: "var(--oxford-blue)" }}
              >
                Hello! I&apos;m Julius
              </h3>
              <p
                className="text-lg mb-6 leading-relaxed"
                style={{ color: "var(--oxford-blue)" }}
              >
                I&apos;m a dedicated developer with a passion for creating
                innovative solutions and beautiful user experiences. With
                expertise in modern web technologies, I love bringing ideas to
                life through clean, efficient code.
              </p>
              <p
                className="text-lg mb-6 leading-relaxed"
                style={{ color: "var(--oxford-blue)" }}
              >
                When I&apos;m not coding, you can find me exploring new
                technologies, contributing to open-source projects, or sharing
                knowledge with the developer community.
              </p>
            </div>
            <div className="space-y-6">
              <div
                className="p-6 rounded-lg shadow-lg"
                style={{ backgroundColor: "var(--white)" }}
              >
                <h4
                  className="text-xl font-semibold mb-4"
                  style={{ color: "var(--orange-web)" }}
                >
                  Skills & Technologies
                </h4>

                {/* Languages */}
                <div className="mb-4">
                  <h5
                    className="text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: "var(--oxford-blue)" }}
                  >
                    Languages
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {["JavaScript", "TypeScript", "Python", "PHP"].map(
                      (skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 rounded-full text-sm font-medium"
                          style={{
                            backgroundColor: "var(--oxford-blue)",
                            color: "var(--white)",
                          }}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </div>

                {/* Libraries/Frameworks */}
                <div className="mb-4">
                  <h5
                    className="text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: "var(--oxford-blue)" }}
                  >
                    Libraries/Frameworks
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "ReactJS",
                      "Next.js",
                      "Svelte",
                      "Laravel",
                      "CodeIgniter",
                      "Node.js",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "var(--oxford-blue)",
                          color: "var(--white)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Databases */}
                <div className="mb-4">
                  <h5
                    className="text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: "var(--oxford-blue)" }}
                  >
                    Databases
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {["MySQL", "PostgreSQL", "NoSQL"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "var(--oxford-blue)",
                          color: "var(--white)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Cloud */}
                <div>
                  <h5
                    className="text-sm font-semibold mb-2 uppercase tracking-wide"
                    style={{ color: "var(--oxford-blue)" }}
                  >
                    Cloud
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {["AWS", "Azure", "GCP"].map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: "var(--oxford-blue)",
                          color: "var(--white)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
