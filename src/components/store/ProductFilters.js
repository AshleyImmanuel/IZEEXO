"use client";

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
    priceFilter,
    setPriceFilter,
    maxPrice,
    categories,
    sortLabels
}) {
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

                {/* Price Range Slider */}
                <div className={styles.sliderWrapper}>
                    <div className={styles.sliderHeader}>
                        <span className={styles.sliderLabel}>Max Price</span>
                        <span className={styles.sliderValue}>₹{priceFilter.toLocaleString("en-IN")}</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max={maxPrice}
                        step="100"
                        value={priceFilter}
                        onChange={(e) => setPriceFilter(Number(e.target.value))}
                        className={styles.rangeInput}
                    />
                </div>

                {/* Custom Sort Dropdown */}
                <div className={styles.sortWrapper}>
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
        </>
    );
}
