"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Hero.module.css";
import Shuffle from "@/components/ui/Shuffle";

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    return (
        <section className={styles.hero}>
            <div className={`${styles.content} ${loaded ? styles.visible : ""}`}>
                <span className={styles.badge}>Premium Design Studio</span>
                <h1 className={styles.title}>
                    Elevate Your Brand <br /> <span style={{ display: 'inline-block', padding: '0.5rem' }}>with</span> <span className={styles.highlight}>
                        <Shuffle tag="span" text="Elegant Design" style={{ display: 'inline-block' }} />
                    </span>
                </h1>
                <p className={styles.subtitle}>
                    We craft stunning visuals, logos, and websites that leave a lasting impression.
                    Minimalist, professional, and tailored to your vision.
                </p>

                <div className={styles.actions}>
                    <Link href="/store" className="btn btn-primary">
                        Explore Store
                    </Link>
                    <Link href="/services" className="btn btn-outline">
                        Request Custom Design
                    </Link>
                </div>
            </div>

            {/* Decorative Background Element */}
            <div className={`${styles.bgCircle} ${loaded ? styles.bgVisible : ""}`} />
        </section>
    );
}
