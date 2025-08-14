const express = require("express");
const router = express.Router();
const { authorize, authenticate } = require("../../middleware/auth");
const { upload, fontUpload } = require("../../middleware/upload");
const { WtfPermissions } = require("../../constants/users");
const {
  getCurrentSettings,
  updateSettings,
  uploadBackgroundImage,
  uploadFontFile,
  deleteBackgroundImage,
  getSettingsHistory,
} = require("../../controllers/wtfSettingsController");

// Get current WTF settings (accessible to all WTF users)
router.get(
  "/current",
  authenticate,
  authorize([
    WtfPermissions.WTF_READ,
    WtfPermissions.WTF_ADMIN,
    WtfPermissions.WTF_COACH_SUGGESTION_READ,
  ]),
  getCurrentSettings
);

// Update WTF settings (admin only)
router.put(
  "/update",
  authenticate,
  authorize([WtfPermissions.WTF_ADMIN]),
  updateSettings
);

// Upload background image (admin only)
router.post(
  "/background-image",
  authenticate,
  authorize([WtfPermissions.WTF_ADMIN]),
  upload.single("backgroundImage"),
  uploadBackgroundImage
);

// Upload font file (admin only)
router.post(
  "/font",
  authenticate,
  authorize([WtfPermissions.WTF_ADMIN]),
  fontUpload.single("font"),
  uploadFontFile
);

// Delete background image (admin only)
router.delete(
  "/background-image",
  authenticate,
  authorize([WtfPermissions.WTF_ADMIN]),
  deleteBackgroundImage
);

// Get settings history (admin only)
router.get(
  "/history",
  authenticate,
  authorize([WtfPermissions.WTF_ADMIN]),
  getSettingsHistory
);

module.exports = router;
