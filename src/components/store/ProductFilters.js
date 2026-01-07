"use client";

import { useEffect, useRef } from "react";
import styles from "@/app/store/page.module.css";

export default function ProductFilters({
    activeCategory,
    setActiveCategory,
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption,
    isSortOpen,
    setIsSortOpen,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
    categories,
    sortLabels
}) {
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        }

        if (isSortOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSortOpen, setIsSortOpen]);
    return (
        <>
            {/* Controls Section */}
            <div className={styles.controls}>
                {/* Search */}
                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        placeholder="Search products..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className={styles.searchIconWrapper}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                </div>


                {/* Price Range Buttons (Amazon-style) */}
                <div className={styles.priceRangeWrapper}>
                    <label className={styles.priceLabel}>Price Range</label>
                    <div className={styles.priceButtons}>
                        <button
                            className={`${styles.priceRangeBtn} ${minPrice === 0 && maxPrice === 1000 ? styles.activeRange : ''}`}
                            onClick={() => { setMinPrice(0); setMaxPrice(1000); }}
                        >
                            Under ₹1,000
                        </button>
                        <button
                            className={`${styles.priceRangeBtn} ${minPrice === 1000 && maxPrice === 2000 ? styles.activeRange : ''}`}
                            onClick={() => { setMinPrice(1000); setMaxPrice(2000); }}
                        >
                            ₹1,000 - ₹2,000
                        </button>
                        <button
                            className={`${styles.priceRangeBtn} ${minPrice === 2000 && maxPrice === 5000 ? styles.activeRange : ''}`}
                            onClick={() => { setMinPrice(2000); setMaxPrice(5000); }}
                        >
                            ₹2,000 - ₹5,000
                        </button>
                        <button
                            className={`${styles.priceRangeBtn} ${minPrice === 5000 && maxPrice === 10000 ? styles.activeRange : ''}`}
                            onClick={() => { setMinPrice(5000); setMaxPrice(10000); }}
                        >
                            ₹5,000 - ₹10,000
                        </button>
                        <button
                            className={`${styles.priceRangeBtn} ${minPrice === 10000 && maxPrice === 20000 ? styles.activeRange : ''}`}
                            onClick={() => { setMinPrice(10000); setMaxPrice(20000); }}
                        >
                            ₹10,000 - ₹20,000
                        </button>
                        <button
                            className={`${styles.priceRangeBtn} ${minPrice === 20000 ? styles.activeRange : ''}`}
                            onClick={() => { setMinPrice(20000); setMaxPrice(1000000); }}
                        >
                            ₹20,000 & Above
                        </button>
                    </div>
                </div>

                {/* Custom Sort Dropdown */}
                <div className={styles.sortWrapper} ref={dropdownRef}>
                    <button
                        className={styles.sortButton}
                        onClick={() => setIsSortOpen(!isSortOpen)}
                    >
                        {sortLabels[sortOption]}
                        <svg
                            className={`${styles.chevron} ${isSortOpen ? styles.rotate : ''}`}
                            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </button>

                    {isSortOpen && (
                        <div className={styles.dropdownMenu}>
                            {Object.entries(sortLabels).map(([value, label]) => (
                                <button
                                    key={value}
                                    className={`${styles.dropdownItem} ${sortOption === value ? styles.selected : ''}`}
                                    onClick={() => {
                                        setSortOption(value);
                                        setIsSortOpen(false);
                                    }}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Categories */}
            <div className={styles.categorySection}>
                <h3 className={styles.categoryLabel}>Categories</h3>
                <div className={styles.filterBar}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
                            onClick={() => setActiveCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
