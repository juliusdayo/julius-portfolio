import Link from "next/link";

interface HeaderProps {
  activeTab: string;
  scrollToSection: (sectionId: string) => void;
}

export default function Header({ activeTab, scrollToSection }: HeaderProps) {
  return (
    <header
      className="fixed top-0 w-full z-50 shadow-md"
      style={{ backgroundColor: "var(--oxford-blue)" }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div
            className="text-2xl font-bold"
            style={{ color: "var(--orange-web)" }}
          >
            Julius Portfolio
          </div>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "home"
                  ? "text-orange-300"
                  : "text-white hover:text-orange-300"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "about"
                  ? "text-orange-300"
                  : "text-white hover:text-orange-300"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "projects"
                  ? "text-orange-300"
                  : "text-white hover:text-orange-300"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === "contact"
                  ? "text-orange-300"
                  : "text-white hover:text-orange-300"
              }`}
            >
              Contact
            </button>
            <Link
              href="/spotify"
              className="px-4 py-2 rounded transition-colors text-white hover:text-orange-300"
            >
              Spotify
            </Link>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
