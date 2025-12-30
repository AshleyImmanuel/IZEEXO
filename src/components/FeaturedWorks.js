"use client";

import styles from "./FeaturedWorks.module.css";
import Image from "next/image";
import Link from "next/link";

const works = [
    { id: 1, title: "Modern Brand Identity", category: "Branding", image: "/assets/logos.png" },
    { id: 2, title: "Velvet Evening Gown", category: "Costume Design", image: "/assets/sketch.png" },
    { id: 3, title: "Minimalist Logo Series", category: "Logo Design", image: "/assets/logos.png" },
    { id: 4, title: "Summer Collection", category: "Fashion Design", image: "/assets/pattern.png" },
];

export default function FeaturedWorks() {
    return (
        <section className={styles.section}>
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
