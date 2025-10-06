import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dnvpt1zxh',
  api_key: process.env.CLOUDINARY_API_KEY || '325436864586722',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'NpVGJMO3QvvOqBHNbW0-vfAxOro',
});

export const uploadImage = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: 'auto',
    });

    fs.unlink(filePath)

    return {
      url: result.secure_url,
      id: result.public_id,
    };
  } catch (error) {
    fs.unlink(filePath)
    throw new Error(error.message);
  }
};
