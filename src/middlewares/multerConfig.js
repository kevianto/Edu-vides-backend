import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "blog_images",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => {
      const name = file.originalname.split(".")[0].replace(/\s+/g, "-");
      return `${Date.now()}-${name}`;
    },
  },
});

// Multer middleware
export const upload = multer({ storage });
