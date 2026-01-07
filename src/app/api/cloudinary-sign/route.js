import crypto from "crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// Force dynamic rendering to prevent caching
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST() {
    try {
        // Verify admin access
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const timestamp = Math.round(Date.now() / 1000);
        const folder = "products";

        console.log("🕐 Generating signature at:", new Date().toISOString());
        console.log("🕐 Timestamp (Unix):", timestamp);
        console.log("🕐 Timestamp (Date):", new Date(timestamp * 1000).toISOString());

        // Parameters must be in alphabetical order for signature
        const stringToSign = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;

        const signature = crypto
            .createHash("sha1")
            .update(stringToSign)
            .digest("hex");

        console.log("✅ Signature generated:", signature.substring(0, 10) + "...");

        return NextResponse.json({
            timestamp,
            signature,
            folder,
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            apiKey: process.env.CLOUDINARY_API_KEY,
        }, {
            headers: {
                "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
            },
        });
    } catch (error) {
        console.error("Cloudinary signature error:", error);
        return NextResponse.json({ error: "Failed to generate signature" }, { status: 500 });
    }
}
