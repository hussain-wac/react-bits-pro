import ColorBends from "@/components/ColorBends";
import CardSwap, { Card } from "../../components/CardSwap";

const projects = [
  {
    title: "SaaS Dashboard Platform",
    description:
      "Enterprise-grade analytics dashboard with real-time data visualization and team collaboration features",
    tags: ["React", "TypeScript", "Chart.js", "Tailwind"],
    color: ["#6366f1", "#8b5cf6"],
  },
  {
    title: "E-Commerce Storefront",
    description:
      "Full-stack e-commerce platform with cart management, payment integration, and admin panel",
    tags: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    color: ["#ec4899", "#f43f5e"],
  },
  {
    title: "Component Library",
    description:
      "Accessible, customizable React component library with 50+ components and comprehensive documentation",
    tags: ["React", "Storybook", "Radix UI", "CSS"],
    color: ["#14b8a6", "#06b6d4"],
  },
  {
    title: "Task Management App",
    description:
      "Collaborative task manager with drag-and-drop, real-time updates, and team workspaces",
    tags: ["React", "Redux Toolkit", "Socket.io", "Node.js"],
    color: ["#f59e0b", "#eab308"],
  },
];

export default function Projects() {
  return (
    <>
      {/* Projects Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Projects</h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl">
          Showcasing React applications built with modern tools and best
          practices
        </p>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Side - Description */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Featured Work</h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              Each project represents a unique challenge and solution, built
              with cutting-edge technologies and modern development practices.
              From enterprise dashboards to e-commerce platforms, these
              applications showcase expertise in React, TypeScript, and
              full-stack development.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Hover over the cards to pause the animation and explore each
              project in detail. Every application is crafted with attention to
              performance, accessibility, and user experience.
            </p>
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-3">
                Tech Stack Highlights
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  Modern React & TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  Full-Stack Development
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  Responsive Design
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                  Real-time Features
                </li>
              </ul>
            </div>
          </div>

          {/* Right Side - CardSwap */}
          <div
            style={{
              // height: "600px",
              position: "relative",
              overflow: "visible",
            }}
          >
            <CardSwap
              cardDistance={250}
              verticalDistance={90}
              delay={3000}
              pauseOnHover={false}
              width={420}
              height={320}
            >
              {projects.map((project, index) => (
                <Card
                  key={index}
                  // style={{ position: "relative", overflow: "hidden" }}
                >
                  <ColorBends
                    colors={project.color}
                    transparent={false}
                    style={{
                      position: "absolute",
                      inset: 0,
                      zIndex: 0,
                    }}
                  />

                  <div className="p-6 h-full flex flex-col justify-between relative z-10">
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-200 text-sm">
                        {project.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-black/30 backdrop-blur-sm rounded-full text-sm text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </CardSwap>
          </div>
        </div>
      </div>
    </>
  );
}
