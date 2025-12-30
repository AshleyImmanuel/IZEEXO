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
            gsap.to(card, {
                y: "random(-20, 20)",
                duration: "random(2, 4)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: i * 0.2
            });

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
                        Average Design <br /> is Invisible.
                    </h2>
                    <p className={styles.subtitle}>
                        In a crowded digital space, blending in is the fastest way to accept failure.
                        We ensure you stand out.
                    </p>
                </div>

                {/* Floating Cards - Unique "Design Problems" */}
                {/* 1 */}
                <div className={`${styles.floatingCard} ${styles.pos1}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Templates fail to tell your unique story.</p>
                </div>

                {/* 2 */}
                <div className={`${styles.floatingCard} ${styles.pos2}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Users abandon clunky, slow interfaces.</p>
                </div>

                {/* 3 */}
                <div className={`${styles.floatingCard} ${styles.pos3}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Inconsistency creates customer distrust.</p>
                </div>

                {/* 4 */}
                <div className={`${styles.floatingCard} ${styles.pos4}`}>
                    <div className={styles.iconWarning}>⚠️</div>
                    <p>Weak branding limits pricing power.</p>
                </div>
            </div>
        </section>
    );
}
