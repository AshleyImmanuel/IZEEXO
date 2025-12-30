"use client";

import styles from "./ProcessSection.module.css";

export default function ProcessSection() {
    const steps = [
        {
            id: "01",
            title: "Discovery",
            description: "We dive deep into your brand's essence, understanding your goals and audience to build a solid foundation."
        },
        {
            id: "02",
            title: "Creation",
            description: "Our designers craft bespoke visuals, iterating with precision to ensure every pixel aligns with your vision."
        },
        {
            id: "03",
            title: "Launch",
            description: "We deliver final assets and strategies that elevate your brand, ready to make a lasting impact on the world."
        }
    ];

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Our Process</h2>
                <div className={styles.grid}>
                    {steps.map((step) => (
                        <div key={step.id} className={styles.card}>
                            <span className={styles.number}>{step.id}</span>
                            <h3 className={styles.title}>{step.title}</h3>
                            <p className={styles.description}>{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
