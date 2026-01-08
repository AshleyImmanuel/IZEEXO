"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import DashboardLoader from "@/components/dashboard/DashboardLoader";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/auth/signin?callbackUrl=/dashboard");
        }
    }, [status, router]);


    // Unified render structure to ensure CSS is always "used" preventing preload warnings
    return (
        <div className={styles.dashboardLayout}>
            {status === "loading" ? (
                <DashboardLoader text="AUTHENTICATING..." />
            ) : !session ? (
                null // Will redirect via useEffect
            ) : (
                <>
                    <Navbar />
                    <main className={styles.mainWrapper}>
                        {children}
                    </main>
                </>
            )}
        </div>
    );
}
