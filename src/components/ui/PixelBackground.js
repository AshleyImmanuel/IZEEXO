
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function PixelBackground({ isHovered, isActive }) {
    const containerRef = useRef(null);
    const pixelsRef = useRef([]);

    // Grid configuration
    const blockSize = 5; // Size of each pixel
    // We'll generate enough to cover typical button. 
    // Optimization: dynamic calculation could be better but heavy. 
    // Let's assume a fixed dense grid and rely on overflow: hidden.
    const gap = 0;

    // Create a mesh of pixels. 20 rows * 40 columns should cover even large buttons (100px height * 200px width). 
    // Button is ~44px high, so 10 rows. ~120px wide, so 24 columns.
    const rows = 12;
    const cols = 30;

    useEffect(() => {
        if (!containerRef.current) return;

        const pixels = pixelsRef.current;

        if (isHovered || isActive) {
            gsap.to(pixels, {
                opacity: 1,
                duration: 0.1,
                stagger: {
                    amount: 0.3,
                    grid: [rows, cols],
                    from: "center", // or "random"
                    ease: "power2.in"
                }
            });
        } else {
            gsap.to(pixels, {
                opacity: 0,
                duration: 0.2, // faster fade out
                stagger: {
                    amount: 0.15,
                    grid: [rows, cols],
                    from: "random",
                    ease: "power2.out"
                }
            });
        }
    }, [isHovered, isActive]);

    return (
        <div
            ref={containerRef}
            style={{
                position: 'absolute',
                top: '-50%',
                left: '-50%',
                width: '200%', // Oversize to ensure coverage
                height: '200%',
                display: 'flex',
                flexWrap: 'wrap',
                pointerEvents: 'none',
                zIndex: 0,
                transform: 'rotate(-10deg)', // Slight angle for dynamic feel
            }}
        >
            {[...Array(rows * cols)].map((_, i) => (
                <div
                    key={i}
                    ref={el => pixelsRef.current[i] = el}
                    style={{
                        width: `${100 / cols}%`,
                        height: `${100 / rows}%`,
                        backgroundColor: '#060010', // Dark color
                        opacity: 0,
                    }}
                />
            ))}
        </div>
    );
}
