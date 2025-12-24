import ColorBends from "@/components/ColorBends";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import CardSwap, { Card } from "../../components/CardSwap";
import CountUp from "@/components/CountUp";
import ScrollFloat from "@/components/ScrollFloat";


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
        <div className="flex items-center gap-6 mb-6">
          <h1 className="text-5xl md:text-7xl font-bold">Projects</h1>
          <div className="flex items-baseline gap-1">
            <CountUp
              from={0}
              to={30}
              duration={2}
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            />
            <span className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              +
            </span>
          </div>
        </div>
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
                  className="border-radius-full"
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
      {/* Parallax Scrolling Section */}
      <ParallaxSection />
    </>
  );
}

function ParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const services = [
    {
      title: "Web Development",
      description:
        "Building fast, responsive, and scalable web applications using modern frameworks and best practices.",
      icon: "🚀",
    },
    {
      title: "UI/UX Design",
      description:
        "Creating intuitive and beautiful user interfaces that delight users and drive engagement.",
      icon: "🎨",
    },
    {
      title: "API Integration",
      description:
        "Seamlessly connecting your applications with third-party services and building robust APIs.",
      icon: "🔗",
    },
    {
      title: "Performance Optimization",
      description:
        "Optimizing applications for speed, SEO, and core web vitals to ensure the best user experience.",
      icon: "⚡",
    },
  ];

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Floating background elements */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 right-[15%] w-96 h-96 rounded-full bg-pink-500/10 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ y: y1 }}
        className="absolute bottom-20 left-[20%] w-80 h-80 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 max-w-6xl mx-auto px-4 md:px-8"
      >
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-6">
          What I Do
        </h2>
        <p className="text-xl text-gray-400 text-center mb-16 max-w-2xl mx-auto">
          Specialized in building modern web experiences with attention to
          detail
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <span className="text-4xl mb-4 block">{service.icon}</span>
              <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h3 className="text-3xl md:text-5xl font-bold mb-4">
            Let's Build Something Amazing
          </h3>
          <p className="text-gray-400 text-lg mb-8 max-w-xl mx-auto">
            Ready to turn your ideas into reality? Let's collaborate and
            create exceptional digital experiences together.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 font-semibold rounded-full hover:opacity-90 transition-opacity"
          >
            Start a Project
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
          </a>
        </div>
      </motion.div>
    </section>
  );
}
