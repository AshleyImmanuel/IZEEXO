import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
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
