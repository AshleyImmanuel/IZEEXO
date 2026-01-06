"use client";

import { useState, useRef, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/store/ProductFilters";
import styles from "./page.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StorePage() {
    const containerRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("featured");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // State for data
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dbCategories, setDbCategories] = useState(["All"]);

    // Fetch Initial Data
    useEffect(() => {
        async function init() {
            try {
                const [prodRes, catRes] = await Promise.all([
                    fetch('/api/products'),
                    fetch('/api/admin/categories')
                ]);

                if (prodRes.ok) {
                    const data = await prodRes.json();
                    setProducts(data);
                }

                if (catRes.ok) {
                    const cats = await catRes.json();
                    setDbCategories(["All", ...cats.map(c => c.name)]);
                }
            } catch (error) {
                console.error("Failed to load store data:", error);
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    const maxProductPrice = products.length > 0 ? Math.max(...products.map(p => p.price), 0) : 10000;
    const [priceFilter, setPriceFilter] = useState(10000);

    // Update price filter when products load
    useEffect(() => {
        if (!loading && products.length > 0) {
            setPriceFilter(maxProductPrice);
        }
    }, [loading, products, maxProductPrice]);


    useGSAP(() => {
        if (loading) return; // Don't animate if loading

        // Staggered reveal for products when filter changes or on load
        gsap.from(".product-card-anim", {
            y: 50,
            opacity: 0,
            duration: 0.6,
            delay: 0.2,
            stagger: 0.1,
            ease: "power2.out",
            clearProps: "all"
        });
    }, { scope: containerRef, dependencies: [loading, activeCategory, searchTerm, priceFilter] });

    // Filter & Sort Logic
    const filteredProducts = products
        .filter(product => {
            const matchesCategory = activeCategory === "All" || product.category === activeCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPrice = product.price <= priceFilter;
            return matchesCategory && matchesSearch && matchesPrice;
        })
        .sort((a, b) => {
            if (sortOption === "price-low") return a.price - b.price;
            if (sortOption === "price-high") return b.price - a.price;
            return 0; // featured/default
        });

    const sortLabels = {
        "featured": "Sort by: Featured",
        "price-low": "Price: Low to High",
        "price-high": "Price: High to Low"
    };

    return (
        <main className={styles.main} ref={containerRef}>
            <div className="container">
                <header className={styles.header}>
                    <h1 className={styles.title}>Design Store</h1>
                    <p className={styles.subtitle}>Premium resources for your next project.</p>
                </header>

                <ProductFilters
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    sortOption={sortOption}
                    setSortOption={setSortOption}
                    isSortOpen={isSortOpen}
                    setIsSortOpen={setIsSortOpen}
                    priceFilter={priceFilter}
                    setPriceFilter={setPriceFilter}
                    maxPrice={maxProductPrice}
                    categories={dbCategories}
                    sortLabels={sortLabels}
                />

                {/* Results Grid */}
                <div className={styles.grid}>
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card-anim">
                            <ProductCard product={product} />
                        </div>
                    ))}
                    {filteredProducts.length === 0 && !loading && (
                        <div className={styles.noResults}>
                            <p>No products found matching your criteria.</p>
                            <button
                                className={styles.clearBtn}
                                onClick={() => {
                                    setSearchTerm("");
                                    setActiveCategory("All");
                                    setPriceFilter(maxProductPrice);
                                }}
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}
                    {loading && (
                        <div className={styles.loadingState}>
                            <div className={styles.spinner}></div>
                            <p className={styles.loadingText}>Loading Products...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
