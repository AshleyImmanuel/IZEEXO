import { NextResponse } from "next/server";
import { uploadToCloudinary } from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file");
        const email = formData.get("email");
        const designType = formData.get("designType");
        const description = formData.get("description");

        let fileUrl = null;

        if (file && file.size > 0) {
            const result = await uploadToCloudinary(file, "izeexo-requests");
            fileUrl = result.secure_url;
        }

        // Save to database
        const requestRecord = await prisma.customRequest.create({
            data: {
                email,
                designType,
                description,
                fileUrl,
                status: "PENDING",
            },
        });

        return NextResponse.json({ success: true, data: requestRecord });
    } catch (error) {
        console.error("Request submission error:", error);
        return NextResponse.json({ success: false, error: "Submission failed" }, { status: 500 });
    }
}
