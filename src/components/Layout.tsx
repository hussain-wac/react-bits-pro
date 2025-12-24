import { Menu, X } from "lucide-react";
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
                <button className="md:hidden text-white z-[10000] relative p-2 cursor-pointer" onClick={toggleMenu}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <>
                        {/* Solid backdrop layer */}
                        <div
                            className="fixed inset-0 bg-black z-[9998] md:hidden"
                            onClick={toggleMenu}
                        />

                        {/* Menu content */}
                        <div
                            className="fixed inset-0 z-[9999] md:hidden flex items-center justify-center"
                            style={{ background: '#000000' }}
                        >
                            {/* Subtle gradient background */}
                            <div
                                className="absolute inset-0 opacity-20"
                                style={{
                                    background: 'radial-gradient(circle at 50% 50%, rgba(138, 92, 255, 0.3), transparent 60%)',
                                }}
                            />

                            {/* Menu container */}
                            <nav className="relative z-10 flex flex-col items-center gap-6 px-8">
                                <Link
                                    to="/"
                                    className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-200 py-2"
                                    onClick={toggleMenu}
                                >
                                    Home
                                </Link>
                                <div className="w-16 h-px bg-white/10" />
                                <Link
                                    to="/about"
                                    className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-200 py-2"
                                    onClick={toggleMenu}
                                >
                                    About
                                </Link>
                                <div className="w-16 h-px bg-white/10" />
                                <Link
                                    to="/projects"
                                    className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-200 py-2"
                                    onClick={toggleMenu}
                                >
                                    Projects
                                </Link>
                                <div className="w-16 h-px bg-white/10" />
                                <Link
                                    to="/contact"
                                    className="text-xl font-semibold text-white hover:text-purple-400 transition-colors duration-200 py-2"
                                    onClick={toggleMenu}
                                >
                                    Contact
                                </Link>
                            </nav>

                            {/* Subtle decorative elements */}
                            <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
                            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl" />
                        </div>
                    </>
                )}
            </nav>
            {/* Main Content Area */}
            <main className="relative z-10 pt-20">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
