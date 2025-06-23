const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary");

// Set up Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "adverts", // Optional folder name in your Cloudinary account
    allowed_formats: ["jpg", "jpeg", "png"]
  }
});

// Initialize multer with cloudinary storage
const upload = multer({ storage });

module.exports = upload;