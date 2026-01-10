"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function PrivacyProtection() {
    const [isBlur, setIsBlur] = useState(false);

    useEffect(() => {
        // 1. Prevent Right Click Globally
        const handleContextMenu = (e) => {
            e.preventDefault();
            return false;
        };

        // 2. Prevent Common Screenshot Shortcuts / Print Screen
        const handleKeyDown = (e) => {
            // Print Screen
            if (e.key === "PrintScreen") {
                setIsBlur(true);
                navigator.clipboard.writeText("Screenshots are disabled for privacy.");
                toast("Screenshots are disabled for privacy reasons.", {
                    icon: '🔒',
                    style: {
                        background: '#333',
                        color: '#fff',
                    }
                });
                setTimeout(() => setIsBlur(false), 2000); // Blink effect
            }

            // Ctrl+S (Save), Ctrl+P (Print), Ctrl+Shift+I (DevTools)
            if (
                (e.ctrlKey && (e.key === 'p' || e.key === 's' || e.key === 'u')) ||
                (e.ctrlKey && e.shiftKey && (e.key === 'i' || e.key === 'I'))
            ) {
                e.preventDefault();
                toast("This action is disabled.", { icon: '🔒' });
            }
        };

        // 3. Clear Clipboard on PrintScreen (KeyUp)
        const handleKeyUp = (e) => {
            if (e.key === "PrintScreen") {
                navigator.clipboard.writeText("Screenshots are disabled.");
                setIsBlur(false); // Reset blur if stuck
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);

    if (!isBlur) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '1rem'
        }}>
            <div style={{ fontSize: '3rem' }}>🔒</div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Privacy Protected</h2>
            <p style={{ color: '#666' }}>Screenshots are disabled on this page.</p>
        </div>
    );
}
