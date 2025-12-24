import { lazy, Suspense, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import GooeyNav from "./GooeyNav";

// Lazy load ColorBends for better initial performance
const ColorBends = lazy(() => import("./ColorBends"));

const Layout = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showColorBends, setShowColorBends] = useState(false);
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    // Lazy load ColorBends to prevent initial lag
    useEffect(() => {
        // Use requestIdleCallback if available, otherwise fallback to setTimeout
        const loadColorBends = () => {
            setShowColorBends(true);
        };

        if ('requestIdleCallback' in window) {
            const idleId = requestIdleCallback(loadColorBends, { timeout: 1000 });
            return () => cancelIdleCallback(idleId);
        } else {
            const timer = setTimeout(loadColorBends, 2000);
            return () => clearTimeout(timer);
        }
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    return (
        <div className="bg-black text-white relative min-h-screen font-sans overflow-x-hidden">
            {/* Shared Background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none transition-opacity duration-5000 ease-in-out"
                style={{ opacity: showColorBends ? 1 : 0 }}
            >
                {showColorBends && (
                    <Suspense fallback={null}>
                        <ColorBends
                            style={{ width: "100%", height: "100%" }}
                            colors={["#ff5c7a", "#8a5cff", "#00ffd1"]}
                            rotation={90}
                            speed={0.45}
                            scale={1.5}
                            frequency={1.8}
                            warpStrength={1}
                            mouseInfluence={0.8}
                            parallax={0.6}
                            noise={0.1}
                        />
                    </Suspense>
                )}
            </div>

            {/* Shared Navigation */}
            <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-6 md:p-8 bg-black/30 backdrop-blur-md z-50">
                <Link to="/" className="text-2xl font-bold" onClick={() => setIsMenuOpen(false)}>
                    ZainDev
                </Link>
                <div className="hidden md:block">
                    <GooeyNav
                        items={[
                            { label: "Home", to: "/" },
                            { label: "About", to: "/about" },
                            { label: "Projects", to: "/projects" },
                            { label: "Contact", to: "/contact" },
                        ]}
                    />
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white z-[10000] relative p-3 cursor-pointer rounded-lg hover:bg-white/10 transition-colors"
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                >
                    <div className="relative w-6 h-6">
                        <span
                            className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                                isMenuOpen ? 'top-3 rotate-45' : 'top-1'
                            }`}
                        />
                        <span
                            className={`absolute left-0 top-3 w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                                isMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
                            }`}
                        />
                        <span
                            className={`absolute left-0 w-6 h-0.5 bg-white transition-all duration-300 ease-out ${
                                isMenuOpen ? 'top-3 -rotate-45' : 'top-5'
                            }`}
                        />
                    </div>
                </button>

            </nav>

            {/* Mobile Menu Sidebar */}
            <div className="md:hidden">
                {/* Backdrop overlay */}
                <div
                    className={`fixed inset-0 bg-black/70 z-[10000] transition-opacity duration-300 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                    onClick={toggleMenu}
                />

                {/* Sidebar panel */}
                <div
                    className={`fixed top-0 right-0 h-full w-72 bg-black/80 backdrop-blur-xl z-[10001] transform transition-transform duration-300 ease-out ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Gradient border on left edge */}
                    <div className="absolute top-0 left-0 w-[1px] h-full bg-gradient-to-b from-purple-500/50 via-pink-500/30 to-transparent" />

                    {/* Close button */}
                    <div className="flex justify-end p-6">
                        <button
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                            onClick={toggleMenu}
                            aria-label="Close menu"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="px-6 pb-6 border-b border-white/10">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            ZainDev
                        </span>
                    </div>

                    {/* Menu links */}
                    <nav className="p-6 flex flex-col gap-2">
                        {[
                            { to: "/", label: "Home" },
                            { to: "/about", label: "About" },
                            { to: "/projects", label: "Projects" },
                            { to: "/contact", label: "Contact" },
                        ].map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                className="py-3 px-4 text-lg font-medium text-white hover:text-purple-400 rounded-xl hover:bg-white/5 active:bg-white/10 transition-colors"
                                onClick={toggleMenu}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10">
                        <p className="text-sm text-gray-500 text-center">Portfolio 2024</p>
                    </div>

                    {/* Subtle glow effects */}
                    <div className="absolute top-1/4 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="absolute bottom-1/4 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-3xl pointer-events-none" />
                </div>
            </div>
            {/* Main Content Area */}
            <main className="relative z-10 pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
