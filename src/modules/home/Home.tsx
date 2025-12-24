import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScrollText from "../../components/ScrollText";
import ScrollVelocity from "../../components/ScrollVelocity";

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollIndicator(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const skills = [
    { name: "React", level: 95 },
    { name: "TypeScript", level: 90 },
    { name: "Next.js", level: 85 },
    { name: "Node.js", level: 80 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Redux/Zustand", level: 85 },
  ];

  const experience = [
    {
      role: "Senior React Developer",
      company: "TechCorp Inc.",
      period: "2022 - Present",
      description:
        "Leading frontend architecture for enterprise SaaS platform. Built component library used across 5 products.",
    },
    {
      role: "Frontend Developer",
      company: "StartupXYZ",
      period: "2020 - 2022",
      description:
        "Developed React applications with Redux, implemented CI/CD pipelines, and mentored junior developers.",
    },
    {
      role: "Junior Developer",
      company: "WebAgency",
      period: "2018 - 2020",
      description:
        "Built responsive websites and single-page applications using React and modern JavaScript.",
    },
  ];

  const projects = [
    {
      title: "E-Commerce Dashboard",
      tech: ["React", "TypeScript", "Chart.js", "Tailwind"],
      description:
        "Real-time analytics dashboard with interactive charts and data visualization.",
    },
    {
      title: "Task Management App",
      tech: ["Next.js", "Prisma", "PostgreSQL", "tRPC"],
      description:
        "Full-stack task manager with drag-and-drop, real-time updates, and team collaboration.",
    },
    {
      title: "Component Library",
      tech: ["React", "Storybook", "Radix UI", "CVA"],
      description:
        "50+ accessible, customizable components with comprehensive documentation.",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-8 pt-20 transition-opacity duration-5000 ease-in-out">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent relative z-10">
          Muhammed Hussain
        </h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-4 relative z-10">
          React.js Developer
        </p>
        <p className="text-lg text-gray-500 mb-8 max-w-2xl relative z-10">
          Building performant, scalable web applications with modern React
          ecosystem
        </p>
        <div className="flex gap-4 relative z-10">
          <Link
            to="/projects"
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-white rounded-full hover:bg-white hover:text-black transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-300 z-50">
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
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        )}
      </section>

      {/* Scroll Animated Text Section */}
      <ScrollText
        text="Building exceptional user experiences with React. Crafting performant, scalable, and beautiful web applications that users love."
        className="text-center"
        textSize="lg"
        maxWidth="7xl"
      />

      {/* About Me - ScrollVelocity Section */}
      <section className="py-16 overflow-hidden">
        <ScrollVelocity
          texts={["React Developer", "UI/UX Enthusiast"]}
          velocity={80}
          className="text-4xl md:text-6xl font-bold text-white/50"
        />
      </section>

      {/* Skills Section */}
      <section className="min-h-screen px-4 md:px-8 py-24 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-400 mb-12 text-lg">
            Technologies I work with daily
          </p>

          <div className="grid gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10"
              >
                <div className="flex justify-between mb-3">
                  <span className="font-semibold text-lg">{skill.name}</span>
                  <span className="text-gray-400">{skill.level}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            {[
              "Git",
              "REST APIs",
              "GraphQL",
              "Jest",
              "Cypress",
              "Webpack",
              "Vite",
              "Docker",
              "AWS",
              "Figma",
            ].map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 bg-white/10 rounded-full text-sm border border-white/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>
      <section className="min-h-screen px-4 md:px-8 py-24 flex flex-col justify-center w-full">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">Experience</h2>
          <p className="text-gray-400 mb-12 text-lg">My professional journey</p>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{exp.role}</h3>
                    <p className="text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-gray-400">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


        <section className="py-16 overflow-hidden">
        <ScrollVelocity
          texts={["React Developer", "UI/UX Enthusiast"]}
          velocity={80}
          className="text-4xl md:text-6xl font-bold text-white/50"
        />
      </section>

      {/* Featured Projects Section */}
      <section className="min-h-screen px-4 md:px-8 py-24 flex flex-col justify-center">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-400 mb-12 text-lg">Some things I've built</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 mb-4 flex items-center justify-center">
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
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 bg-white/10 rounded text-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors"
            >
              View All Projects
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 md:px-8 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Let's Work Together
          </h2>
          <p className="text-gray-400 mb-8 text-lg max-w-xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Start a Conversation
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 md:px-8 py-12 border-t border-white/10">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500">
            © 2024 Muhammed Hussain. Built with React & Love.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Twitter
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
