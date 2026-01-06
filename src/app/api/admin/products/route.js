import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const products = await prisma.product.findMany({
            include: {
                category: true,
                _count: {
                    select: { orders: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Add formatted date and order count
        const formattedProducts = products.map(product => ({
            ...product,
            price: product.price.toString(), // Decimal to string
            date: new Date(product.createdAt).toLocaleDateString(),
            orderCount: product._count.orders
        }));

        return NextResponse.json(formattedProducts);
    } catch (error) {
        console.error("Admin Products Fetch Error:", error);
        return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { title, description, price, categoryId, images, isFeatured } = data;

        if (!title || !price || !categoryId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const product = await prisma.product.create({
            data: {
                title,
                description: description || "",
                price: parseFloat(price),
                categoryId,
                images: images || [],
                isFeatured: isFeatured || false,
            }
        });

        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        console.error("Product Creation Error:", error);
        return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
    }
}
