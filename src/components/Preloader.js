"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    // Refs for the sequence elements
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const img3Ref = useRef(null);
    const logoRef = useRef(null);
    const textWrapperRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // Initial setup: Hide everything
        gsap.set([img1Ref.current, img2Ref.current, img3Ref.current, logoRef.current], { opacity: 0, scale: 1.2 });
        gsap.set(textWrapperRef.current, { opacity: 0 });

        // --- RAPID FIRE SEQUENCE (Movie Trailer Style) ---
        tl
            // Image 1: Flash In & Out
            .to(img1Ref.current, { opacity: 1, duration: 0.1 })
            .to(img1Ref.current, { scale: 1.3, duration: 0.3, ease: "linear" }, "<")
            .to(img1Ref.current, { opacity: 0, duration: 0.1 }, "-=0.1")

            // Image 2: Flash In & Out
            .to(img2Ref.current, { opacity: 1, duration: 0.1 })
            .to(img2Ref.current, { scale: 1.3, duration: 0.3, ease: "linear" }, "<")
            .to(img2Ref.current, { opacity: 0, duration: 0.1 }, "-=0.1")

            // Image 3: Flash In & Out
            .to(img3Ref.current, { opacity: 1, duration: 0.1 })
            .to(img3Ref.current, { scale: 1.3, duration: 0.3, ease: "linear" }, "<")
            .to(img3Ref.current, { opacity: 0, duration: 0.1 }, "-=0.1")

            // THE MAIN EVENT: Logo Crashes In
            .to(logoRef.current, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "power4.out"
            })

            // Text Slides Up behind Logo
            .to(textWrapperRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3")

            // Hold for impact
            .to({}, { duration: 0.8 })

            // REVEAL: Slide Up
            .to(containerRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "power4.inOut"
            });

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>

            {/* Asset Layers (Absolute Centered) */}
            <div className={styles.assetLayer} ref={img1Ref}>
                <Image src="/assets/sketch.png" alt="Sketch" width={300} height={300} className={styles.assetImg} priority />
            </div>
            <div className={styles.assetLayer} ref={img2Ref}>
                <Image src="/assets/pattern.png" alt="Pattern" width={300} height={300} className={styles.assetImg} priority />
            </div>
            <div className={styles.assetLayer} ref={img3Ref}>
                <Image src="/assets/logos.png" alt="Design" width={300} height={300} className={styles.assetImg} priority />
            </div>

            {/* Final Logo State */}
            <div className={styles.finalContent}>
                <div className={styles.logoWrapper} ref={logoRef}>
                    <Image src="/logo.jpg" alt="Izeexo Logo" width={160} height={160} className={styles.logo} priority />
                </div>
                <div className={styles.textWrapper} ref={textWrapperRef}>
                    <h1 className={styles.title}>IZEEXO</h1>
                    <p className={styles.tagline}>VISUALIZING THE EXTRAORDINARY</p>
                </div>
            </div>
        </div>
    );
}
