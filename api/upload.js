const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(require("cors")()); // Allow CORS for cross-origin access

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Configure Multer with Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "music-sharing", // Cloudinary folder name
    resource_type: "auto",   // Automatically detect file type
  },
});

const upload = multer({ storage });

// File upload route
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json({
    message: "File uploaded successfully!",
    fileUrl: req.file.path, // URL of the uploaded file
  });
});

// Export the app for Vercel
module.exports = app;
