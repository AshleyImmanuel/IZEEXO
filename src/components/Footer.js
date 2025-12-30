"use client";

import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.brand}>
                    <h2 className={styles.logo}>Izeexo</h2>
                    <p className={styles.tagline}>Visualizing the Extraordinary.</p>
                </div>

                <div className={styles.links}>
                    <div className={styles.column}>
                        <h3>Explore</h3>
                        <Link href="/">Home</Link>
                        <Link href="/store">Store</Link>
                        <Link href="/services">Services</Link>
                        <Link href="/about">About</Link>
                    </div>

                    <div className={styles.column}>
                        <h3>Connect</h3>
                        <a href="https://wa.me/917907314022?text=Hello%20Izeexo,%20I'm%20interested%20in%20your%20design%20services." target="_blank" rel="noopener noreferrer">WhatsApp</a>
                        <a href="https://instagram.com/Izeexo" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://youtube.com/@izeexo?si=DB__yPiCFTqEWWDU" target="_blank" rel="noopener noreferrer">YouTube</a>
                        <a href="mailto:hello@izeexo.com">Email</a>
                    </div>
                </div>

                <div className={styles.copyright}>
                    &copy; {new Date().getFullYear()} Izeexo Design Studio. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
