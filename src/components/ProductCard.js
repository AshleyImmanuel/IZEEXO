"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product }) {
    return (
        <Link href={`/store/${product.id}`} className={styles.card}>
            <div className={styles.imagePlaceholder}>
                {product.image ? (
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={styles.productImage}
                        style={{ objectFit: 'cover' }}
                    />
                ) : (
                    product.title
                )}
            </div>
            <div className={styles.info}>
                <span className={styles.category}>{product.category}</span>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.price}>₹{product.price.toLocaleString("en-IN")}</p>
            </div>
        </Link>
    );
}
