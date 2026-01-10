import Link from "next/link";
import styles from "@/styles/legal.module.css";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Privacy Policy | Izeexo",
    description: "How we handle your data at Izeexo.",
};

export default function PrivacyPage() {
    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Privacy Policy</h1>
                <p className={styles.lastUpdated}>Last Updated: January 2026</p>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>1</span>
                        Information We Collect
                    </h2>
                    <p className={styles.text}>
                        We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This includes:
                    </p>
                    <ul className={styles.list}>
                        <li>Personal identification information (Name, email address, phone number).</li>
                        <li>Payment information and billing address.</li>
                        <li>Order history and design preferences.</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>2</span>
                        How We Use Your Data
                    </h2>
                    <p className={styles.text}>
                        Your data is used to process transactions, improve our services, and communicate with you about updates or offers. Specifically, we use your information to:
                    </p>
                    <ul className={styles.list}>
                        <li>Process and fulfill your design orders.</li>
                        <li>Provide customer support and resolve issues.</li>
                        <li>Send you technical notices, updates, and support messages.</li>
                    </ul>
                    <p className={styles.text}>
                        We do <strong>not</strong> sell your personal data to third parties.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>3</span>
                        Cookies
                    </h2>
                    <p className={styles.text}>
                        We use cookies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>4</span>
                        Data Security
                    </h2>
                    <p className={styles.text}>
                        We implement appropriate technical and organizational measures to protect specific personal data against unauthorized or unlawful processing and against accidental loss, destruction, or damage.
                    </p>
                </section>

                <div className={styles.divider} />

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Us</h2>
                    <p className={styles.text}>
                        If you have any questions about this Privacy Policy, please contact us at:
                    </p>
                    <a href="mailto:suryadevpm8@gmail.com" className={styles.link}>suryadevpm8@gmail.com</a>
                </section>

                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
