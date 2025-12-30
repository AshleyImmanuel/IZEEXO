"use client";

import { useEffect, useRef } from "react";
import styles from "./Preloader.module.css";
import gsap from "gsap";
import Image from "next/image";

export default function Preloader({ onComplete }) {
    const containerRef = useRef(null);
    const blueRef = useRef(null);
    const pinkRef = useRef(null);
    const blackRef = useRef(null);
    const text1Ref = useRef(null);
    const text2Ref = useRef(null);
    const logoGroupRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                if (onComplete) onComplete();
                gsap.set(containerRef.current, { display: "none" });
            }
        });

        // Initial setup
        gsap.set([text1Ref.current, text2Ref.current, logoGroupRef.current], {
            y: 100,
            opacity: 0
        });

        tl
            // --- STEP 1: BLUE LAYER ---
            .to(text1Ref.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            })
            .to(text1Ref.current, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "+=0.2")
            .to(blueRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "expo.inOut"
            })

            // --- STEP 2: PINK LAYER ---
            .to(text2Ref.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.4") // Overlap start
            .to(text2Ref.current, {
                y: -50,
                opacity: 0,
                duration: 0.5,
                ease: "power2.in"
            }, "+=0.2")
            .to(pinkRef.current, {
                yPercent: -100,
                duration: 0.8,
                ease: "expo.inOut"
            })

            // --- STEP 3: BLACK LAYER (FINAL) ---
            .to(logoGroupRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "elastic.out(1, 0.7)"
            }, "-=0.4")

            .to({}, { duration: 1.0 }) // Hold logic

            // --- REVEAL SITE ---
            .to(blackRef.current, {
                yPercent: -100,
                duration: 1.0,
                ease: "power4.inOut"
            });

    }, [onComplete]);

    return (
        <div className={styles.preloader} ref={containerRef}>
            {/* Layers are stacked via z-index. Black is bottom, then Pink, then Blue on top initially */}

            <div className={`${styles.layer} ${styles.black}`} ref={blackRef}>
                <div className={styles.centerContent} ref={logoGroupRef}>
                    <div className={styles.logoWrapper}>
                        <Image src="/logo.jpg" alt="Izeexo" width={180} height={180} className={styles.logo} priority />
                    </div>
                    <h1 className={styles.brandTitle}>IZEEXO</h1>
                    <p className={styles.brandTag}>VISUALIZING THE EXTRAORDINARY</p>
                </div>
            </div>

            <div className={`${styles.layer} ${styles.pink}`} ref={pinkRef}>
                <h2 className={styles.bigText} ref={text2Ref}>ELEGANCE</h2>
            </div>

            <div className={`${styles.layer} ${styles.blue}`} ref={blueRef}>
                <h2 className={styles.bigText} ref={text1Ref}>DESIGN</h2>
            </div>

        </div>
    );
}
