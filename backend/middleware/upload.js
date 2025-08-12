const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "text/plain",
    "text/csv",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limited to 5MB max for the time being
  fileFilter,
});

// WTF-specific upload configuration with support for media files
const wtfFileFilter = (req, file, cb) => {
  console.log("🔍 WTF File Filter - Processing file:", {
    originalname: file.originalname,
    mimetype: file.mimetype,
    size: file.size,
    fieldname: file.fieldname,
  });

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "video/mp4",
    "video/webm",
    "audio/mpeg",
    "audio/wav",
    "audio/ogg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    console.log("✅ WTF File Filter - File accepted:", file.mimetype);
    cb(null, true);
  } else {
    console.log("❌ WTF File Filter - File rejected:", file.mimetype);
    cb(
      new Error(
        "Invalid file type. Only images, videos, and audio files are allowed for WTF pins."
      )
    );
  }
};

const wtfUpload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // Increased to 100MB for WTF media files
    files: 1, // Allow only 1 file at a time
    fieldSize: 10 * 1024 * 1024, // 10MB for field data
  },
  fileFilter: wtfFileFilter,
}).single("file");

// Wrap the multer middleware to add error handling
const wtfUploadWithErrorHandling = (req, res, next) => {
  wtfUpload(req, res, (err) => {
    if (err) {
      console.error("🚨 Multer Error:", {
        message: err.message,
        code: err.code,
        field: err.field,
        file: req.file,
        body: req.body,
      });

      // Handle specific multer errors
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: `File too large. Maximum size is 100MB. Received: ${
            req.file
              ? (req.file.size / (1024 * 1024)).toFixed(2) + "MB"
              : "Unknown"
          }`,
        });
      }

      if (err.code === "LIMIT_FILE_COUNT") {
        return res.status(400).json({
          success: false,
          message: "Too many files. Only 1 file allowed.",
        });
      }

      if (err.code === "LIMIT_FIELD_SIZE") {
        return res.status(400).json({
          success: false,
          message: "Field data too large. Maximum size is 10MB.",
        });
      }

      // Generic multer error
      return res.status(400).json({
        success: false,
        message: `Upload error: ${err.message}`,
      });
    }

    // No error, continue
    next();
  });
};

module.exports = {
  upload,
  wtfUpload,
  wtfUploadWithErrorHandling,
};
