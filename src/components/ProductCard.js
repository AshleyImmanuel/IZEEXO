
"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent navigation if wrapped in Link
        addToCart(product);
    };

    const handleBuyNow = (e) => {
        e.preventDefault();
        const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+917907314022';
        const message = `Hi! I'm interested in buying:\n\n*${product.title}*\nCategory: ${product.category}\nPrice: ₹${product.price.toLocaleString("en-IN")}\n\nCould you please provide more details?`;
        const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={product.image || '/assets/placeholder.png'}
                    alt={product.title}
                    fill
                    className={styles.image}
                />
                <div className={styles.overlay}>
                    <button className={styles.buyNowBtn} onClick={handleBuyNow}>
                        Buy Now
                    </button>
                    <button className={styles.addToCartBtn} onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.title}</h3>
                <div className={styles.bottomRow}>
                    <span className={styles.price}>₹{product.price.toLocaleString("en-IN")}</span>
                </div>
            </div>
        </div>
    );
}
