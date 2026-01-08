"use client";

import { useState, useEffect } from "react";
import styles from "../dashboard.module.css";
import DashboardLoader from "@/components/dashboard/DashboardLoader";

export default function DesignsPage() {
    const [designs, setDesigns] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDesigns() {
            try {
                const response = await fetch("/api/dashboard/projects"); // Keep API endpoint same for now or rename later
                const data = await response.json();
                if (response.ok) {
                    setDesigns(data.projects || []);
                } else {
                    console.error("Failed to fetch designs:", data.error);
                }
            } catch (error) {
                console.error("Failed to fetch designs:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchDesigns();
    }, []);

    if (loading) return <div className={styles.loading}>Loading designs...</div>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>My Designs</h1>

            {designs.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No designs found.</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {designs.map((project) => (
                        <div key={project.id} className={styles.projectCard}>
                            <div className={styles.projectHeader}>
                                <h3>{project.designType}</h3>
                                <div className={styles.statusContainer}>
                                    <span className={`${styles.status} ${styles[project.status.toLowerCase()]}`}>
                                        {project.status === 'PENDING' ? 'Verifying Request' :
                                            project.status === 'IN_PROGRESS' ? 'Design in Progress' :
                                                project.status === 'COMPLETED' ? 'Project Completed' : project.status}
                                    </span>
                                    {project.status === 'PENDING' && (
                                        <p className={styles.statusHelper}>
                                            We are reviewing your request requirements. This usually takes 24-48 hours.
                                        </p>
                                    )}
                                </div>
                            </div>
                            <p className={styles.projectDescription}>{project.description}</p>
                            <div className={styles.projectMeta}>
                                <span>Budget: {project.budget || "Not specified"}</span>
                                <span>Submitted: {new Date(project.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
