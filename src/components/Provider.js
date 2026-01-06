"use client";

import { SessionProvider } from "next-auth/react";
import { useState, useEffect } from "react";
import Preloader from "@/components/Preloader";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";

export default function Provider({ children }) {
    // Default to true to prevent content flash, but check storage immediately if possible
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only show preloader once per session
        const hasSeenPreloader = sessionStorage.getItem('hasSeenPreloader');
        if (hasSeenPreloader) {
            setLoading(false); // Skip if already seen
        }
        // If not seen, loading is already true, so preloader runs.
    }, []);

    const handlePreloaderComplete = () => {
        setLoading(false);
        sessionStorage.setItem('hasSeenPreloader', 'true');
    };

    // Safety timeout in case GSAP fails or takes too long
    useEffect(() => {
        if (!loading) return;
        const timer = setTimeout(() => {
            handlePreloaderComplete();
        }, 6000); // 6 seconds max
        return () => clearTimeout(timer);
    }, [loading]);

    return (
        <SessionProvider>
            <CartProvider>
                <CartDrawer />
                {loading && <Preloader onComplete={handlePreloaderComplete} />}
                <div style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease" }}>
                    {children}
                </div>
            </CartProvider>
        </SessionProvider>
    );
}
