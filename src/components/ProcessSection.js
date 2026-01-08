"use client";

import styles from "./ProcessSection.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        id: "01",
        title: "Concept",
        description: "We start with moodboards, visual exploration, and style direction to define your brand's unique vibe.",
        shape: "circle"
    },
    {
        id: "02",
        title: "Design",
        description: "Refining logos, typography, and vectors into high-fidelity tech packs ready for production.",
        shape: "triangle"
    },
    {
        id: "03",
        title: "Sample",
        description: "Prototyping the physical product or digital storefront to ensure everything fits perfectly.",
        shape: "cube"
    },
    {
        id: "04",
        title: "Drop",
        description: "Launching your brand with hype-building visuals and a seamless checkout experience.",
        shape: "pill"
    }
];

export default function ProcessSection() {
    const sectionRef = useRef(null);
    // ... existing logic ...
    useGSAP(() => {
        const cards = gsap.utils.toArray(`.${styles.stepCard}`);

        // Simple fade up for steps
        cards.forEach((card) => {
            gsap.fromTo(card,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                    }
                }
            )
        })

    }, { scope: sectionRef });

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.heading}>The Process.</h2>
                    <p className={styles.subheading}>From rough sketch to sold out.</p>
                </div>

                <div className={styles.stepsGrid}>
                    {steps.map((step, index) => (
                        <div key={step.id} className={styles.stepCard}>
                            <div className={styles.stepNumber}>{step.id}</div>
                            <h3 className={styles.stepTitle}>{step.title}</h3> {/* Renamed from Discover */}
                            <p className={styles.stepDesc}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
