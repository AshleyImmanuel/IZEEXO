import styles from "./AboutSnippet.module.css";
import Link from "next/link";

export default function AboutSnippet() {
    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.content}>
                    <h2 className={styles.title}>We Design for the Future</h2>
                    <p className={styles.description}>
                        Izeexo is a boutique design studio specializing in visual identity and
                        creative aesthetics. We believe in the power of minimalism and elegance.
                        From bespoke logos to exclusive costume and dress designs, we bring
                        your artistic vision to life with precision and style.
                    </p>
                    <div className={styles.stats}>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>5+</span>
                            <span className={styles.statLabel}>Years Experience</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>100+</span>
                            <span className={styles.statLabel}>Projects Delivered</span>
                        </div>
                        <div className={styles.statBox}>
                            <span className={styles.statNumber}>100%</span>
                            <span className={styles.statLabel}>Client Satisfaction</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
