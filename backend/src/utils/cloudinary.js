import { v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localPath) => {
    if(!localPath) return null;

    try {
        const response = await cloudinary.uploader.upload(localPath);
        fs.unlinkSync(localPath);
        return response;
    } catch (error) {
        fs.unlinkSync(localPath);
        return null;
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        const response = await cloudinary.uploader.destroy(publicId);
        return response;
    } catch (error) {
        return null;
    }
}

export { uploadOnCloudinary,deleteFromCloudinary }