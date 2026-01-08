"use client";

export default function Template({ children }) {
    return (
        <div className="page-transition">
            {children}
            <style jsx>{`
                .page-transition {
                    animation: fadeSlideIn 0.75s ease-out;
                }

                @keyframes fadeSlideIn {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
