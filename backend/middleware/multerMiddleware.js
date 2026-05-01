import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_req, file, cb) => {
    cb(null, file.originalname); // or Date.now() + "-" + file.originalname to avoid conflicts
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname).toLowerCase();

    const allowedExtensions = [
      ".jpg",
      ".jpeg",
      ".png",
      ".webp",
      ".mp4",
      ".mov",
      ".mkv",
      ".avi",
    ];

    if (!allowedExtensions.includes(ext)) {
      cb(new Error(`Unsupported file type! ${ext}`), false);
      return;
    }

    cb(null, true);
  },
});


export default upload;
