const express = require("express");
const router = express.Router();
const medicalCheckInsController = require("../controllers/medicalCheckInsController");
const upload = require("../middleware/upload");
const { authenticate, authorize } = require("../middleware/auth");

// Create a new medical check-in (with file upload)
router.post(
  "/",
  authenticate,
  upload.fields([{ name: "attachments", maxCount: 5 }]),
  medicalCheckInsController.createMedicalCheckIn
);

// Get all medical check-ins (with optional filters)
router.get("/", authenticate, medicalCheckInsController.getAllMedicalCheckIns);

// Get medical check-ins by student ID
router.get(
  "/student/:studentId",
  authenticate,
  medicalCheckInsController.getMedicalCheckInsByStudentId
);

// Get medical check-in by ID
router.get(
  "/:checkInId",
  authenticate,
  medicalCheckInsController.getMedicalCheckInById
);

// Update medical check-in
router.put(
  "/:checkInId",
  authenticate,
  upload.none(),
  medicalCheckInsController.updateMedicalCheckIn
);

// Delete medical check-in
router.delete(
  "/:checkInId",
  authenticate,
  medicalCheckInsController.deleteMedicalCheckIn
);

// Add or update attachments to a medical check-in
router.put(
  "/attachments/:checkInId",
  authenticate,
  upload.fields([{ name: "attachments", maxCount: 5 }]),
  medicalCheckInsController.addOrUpdateAttachments
);

// Delete an attachment from a medical check-in
router.delete(
  "/attachments/:checkInId/:attachmentId",
  authenticate,
  medicalCheckInsController.deleteAttachment
);

// Get all medical check-ins by balagruha Ids list
router.post(
  "/students/list",
  authenticate,
  medicalCheckInsController.getMedicalCheckInsByBalagruhaIds
);

module.exports = router;
