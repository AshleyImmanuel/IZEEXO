import Link from "next/link";
import styles from "@/styles/legal.module.css";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Terms of Service | Izeexo",
    description: "Terms and conditions for using Izeexo services.",
};

export default function TermsPage() {
    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Terms of Service</h1>
                <p className={styles.lastUpdated}>Last Updated: January 2026</p>
            </div>

            <div className={styles.content}>
                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>1</span>
                        Introduction
                    </h2>
                    <p className={styles.text}>
                        Welcome to Izeexo. By accessing our website and using our services, you agree to comply with and be bound by these terms and conditions. If you do not agree, please do not use our services.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>2</span>
                        Intellectual Property
                    </h2>
                    <p className={styles.text}>
                        All content, designs, graphics, and logos on this site are the property of Izeexo unless otherwise stated. You may not reproduce, distribute, or create derivative works without our express written permission.
                    </p>
                    <p className={styles.text}>
                        Upon purchase of a custom design or logo, ownership rights are transferred to the client as specified in the purchase agreement.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>3</span>
                        Purchases & Refunds
                    </h2>
                    <p className={styles.text}>
                        Due to the digital nature of our products and services, all sales are final. Please review product details and service descriptions carefully before purchasing.
                    </p>
                    <p className={styles.text}>
                        Refunds may be considered on a case-by-case basis at our sole discretion if a product is proven to be defective or not as described.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>4</span>
                        User Accounts
                    </h2>
                    <p className={styles.text}>
                        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. Izeexo reserves the right to terminate accounts that violate these terms.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <span className={styles.sectionNumber}>5</span>
                        Limitation of Liability
                    </h2>
                    <p className={styles.text}>
                        Izeexo shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                    </p>
                </section>

                <div className={styles.divider} />

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Contact Us</h2>
                    <p className={styles.text}>
                        If you have any questions about these Terms, please contact us at:
                    </p>
                    <a href="mailto:contact@izeexo.com" className={styles.link}>contact@izeexo.com</a>
                </section>

                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}
