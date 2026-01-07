import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(req) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Configure Cloudinary directly here to ensure env vars are accessible
        cloudinary.config({
            cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
            secure: true
        });

        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const folder = formData.get("folder") || "products";

        // Convert file to base64 for direct upload
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const dataURI = `data:${file.type};base64,${base64}`;

        // Use direct upload instead of stream to avoid timestamp issues
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: folder,
            resource_type: "auto"
        });

        return NextResponse.json({
            url: result.secure_url,
            type: result.resource_type,
            public_id: result.public_id
        }, { status: 201 });

    } catch (error) {
        console.error("Upload Route Error:", error);
        return NextResponse.json({ error: "Upload failed: " + error.message }, { status: 500 });
    }
}
