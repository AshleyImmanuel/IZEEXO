"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    const stats = [
        { label: "Years Experience", value: "5+" },
        { label: "Projects Delivered", value: "100+" },
        { label: "Awards Won", value: "12" },
        { label: "Global Clients", value: "40+" },
    ];

    return (
        <main className={styles.main}>
            <div className={`container ${styles.container}`}>

                {/* Hero Section */}
                <section className={`${styles.hero} ${loaded ? styles.visible : ""}`}>
                    <div className={styles.heroContent}>
                        <span className={styles.badge}>Our Story</span>
                        <h1 className={styles.title}>Visualizing the <br /> <span className={styles.highlight}>Extraordinary</span></h1>
                        <p className={styles.lead}>
                            We are Izeexo, a design collective dedicated to crafting premium digital experiences
                            and exclusive fashion statements.
                        </p>
                    </div>
                </section>

                {/* Stats Grid */}
                <section className={styles.statsSection}>
                    <div className={styles.statsGrid}>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${styles.statCard} ${loaded ? styles.cardVisible : ""}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <span className={styles.statValue}>{stat.value}</span>
                                <span className={styles.statLabel}>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Content Cards */}
                <section className={styles.content}>
                    <div className={`${styles.card} ${loaded ? styles.cardVisible : ""}`} style={{ transitionDelay: '400ms' }}>
                        <h2>Our Philosophy</h2>
                        <p>
                            We believe design is not just about how things look, but how they work.
                            Our approach is rooted in clarity, minimalism, and purpose. We strip away
                            the non-essential to reveal the core identity of our clients.
                        </p>
                        <div className={styles.decorativeLine}></div>
                    </div>

                    <div className={`${styles.card} ${styles.darkCard} ${loaded ? styles.cardVisible : ""}`} style={{ transitionDelay: '600ms' }}>
                        <h2>What We Do</h2>
                        <p>
                            From brand strategy and logo design to exclusive fashion pieces,
                            we provide a holistic approach to creative direction. We partner with
                            ambitious visionaries and established brands to tell their stories
                            through visual art and design.
                        </p>
                    </div>
                </section>

                <VisionSection />
                <ValuesSection />

            </div>
        </main>
    );
}
