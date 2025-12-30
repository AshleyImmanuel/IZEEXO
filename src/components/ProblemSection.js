"use client";

import styles from "./ProblemSection.module.css";
// Animations removed as requested ("no animation or any cool stuff")

export default function ProblemSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.centerContent}>
                    <h2 className={styles.title}>
                        Bad Design Kills <br /> Fashion Labels.
                    </h2>
                    <p className={styles.subtitle}>
                        Your clothing needs a story. Don't let a weak identity ruin your collection.
                    </p>
                </div>
                {/* Floating cards removed per user request */}
            </div>
        </section>
    );
}
