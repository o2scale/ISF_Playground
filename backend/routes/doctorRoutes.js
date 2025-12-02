const express = require("express");
const { authenticate, authorize } = require("../middleware/auth");
const {
  getAllDoctors,
  createDoctor,
  searchDoctors,
} = require("../controllers/doctorController");

const router = express.Router();

// Sprint6-Story-3-AC2: Doctor routes for searchable dropdown

// GET /api/doctors - Get all doctors
router.get(
  "/",
  authenticate,
  authorize("Medical Check-in", "Read"),
  getAllDoctors
);

// GET /api/doctors/search?q=searchTerm - Search doctors
router.get(
  "/search",
  authenticate,
  authorize("Medical Check-in", "Read"),
  searchDoctors
);

// POST /api/doctors - Create new doctor
router.post(
  "/",
  authenticate,
  authorize("Medical Check-in", "Create"),
  createDoctor
);

module.exports = router;
