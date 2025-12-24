import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const GLOW_COLOR = "236, 72, 153";

const MagicCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = cardRef.current;
    const glow = glowRef.current;
    if (!element || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Tilt effect
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      gsap.to(element, {
        rotateX,
        rotateY,
        duration: 0.1,
        ease: "power2.out",
        transformPerspective: 1000,
      });

      // Magnetism effect
      const magnetX = (x - centerX) * 0.02;
      const magnetY = (y - centerY) * 0.02;
      gsap.to(element, {
        x: magnetX,
        y: magnetY,
        duration: 0.3,
        ease: "power2.out",
      });

      // Glow position - move the glow element
      gsap.to(glow, {
        left: x,
        top: y,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.to(glow, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${GLOW_COLOR}, 0.4) 0%, rgba(${GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mousemove", handleMouseMove);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      element.removeEventListener("mousemove", handleMouseMove);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 transition-all duration-300 hover:border-purple-500/30 ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 z-0"
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${GLOW_COLOR}, 0.45) 0%, rgba(${GLOW_COLOR}, 0.25) 30%, rgba(${GLOW_COLOR}, 0.1) 50%, transparent 70%)`,
          opacity: 0,
        }}
      />
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  return (
    <>
      {/* Contact Content */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-16 transition-opacity duration-5000 ease-in-out">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
        <p className="text-xl text-gray-400 mb-16 max-w-2xl">
          Have a project in mind? Let's create something amazing together.
        </p>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <MagicCard className="rounded-3xl">
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 rounded-lg border border-white/20 focus:border-white/40 focus:outline-none transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Send Message
              </button>
            </form>
          </MagicCard>

          {/* Contact Info */}
          <div className="space-y-6">
            <MagicCard className="rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a
                href="mailto: l7creationss@gmail.com"
                className="text-gray-300 hover:text-white transition-colors"
              >
                l7creationss@gmail.com
              </a>
            </MagicCard>

            <MagicCard className="rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-300">Kochi ,Kerala</p>
            </MagicCard>

            <MagicCard className="rounded-2xl p-6">
              <h3 className="text-lg font-semibold mb-4">Social</h3>
              <div className="flex gap-4">
                {["GitHub", "Twitter", "LinkedIn", "Dribbble"].map((social) => (
                  <a
                    key={social}
                    href="#"
                    className="px-3 py-1 bg-white/10 rounded-full text-sm hover:bg-white/20 transition-colors"
                  >
                    {social}
                  </a>
                ))}
              </div>
            </MagicCard>
          </div>
        </div>
      </div>
    </>
  );
}
