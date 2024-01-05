import CLD from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

export const cloudinary = CLD.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "Route",
      allowedFormats: ["jpeg", "png", "jpg", 'mp4'],
    };
  },
});

module.exports = {cloudinary, storage}
