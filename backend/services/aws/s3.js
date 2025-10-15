const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");
const VideoThumbnailService = require("../videoThumbnail");

// Configure the S3 client
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION, // e.g., 'us-east-1'
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  },
});

exports.uploadFileToS3 = async (filePath, bucketName, keyName) => {
  try {
    // Read the file from local filesystem
    const fileContent = fs.readFileSync(filePath);
    let contentType = getContentType(filePath);
    // Set up S3 upload parameters
    const params = {
      Bucket: bucketName,
      Key: keyName, // File name you want to save as in S3
      Body: fileContent,
      ContentType: contentType,
    };

    // Upload file to S3
    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    let region = await s3Client.config.region();
    // Construct the URL (note: v3 doesn't return the URL directly)
    const url = `https://${bucketName}.s3.${region}.amazonaws.com/${keyName}`;

    console.log("File uploaded successfully");
    return {
      success: true,
      message: "Upload successful",
      url: url,
      key: keyName,
      contentType: contentType,
    };
  } catch (error) {
    console.error("Error uploading file:", error);
    return {
      success: false,
      message: "Upload failed",
      error: error.message,
    };
  }
};

// Helper function to determine content type
function getContentType(filePath) {
  const extension = filePath.split(".").pop().toLowerCase();
  const contentTypes = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    pdf: "application/pdf",
    txt: "text/plain",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    zip: "application/zip",
    rar: "application/x-rar-compressed",
    mp4: "video/mp4",
    mp3: "audio/mpeg",
    avi: "video/x-msvideo",
    mov: "video/quicktime",
    wmv: "video/x-ms-wmv",
    flv: "video/x-flv",
    mkv: "video/x-matroska",
    webm: "video/webm",
    ogg: "audio/ogg",
    wav: "audio/wav",
  };
  return contentTypes[extension] || "application/octet-stream";
}

// ==================== WTF-SPECIFIC METHODS ====================

// Upload WTF media (images, videos, audio)
exports.uploadWtfMedia = async (filePath, mediaType, pinId) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    const fileExtension = path.extname(filePath);
    const fileName = `wtf/${mediaType}/${pinId}_${Date.now()}${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_WTF_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType,
      Metadata: {
        "wtf-pin-id": pinId,
        "media-type": mediaType,
        "upload-timestamp": new Date().toISOString(),
      },
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const url = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
    console.log(`WTF media uploaded successfully: ${url}`);

    return {
      success: true,
      message: "WTF media uploaded successfully",
      url: url,
      key: fileName,
      contentType: contentType,
    };
  } catch (error) {
    console.error("Error uploading WTF media:", error);
    return {
      success: false,
      message: "Failed to upload WTF media",
      error: error.message,
    };
  }
};

// Upload WTF media from buffer (for direct uploads like background images)
exports.uploadWtfMediaBuffer = async (buffer, fileName, contentType) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_WTF_BUCKET_NAME,
      Key: fileName,
      Body: buffer,
      ContentType: contentType,
      Metadata: {
        "upload-timestamp": new Date().toISOString(),
        "upload-type": "wtf-background",
      },
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const url = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
    console.log(`WTF media uploaded successfully: ${url}`);
    return url;
  } catch (error) {
    console.error("Error uploading WTF media buffer:", error);
    throw error;
  }
};

// Helper to generate settings file path for background image
exports.buildSettingsFileKey = (originalExt) => {
  const ext = originalExt.startsWith(".")
    ? originalExt.substring(1)
    : originalExt;
  return `settings/backgrounds/wtf-bg-${Date.now()}-${Math.random()
    .toString(36)
    .substring(7)}.${ext}`;
};

// Upload WTF voice note
exports.uploadWtfVoiceNote = async (filePath, submissionId) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    const fileExtension = path.extname(filePath);
    const fileName = `wtf/voice-notes/${submissionId}_${Date.now()}${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_WTF_BUCKET_NAME,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType,
      Metadata: {
        "wtf-submission-id": submissionId,
        "media-type": "voice-note",
        "upload-timestamp": new Date().toISOString(),
      },
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const region = await s3Client.config.region();
    const url = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;

    return {
      success: true,
      message: "WTF voice note uploaded successfully",
      url: url,
      key: fileName,
      contentType: contentType,
      submissionId: submissionId,
    };
  } catch (error) {
    console.error("Error uploading WTF voice note:", error);
    return {
      success: false,
      message: "WTF voice note upload failed",
      error: error.message,
    };
  }
};

// Generate thumbnail for WTF media
exports.generateWtfThumbnail = async (originalKey, thumbnailKey) => {
  try {
    // Check if the original key is a video file
    const isVideo = /\.(mp4|webm|avi|mov|mkv)$/i.test(originalKey);

    if (!isVideo) {
      // For non-video files, return the original as thumbnail
      const region = await s3Client.config.region();
      const thumbnailUrl = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${thumbnailKey}`;

      return {
        success: true,
        message: "Non-video file - using original as thumbnail",
        url: thumbnailUrl,
        key: thumbnailKey,
      };
    }

    // For video files, generate actual thumbnail using FFmpeg
    try {
      const thumbnailService = new VideoThumbnailService();

      const result = await thumbnailService.generateThumbnailFromS3(
        s3Client,
        process.env.AWS_S3_WTF_BUCKET_NAME,
        originalKey,
        thumbnailKey,
        {
          time: "00:00:01", // Extract frame at 1 second
          width: 320, // Thumbnail width
          height: 240, // Thumbnail height
          quality: 80, // JPEG quality
        }
      );

      if (result.success) {
        const region = await s3Client.config.region();
        const thumbnailUrl = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${thumbnailKey}`;

        // Thumbnail service cleanup not needed

        return {
          success: true,
          message: "Video thumbnail generated successfully",
          url: thumbnailUrl,
          key: thumbnailKey,
        };
      } else {
        // Thumbnail service cleanup not needed

        console.warn(
          `Failed to generate video thumbnail for ${originalKey}: ${result.error}`
        );

        // Return a fallback response
        const region = await s3Client.config.region();
        const thumbnailUrl = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${thumbnailKey}`;

        return {
          success: false,
          message: "Video thumbnail generation failed",
          url: null,
          key: thumbnailKey,
          error: result.error,
        };
      }
    } catch (ffmpegError) {
      console.error(
        `FFmpeg error during thumbnail generation for ${originalKey}: ${ffmpegError.message}`
      );

      // Return a fallback response
      const region = await s3Client.config.region();
      const thumbnailUrl = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${thumbnailKey}`;

      return {
        success: false,
        message: "Video thumbnail generation failed due to FFmpeg error",
        url: null,
        key: thumbnailKey,
        error: ffmpegError.message,
      };
    }
  } catch (error) {
    console.error("Error generating WTF thumbnail:", error);
    return {
      success: false,
      message: "WTF thumbnail generation failed",
      error: error.message,
    };
  }
};

// Extract S3 key from full S3 URL
exports.extractS3KeyFromUrl = (s3Url) => {
  try {
    if (!s3Url || typeof s3Url !== "string") {
      return null;
    }

    // Handle both formats:
    // https://bucket-name.s3.region.amazonaws.com/key
    // https://s3.region.amazonaws.com/bucket-name/key
    const url = new URL(s3Url);
    const pathname = url.pathname;

    // For https://bucket-name.s3.region.amazonaws.com/key format
    if (url.hostname.includes(".s3.")) {
      return pathname.startsWith("/") ? pathname.substring(1) : pathname;
    }

    // For https://s3.region.amazonaws.com/bucket-name/key format
    const pathParts = pathname.split("/").filter((part) => part);
    if (pathParts.length >= 2) {
      return pathParts.slice(1).join("/"); // Remove bucket name, keep the rest as key
    }

    return null;
  } catch (error) {
    console.error("Error extracting S3 key from URL:", error);
    return null;
  }
};

// Delete file from S3 by bucket and key
exports.deleteFileFromS3 = async (bucketName, key) => {
  try {
    const params = {
      Bucket: bucketName,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    console.log(`File deleted successfully from S3: ${key}`);
    return {
      success: true,
      message: "File deleted successfully",
      key: key,
    };
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return {
      success: false,
      message: "File deletion failed",
      error: error.message,
    };
  }
};

// Delete WTF media by URL or key
exports.deleteWtfMedia = async (keyOrUrl) => {
  try {
    let key = keyOrUrl;

    // If it's a full URL, extract the key
    if (keyOrUrl && keyOrUrl.startsWith("http")) {
      key = exports.extractS3KeyFromUrl(keyOrUrl);
      if (!key) {
        return {
          success: false,
          message: "Could not extract S3 key from URL",
          keyOrUrl: keyOrUrl,
        };
      }
    }

    if (!key) {
      return {
        success: false,
        message: "No valid S3 key or URL provided",
        keyOrUrl: keyOrUrl,
      };
    }

    const params = {
      Bucket: process.env.AWS_S3_WTF_BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    console.log(`WTF media deleted successfully: ${key}`);
    return {
      success: true,
      message: "WTF media deleted successfully",
      key: key,
      originalInput: keyOrUrl,
    };
  } catch (error) {
    console.error("Error deleting WTF media:", error);
    return {
      success: false,
      message: "WTF media deletion failed",
      error: error.message,
      keyOrUrl: keyOrUrl,
    };
  }
};

// Get WTF media URL
exports.getWtfMediaUrl = async (key) => {
  try {
    const region = await s3Client.config.region();
    const url = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${key}`;

    return {
      success: true,
      url: url,
      key: key,
    };
  } catch (error) {
    console.error("Error getting WTF media URL:", error);
    return {
      success: false,
      message: "Failed to get WTF media URL",
      error: error.message,
    };
  }
};

// ==================== SHOP-SPECIFIC METHODS ====================

// Upload shop product image
exports.uploadShopProductImage = async (filePath, productId) => {
  try {
    const fileContent = fs.readFileSync(filePath);
    const contentType = getContentType(filePath);
    const fileExtension = path.extname(filePath);
    const fileName = `shop/products/${productId}_${Date.now()}${fileExtension}`;

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME_SHOP_PRODUCTS,
      Key: fileName,
      Body: fileContent,
      ContentType: contentType,
      Metadata: {
        "product-id": productId,
        "upload-timestamp": new Date().toISOString(),
      },
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);

    const url = `https://${process.env.AWS_S3_BUCKET_NAME_SHOP_PRODUCTS}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${fileName}`;
    console.log(`Shop product image uploaded successfully: ${url}`);

    return {
      success: true,
      message: "Shop product image uploaded successfully",
      url: url,
      key: fileName,
      contentType: contentType,
    };
  } catch (error) {
    console.error("Error uploading shop product image:", error);
    return {
      success: false,
      message: "Failed to upload shop product image",
      error: error.message,
    };
  }
};

// Delete shop product image by URL or key
exports.deleteShopProductImage = async (keyOrUrl) => {
  try {
    let key = keyOrUrl;

    // If it's a full URL, extract the key
    if (keyOrUrl && keyOrUrl.startsWith("http")) {
      key = exports.extractS3KeyFromUrl(keyOrUrl);
      if (!key) {
        return {
          success: false,
          message: "Could not extract S3 key from URL",
          keyOrUrl: keyOrUrl,
        };
      }
    }

    if (!key) {
      return {
        success: false,
        message: "No valid S3 key or URL provided",
        keyOrUrl: keyOrUrl,
      };
    }

    const params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME_SHOP_PRODUCTS,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    console.log(`Shop product image deleted successfully: ${key}`);
    return {
      success: true,
      message: "Shop product image deleted successfully",
      key: key,
      originalInput: keyOrUrl,
    };
  } catch (error) {
    console.error("Error deleting shop product image:", error);
    return {
      success: false,
      message: "Shop product image deletion failed",
      error: error.message,
      keyOrUrl: keyOrUrl,
    };
  }
};
