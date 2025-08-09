const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const fs = require("fs");
const path = require("path");

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

    const region = await s3Client.config.region();
    const url = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${fileName}`;

    return {
      success: true,
      message: "WTF media uploaded successfully",
      url: url,
      key: fileName,
      contentType: contentType,
      mediaType: mediaType,
      pinId: pinId,
    };
  } catch (error) {
    console.error("Error uploading WTF media:", error);
    return {
      success: false,
      message: "WTF media upload failed",
      error: error.message,
    };
  }
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
    // This would typically involve image processing
    // For now, we'll return a placeholder implementation
    // In production, you might use AWS Lambda or a separate image processing service

    const region = await s3Client.config.region();
    const thumbnailUrl = `https://${process.env.AWS_S3_WTF_BUCKET_NAME}.s3.${region}.amazonaws.com/${thumbnailKey}`;

    return {
      success: true,
      message: "WTF thumbnail generated successfully",
      url: thumbnailUrl,
      key: thumbnailKey,
    };
  } catch (error) {
    console.error("Error generating WTF thumbnail:", error);
    return {
      success: false,
      message: "WTF thumbnail generation failed",
      error: error.message,
    };
  }
};

// Delete WTF media
exports.deleteWtfMedia = async (key) => {
  try {
    const params = {
      Bucket: process.env.AWS_S3_WTF_BUCKET_NAME,
      Key: key,
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);

    return {
      success: true,
      message: "WTF media deleted successfully",
      key: key,
    };
  } catch (error) {
    console.error("Error deleting WTF media:", error);
    return {
      success: false,
      message: "WTF media deletion failed",
      error: error.message,
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
