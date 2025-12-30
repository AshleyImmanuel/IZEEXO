"use client";

import styles from "./ProblemSection.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProblemSection() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.floatingCard}`);

        cards.forEach((card, i) => {
            // Random float effect for "alive" feel
            gsap.to(card, {
                y: "random(-20, 20)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });

            // Scroll parallax
            gsap.to(card, {
                yPercent: i % 2 === 0 ? -20 : 20,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1
                }
            });
        });

    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.container}>
                <div className={styles.centerContent}>
                    <h2 className={styles.title}>
                        The Silent Killers <br /> of Brand Growth.
                    </h2>
                    <p className={styles.subtitle}>
                        Don't let invisible friction slow down your momentum.
                    </p>
                </div>

                {/* Floating Cards - Re-positioned to not overlap text */}
                {/* 1 */}
                <div className={`${styles.floatingCard} ${styles.pos1}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Inconsistent visual identity confuses customers.</p>
                </div>

                {/* 2 */}
                <div className={`${styles.floatingCard} ${styles.pos2}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Generic templates blend into the noise.</p>
                </div>

                {/* 3 */}
                <div className={`${styles.floatingCard} ${styles.pos3}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Slow user experience kills conversions.</p>
                </div>

                {/* 4 */}
                <div className={`${styles.floatingCard} ${styles.pos4}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Hidden tech debt limits scalability.</p>
                </div>
            </div>
        </section>
    );
}
