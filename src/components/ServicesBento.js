"use client";

import styles from "./ServicesBento.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesBento() {
    const containerRef = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.card}`);

        gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            }
        );
    }, { scope: containerRef });

    return (
        <section className={styles.section} ref={containerRef}>
            <div className={styles.heading}>
                <h2 className={styles.title}>What We Create</h2>
                <p className={styles.subtitle}>Tailored design services for fashion & lifestyle brands.</p>
            </div>

            <div className={styles.grid}>
                {/* 1. Large Feature - Brand Identity */}
                <div className={`${styles.card} ${styles.large}`}>
                    <div className={styles.content}>
                        <div className={styles.icon}>B</div>
                        <h3 className={styles.cardTitle}>Brand Identity & Logos</h3>
                        <p className={styles.cardDesc}>
                            We craft iconic logos and visual systems that define your label.
                            From tags to typography, we ensure your brand is instantly recognizable.
                        </p>
                    </div>
                    <div className={styles.graphicBox} />
                </div>

                {/* 2. Normal - Apparel Design */}
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.icon}>A</div>
                        <h3 className={styles.cardTitle}>Apparel Design</h3>
                        <p className={styles.cardDesc}>
                            From moodboards and sketches to technical packs for production.
                        </p>
                    </div>
                </div>

                {/* 3. Normal - Merch */}
                <div className={styles.card}>
                    <div className={styles.content}>
                        <div className={styles.icon}>M</div>
                        <h3 className={styles.cardTitle}>Custom Merch</h3>
                        <p className={styles.cardDesc}>
                            High-quality streetwear and merchandise design that sells out.
                        </p>
                    </div>
                    <div className={styles.graphicLine} />
                </div>

                {/* 4. Large Feature - Web Storefronts */}
                <div className={`${styles.card} ${styles.large}`} style={{ gridColumn: 'span 2' }}>
                    <div className={styles.content}>
                        <div className={styles.icon}>W</div>
                        <h3 className={styles.cardTitle}>Web Storefronts</h3>
                        <p className={styles.cardDesc}>
                            We build sleek, high-converting e-commerce experiences (Shopify/Next.js)
                            specifically tailored for fashion drops and collections.
                        </p>
                    </div>
                    <div className={styles.graphicBox} style={{ left: '2rem', right: 'auto', background: '#000' }} />
                </div>
            </div>
        </section>
    );
}
