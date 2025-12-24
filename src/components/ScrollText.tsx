import { useEffect, useRef, useState, useMemo } from "react";

type TextSize = "sm" | "md" | "lg" | "xl";
type MaxWidth = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "full";

interface ScrollTextProps {
    text: string;
    className?: string;
    textSize?: TextSize;
    maxWidth?: MaxWidth;
    easeInOffset?: number; // 0-1, percentage of scroll for fade-in blur (default: 0.1)
    easeOutOffset?: number; // 0-1, percentage of scroll where fade-out starts (default: 0.7)
    scrollStart?: number; // 0-1, how early to start showing content (default: 0.5, higher = earlier)
}

const textSizeClasses: Record<TextSize, string> = {
    sm: "text-xl sm:text-2xl md:text-3xl lg:text-4xl",
    md: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
    lg: "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
    xl: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
};

const maxWidthClasses: Record<MaxWidth, string> = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    "5xl": "max-w-5xl",
    "6xl": "max-w-6xl",
    "7xl": "max-w-7xl",
    full: "max-w-full",
};

interface WordData {
    word: string;
    startIndex: number;
    endIndex: number;
}

export default function ScrollText({
    text,
    className = "",
    textSize = "md",
    maxWidth = "4xl",
    easeInOffset = 0.1,
    easeOutOffset = 0.95,
    scrollStart = 0.5,
}: ScrollTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [highlightedChars, setHighlightedChars] = useState<number>(0);
    const [isInView, setIsInView] = useState(false);
    const [opacity, setOpacity] = useState(1);
    const [blur, setBlur] = useState(0);

    // Split text into words with their character indices
    const words = useMemo(() => {
        const result: WordData[] = [];
        let currentIndex = 0;

        text.split(" ").forEach((word, wordIndex, arr) => {
            result.push({
                word,
                startIndex: currentIndex,
                endIndex: currentIndex + word.length,
            });
            currentIndex += word.length;
            // Add space after word (except for last word)
            if (wordIndex < arr.length - 1) {
                currentIndex += 1; // for the space
            }
        });

        return result;
    }, [text]);

    const totalChars = text.length;

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Calculate scroll progress based on container position
            const containerHeight = containerRef.current.offsetHeight;

            // scrollStart adjusts how early content appears (higher = earlier)
            const startOffset = windowHeight * scrollStart;
            const scrolledIntoView = -rect.top + startOffset;

            // The scrollable height is the container minus one viewport
            // We use the full container height for calculation
            const scrollableHeight = containerHeight - windowHeight + startOffset;

            // Check if we're in the active scroll zone
            const inActiveZone = scrolledIntoView >= 0 && scrolledIntoView <= scrollableHeight;
            // Only show when in active zone, hide completely after
            setIsInView(inActiveZone);

            if (scrolledIntoView >= 0 && scrolledIntoView <= scrollableHeight) {
                // Calculate progress (0 to 1)
                const progress = scrolledIntoView / scrollableHeight;

                // Calculate how many characters should be highlighted
                const charsToHighlight = Math.ceil(progress * totalChars);
                setHighlightedChars(Math.min(charsToHighlight, totalChars));

                // Calculate fade-in blur at the start
                const fadeInBlur = progress < easeInOffset ? (1 - progress / easeInOffset) * 10 : 0;

                // Calculate fade-out after easeOutOffset
                if (progress >= easeOutOffset) {
                    // Start fading out
                    const fadeProgress = (progress - easeOutOffset) / (1 - easeOutOffset);
                    const newOpacity = Math.max(0, 1 - fadeProgress);
                    const fadeOutBlur = fadeProgress * 10;
                    setOpacity(newOpacity);
                    setBlur(fadeOutBlur);
                } else {
                    setOpacity(1);
                    setBlur(fadeInBlur);
                }
            } else if (scrolledIntoView > scrollableHeight) {
                // Fully scrolled through - highlight all and fade out
                setHighlightedChars(totalChars);
                setOpacity(0);
                setBlur(10);
            } else {
                // Not yet in view - highlight none
                setHighlightedChars(0);
                setOpacity(1);
                setBlur(10);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll(); // Initial check

        return () => window.removeEventListener("scroll", handleScroll);
    }, [totalChars, easeInOffset, easeOutOffset, scrollStart]);

    return (
        <div
            ref={containerRef}
            className={`relative ${className}`}
            style={{ height: `${Math.max(980, totalChars * 1.5)}vh` }}
        >
            {isInView && (
                <div
                    className="fixed inset-0 flex items-center justify-center pointer-events-none z-10 transition-all duration-500"
                    style={{ opacity, filter: `blur(${blur}px)` }}
                >
                    <div className={`w-full ${maxWidthClasses[maxWidth]} mx-auto px-8 md:px-12`}>
                        <p className={`${textSizeClasses[textSize]} font-light leading-snug md:leading-normal text-center`}>
                            {words.map(({ word, startIndex }, wordIndex) => (
                                <span key={wordIndex} className="inline-block mr-[0.3em]">
                                    {word.split("").map((char, charIndex) => {
                                        const globalIndex = startIndex + charIndex;
                                        return (
                                            <span
                                                key={charIndex}
                                                className={`inline transition-colors duration-150 ease-out ${
                                                    globalIndex < highlightedChars
                                                        ? "text-white"
                                                        : "text-gray-600/40"
                                                }`}
                                            >
                                                {char}
                                            </span>
                                        );
                                    })}
                                </span>
                            ))}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
