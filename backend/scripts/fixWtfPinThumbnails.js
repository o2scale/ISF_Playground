const mongoose = require("mongoose");
const WtfPin = require("../models/wtfPin");
const { logger } = require("../config/pino-config");

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGO_URI_LOCAL;
    if (!mongoUri) {
      throw new Error("MongoDB URI not found in environment variables");
    }
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("Connected to MongoDB for WTF pin thumbnail fix");
  } catch (error) {
    logger.error({ error: error.message }, "Failed to connect to MongoDB");
    process.exit(1);
  }
};

// Fix thumbnailUrl for existing image pins
const fixWtfPinThumbnails = async () => {
  try {
    logger.info("Starting WTF pin thumbnail fix...");

    // Find all image pins where thumbnailUrl is null but mediaUrl exists
    const imagePinsToFix = await WtfPin.find({
      type: "image",
      mediaUrl: { $exists: true, $ne: null, $ne: "" },
      $or: [
        { thumbnailUrl: null },
        { thumbnailUrl: { $exists: false } },
        { thumbnailUrl: "" },
      ],
    });

    logger.info({ count: imagePinsToFix.length }, "Found image pins to fix");

    if (imagePinsToFix.length === 0) {
      logger.info("No image pins need thumbnail fixing");
      return;
    }

    // Update each pin
    let fixedCount = 0;
    for (const pin of imagePinsToFix) {
      try {
        // Skip pins with blob URLs - they need manual intervention
        if (pin.mediaUrl.includes("blob:")) {
          logger.warn(
            {
              pinId: pin._id,
              title: pin.title,
              mediaUrl: pin.mediaUrl,
            },
            "Skipping pin with blob URL - needs manual fix"
          );
          continue;
        }

        // Set thumbnailUrl to mediaUrl for image pins
        await WtfPin.findByIdAndUpdate(pin._id, {
          thumbnailUrl: pin.mediaUrl,
        });

        fixedCount++;
        logger.info(
          {
            pinId: pin._id,
            title: pin.title,
            mediaUrl: pin.mediaUrl,
          },
          "Fixed pin thumbnail"
        );
      } catch (error) {
        logger.error(
          {
            pinId: pin._id,
            error: error.message,
          },
          "Error fixing individual pin"
        );
      }
    }

    logger.info(
      { fixedCount, totalFound: imagePinsToFix.length },
      "WTF pin thumbnail fix completed"
    );

    // Also log pins with blob URLs that need manual attention
    const blobPins = await WtfPin.find({
      type: "image",
      mediaUrl: { $regex: /^blob:/ },
    });

    if (blobPins.length > 0) {
      logger.warn(
        { count: blobPins.length },
        "Found pins with blob URLs that need manual attention:"
      );
      blobPins.forEach((pin) => {
        logger.warn(
          {
            pinId: pin._id,
            title: pin.title,
            mediaUrl: pin.mediaUrl,
            createdAt: pin.createdAt,
          },
          "Pin with blob URL"
        );
      });
    }
  } catch (error) {
    logger.error({ error: error.message }, "Error in fixWtfPinThumbnails");
    throw error;
  }
};

// Main execution
const main = async () => {
  try {
    await connectDB();
    await fixWtfPinThumbnails();

    logger.info("WTF pin thumbnail fix script completed successfully");
    process.exit(0);
  } catch (error) {
    logger.error(
      { error: error.message },
      "WTF pin thumbnail fix script failed"
    );
    process.exit(1);
  }
};

// Handle script execution
if (require.main === module) {
  main();
}

module.exports = { fixWtfPinThumbnails };
