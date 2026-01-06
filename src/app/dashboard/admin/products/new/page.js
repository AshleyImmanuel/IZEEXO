"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { ArrowLeft, Save, Loader2, Plus, X } from "lucide-react";
import Link from "next/link";
import styles from "../../../dashboard.module.css";
import MediaUpload from "@/components/admin/MediaUpload";

export default function AddProductPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);

    // Category Creation State
    const [isCreatingCategory, setIsCreatingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [creatingCatLoading, setCreatingCatLoading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        images: [],
        isFeatured: false
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/admin/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) return;
        setCreatingCatLoading(true);
        try {
            const res = await fetch('/api/admin/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newCategoryName })
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Failed to create category");
            }

            const newCat = await res.json();
            setCategories(prev => [...prev, newCat]);
            setFormData(prev => ({ ...prev, categoryId: newCat.id }));
            setIsCreatingCategory(false);
            setNewCategoryName('');
            toast.success(`Category "${newCat.name}" created!`);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setCreatingCatLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (formData.images.length === 0) {
            toast.error("Please upload at least one image/video");
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/admin/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!res.ok) {
                const error = await res.json();
                throw new Error(error.error || "Failed to create product");
            }

            toast.success("Product created successfully!");
            router.push('/dashboard/admin/products');
            router.refresh();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    return (
        <div className={styles.dashboardPage}>
            <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Link href="/dashboard/admin/products" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', marginBottom: '1rem', fontSize: '0.9rem' }}>
                        <ArrowLeft size={16} />
                        Back to Products
                    </Link>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Add New Product</h1>
                </div>

                <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>

                    {/* Title */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Minimalist Brand Identity"
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
                        />
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                        <textarea
                            name="description"
                            required
                            rows={4}
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Describe the product..."
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                        {/* Price RUPEES */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                required
                                min="0"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="0.00"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem' }}
                            />
                        </div>

                        {/* Category with Create Option */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                            {!isCreatingCategory ? (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <select
                                        name="categoryId"
                                        required
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '1rem', background: '#fff' }}
                                    >
                                        <option value="" disabled>Select a category</option>
                                        {categories.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setIsCreatingCategory(true)}
                                        style={{ whiteSpace: 'nowrap', padding: '0 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#f9fafb', cursor: 'pointer', fontSize: '0.9rem' }}
                                    >
                                        + New
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <input
                                        type="text"
                                        placeholder="New Category Name"
                                        value={newCategoryName}
                                        onChange={(e) => setNewCategoryName(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #2563eb', fontSize: '1rem' }}
                                        autoFocus
                                    />
                                    <button
                                        type="button"
                                        onClick={handleCreateCategory}
                                        disabled={creatingCatLoading}
                                        style={{ padding: '0 1rem', borderRadius: '8px', border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}
                                    >
                                        {creatingCatLoading ? <Loader2 size={16} className={styles.spin} /> : 'Add'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsCreatingCategory(false)}
                                        style={{ padding: '0 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer' }}
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Media Upload */}
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Media (Images & Videos)</label>
                        <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '0.5rem' }}>Upload as many photos/videos as you want.</p>
                        <MediaUpload mediaUrls={formData.images} onUpdate={(urls) => setFormData(prev => ({ ...prev, images: urls }))} />
                    </div>

                    {/* Featured Checkbox */}
                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                name="isFeatured"
                                checked={formData.isFeatured}
                                onChange={handleChange}
                                style={{ width: '18px', height: '18px' }}
                            />
                            <span style={{ fontWeight: '500' }}>Mark as Featured Product</span>
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: '#111',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? <Loader2 size={20} className={styles.spin} /> : <Save size={20} />}
                        {loading ? 'Creating...' : 'Create Product'}
                    </button>

                </form>
            </div>
            <style jsx global>{`
                .${styles.spin} {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
