"use client";

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import styles from './CustomSelect.module.css';

export default function CustomSelect({
    options = [],
    value = '',
    onChange,
    placeholder = "Select an option",
    searchable = false
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState('');
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find(opt => opt.value === value);

    const filteredOptions = options.filter(opt =>
        opt.label.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
        setSearch('');
    };

    return (
        <div className={styles.selectContainer} ref={containerRef}>
            <button
                type="button"
                className={styles.selectButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={!selectedOption ? styles.placeholder : ''}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronDown
                    size={16}
                    className={`${styles.chevron} ${isOpen ? styles.open : ''}`}
                />
            </button>

            <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
                {searchable && (
                    <div style={{ position: 'sticky', top: 0, background: 'white' }}>
                        <input
                            type="text"
                            placeholder="Search..."
                            className={styles.searchInput}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            autoFocus={isOpen}
                        />
                    </div>
                )}

                {filteredOptions.length > 0 ? (
                    filteredOptions.map((opt) => (
                        <div
                            key={opt.value}
                            className={`${styles.option} ${value === opt.value ? styles.selected : ''}`}
                            onClick={() => handleSelect(opt.value)}
                        >
                            {opt.label}
                            {value === opt.value && <Check size={14} className={styles.check} />}
                        </div>
                    ))
                ) : (
                    <div className={styles.noResults}>No options found</div>
                )}
            </div>
        </div>
    );
}
