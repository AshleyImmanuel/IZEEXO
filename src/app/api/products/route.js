import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");
        const search = searchParams.get("search");

        const where = {};

        if (category && category !== "All") {
            where.category = { name: category };
        }

        if (search) {
            where.OR = [
                { title: { contains: search, mode: 'insensitive' } },
                { description: { contains: search, mode: 'insensitive' } }
            ];
        }

        const products = await prisma.product.findMany({
            where,
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });

        // Normalize data for frontend
        const formattedProducts = products.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category?.name || "Uncategorized",
            image: p.images && p.images.length > 0 ? p.images[0] : null,
            isFeatured: p.isFeatured
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("Products API Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}
