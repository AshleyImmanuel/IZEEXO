"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const logoRef = useRef(null);
    const textRef = useRef(null);
    const taglineRef = useRef(null);
    const lineRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // Initial State
        gsap.set(textRef.current, { y: 20, opacity: 0 });
        gsap.set(taglineRef.current, { opacity: 0 });
        gsap.set(lineRef.current, { width: 0 });

        // Animation Sequence
        tl
            // 1. Logo Pops In & Rotates slightly
            .fromTo(logoRef.current,
                { scale: 0, rotation: -10, opacity: 0 },
                { scale: 1, rotation: 0, opacity: 1, duration: 1.2, ease: "elastic.out(1, 0.5)" }
            )
            // 2. Line expands
            .to(lineRef.current, { width: "100px", duration: 0.6, ease: "power2.out" }, "-=0.4")
            // 3. Name reveals (Fade + Slide)
            .to(textRef.current, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" })
            // 4. Tagline fades in
            .to(taglineRef.current, { opacity: 1, duration: 0.5 }, "-=0.3")
            // 5. Hold
            .to({}, { duration: 0.5 })
            // 6. Exit Animation: Content flies up rapidly
            .to([logoRef.current, textRef.current, taglineRef.current, lineRef.current], {
                y: -50, opacity: 0, duration: 0.4, ease: "back.in(1.7)"
            })
            // 7. Curtain Reveal (Slide Up)
            .to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut"
            });

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            <div className={styles.content}>
                <div className={styles.logoWrapper}>
                    <Image
                        ref={logoRef}
                        src="/logo.jpg"
                        alt="Izeexo Logo"
                        width={120}
                        height={120}
                        priority
                        className={styles.logo}
                    />
                </div>

                <div className={styles.line} ref={lineRef}></div>

                <div className={styles.textWrapper}>
                    <h1 className={styles.brandName} ref={textRef}>IZEEXO</h1>
                    <p className={styles.tagline} ref={taglineRef}>DESIGN STUDIO</p>
                </div>
            </div>
        </div>
    );
}
