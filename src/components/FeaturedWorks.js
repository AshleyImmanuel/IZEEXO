"use client";

import styles from "./FeaturedWorks.module.css";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const works = [
    { id: 1, title: "Modern Brand Identity", category: "Branding", image: "/assets/logos.png" },
    { id: 2, title: "Velvet Evening Gown", category: "Costume Design", image: "/assets/sketch.png" },
    { id: 3, title: "Minimalist Logo Series", category: "Logo Design", image: "/assets/logos.png" },
    { id: 4, title: "Summer Collection", category: "Fashion Design", image: "/assets/pattern.png" },
];

export default function FeaturedWorks() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse"
            }
        });

        tl.from(`.${styles.header}`, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        })
            .from(`.${styles.marqueeWrapper}`, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6");

    }, { scope: sectionRef });

    return (
        <section className={styles.section} ref={sectionRef}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Selected Works</h2>
                    <Link href="/store" className={styles.viewAll}>
                        View All Projects &rarr;
                    </Link>
                </div>

                <div className={styles.marqueeWrapper}>
                    <div className={styles.marqueeTrack}>
                        {/* Double the items for seamless loop */}
                        {[...works, ...works].map((work, index) => (
                            <div key={`${work.id}-${index}`} className={styles.card}>
                                <div className={styles.imagePlaceholder}>
                                    <Image
                                        src={work.image}
                                        alt={work.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 300px"
                                        className={styles.workImage}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <div className={styles.info}>
                                    <h3 className={styles.workTitle}>{work.title}</h3>
                                    <p className={styles.category}>{work.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
