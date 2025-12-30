"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductFilters from "@/components/store/ProductFilters";
import styles from "./page.module.css";

// Mock Data
const categories = ["All", "Logo Design", "Fashion Design", "Branding"];
const products = [
    { id: 1, title: "Modern Logo Pack", price: 3999, category: "Logo Design", image: "/assets/logos.png" },
    { id: 2, title: "Gala Dress Sketch", price: 6999, category: "Fashion Design", image: "/assets/sketch.png" },
    { id: 3, title: "Costume Pattern Set", price: 9500, category: "Fashion Design", image: "/assets/pattern.png" },
    { id: 4, title: "Minimalist Brand Guide", price: 2999, category: "Branding", image: "/assets/logos.png" },
    { id: 5, title: "Abstract Icon Set", price: 1499, category: "Logo Design", image: "/assets/logos.png" },
    { id: 6, title: "Summer Dress Blueprint", price: 4500, category: "Fashion Design", image: "/assets/sketch.png" },
];

export default function StorePage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("featured");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [priceFilter, setPriceFilter] = useState(10000); // Default high max price
    const maxProductPrice = Math.max(...products.map(p => p.price), 0);

    // Update filter logic
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
        <main className={styles.main}>
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
                    categories={categories}
                    sortLabels={sortLabels}
                />

                {/* Results Grid */}
                <div className={styles.grid}>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                    {filteredProducts.length === 0 && (
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
                </div>
            </div>
        </main>
    );
}
