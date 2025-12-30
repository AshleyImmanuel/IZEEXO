"use client";

import styles from "@/app/about/page.module.css";

export default function ValuesSection() {
    const values = [
        { title: "Innovation", desc: "Pushing boundaries with every pixel." },
        { title: "Elegance", desc: "Beauty in simplicity and precision." },
        { title: "Integrity", desc: "Honest, transparent collaboration." },
        { title: "Impact", desc: "Design that drives meaningful change." }
    ];

    return (
        <section className={styles.valuesSection}>
            <h2 className={styles.sectionTitle}>Core Values</h2>
            <div className={styles.valuesGrid}>
                {values.map((item, i) => (
                    <div key={i} className={styles.valueCard}>
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
