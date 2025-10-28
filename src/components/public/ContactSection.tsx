export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20"
      style={{ backgroundColor: "var(--oxford-blue)" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-4xl md:text-5xl font-bold mb-12"
            style={{ color: "var(--white)" }}
          >
            Get In <span style={{ color: "var(--orange-web)" }}>Touch</span>
          </h2>
          <p
            className="text-xl mb-12 leading-relaxed"
            style={{ color: "var(--platinum)" }}
          >
            I&apos;m always interested in new opportunities and exciting
            projects. Let&apos;s connect and discuss how we can work together!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "rgba(252, 163, 17, 0.1)" }}
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--orange-web)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--white)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--white)" }}
              >
                Email
              </h3>
              <p style={{ color: "var(--platinum)" }}>
                julius.coros10@gmail.com
              </p>
            </div>

            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "rgba(252, 163, 17, 0.1)" }}
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--orange-web)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--white)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--white)" }}
              >
                Location
              </h3>
              <p style={{ color: "var(--platinum)" }}>Angono, Rizal</p>
            </div>

            <div
              className="p-6 rounded-lg"
              style={{ backgroundColor: "rgba(252, 163, 17, 0.1)" }}
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--orange-web)" }}
              >
                <svg
                  className="w-6 h-6"
                  style={{ color: "var(--white)" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--white)" }}
              >
                Phone
              </h3>
              <p style={{ color: "var(--platinum)" }}>+639612176265</p>
            </div>
          </div>

          <div className="flex justify-center space-x-6">
            <a
              href="https://www.linkedin.com/in/juliuscoros10/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full transition-colors hover:bg-orange-500"
              style={{ backgroundColor: "var(--orange-web)" }}
              aria-label="LinkedIn"
            >
              <svg
                className="w-6 h-6"
                style={{ color: "var(--white)" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://github.com/juliusdayo"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full transition-colors hover:bg-orange-500"
              style={{ backgroundColor: "var(--orange-web)" }}
              aria-label="GitHub"
            >
              <svg
                className="w-6 h-6"
                style={{ color: "var(--white)" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
