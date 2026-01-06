import { v2 as cloudinary } from 'cloudinary';

// Validate environment variables
const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    console.error('Missing Cloudinary credentials:', {
        cloudName: !!cloudName,
        apiKey: !!apiKey,
        apiSecret: !!apiSecret
    });
}

cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
});

export const uploadToCloudinary = async (file, folder) => {
    try {
        const buffer = await file.arrayBuffer();
        const bytes = Buffer.from(buffer);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: folder, resource_type: "auto" },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary Upload Error:", error);
                        reject(error.message);
                    }
                    resolve(result);
                }
            );
            uploadStream.end(bytes);
        });
    } catch (error) {
        console.error("Upload handler error:", error);
        throw new Error(error.message);
    }
};
