const mongoose = require("mongoose");

const medicalCheckInSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    temperature: { type: Number, required: true },
    date: { type: Date, required: true },
    healthStatus: {
      type: String,
      enum: ["normal", "warning", "alert"],
      default: "normal",
    },
    notes: { type: String },
    attachments: [
      {
        fileName: { type: String },
        fileUrl: { type: String },
        fileType: { type: String },
        fileSize: { type: Number },
        uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        uploadedAt: { type: Date, default: Date.now },
      },
    ],

    // NEW FIELDS - Medical Check-in Enhancement

    // Symptoms section (Field #3)
    symptoms: {
      type: [String],
      default: [],
      enum: [
        "cough_cold",
        "fever",
        "stomach_ache",
        "headache",
        "injury",
        "other",
        "",
      ],
    },
    customSymptom: {
      type: String,
      default: "",
    },

    // Doctor visits section (Field #4)
    doctorVisit: {
      doctorName: { type: String, default: "" },
      hospitalName: { type: String, default: "" },
      visitDate: { type: Date },
      prescriptionFiles: [
        {
          fileName: { type: String },
          fileUrl: { type: String },
          fileType: { type: String },
          fileSize: { type: Number },
          uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
      testDetails: { type: String, default: "" },
      testResultFiles: [
        {
          fileName: { type: String },
          fileUrl: { type: String },
          fileType: { type: String },
          fileSize: { type: Number },
          uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          uploadedAt: { type: Date, default: Date.now },
        },
      ],
      conclusion: { type: String, default: "" },
    },

    // Follow-up section (Field #5)
    followUp: {
      followUpDate: { type: Date },
      hospital: { type: String, default: "" },
      doctor: { type: String, default: "" },
      assignedCoaches: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      status: {
        type: String,
        enum: ["active", "inactive", ""],
        default: "",
      },
      // Future integration fields (commented out for now)
      // calendarEventId: { type: String },
      // whatsappNotificationSent: { type: Boolean, default: false },
      // remindersSent: [{ date: Date, type: String }]
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const MedicalCheckIn = mongoose.model(
  "medical_check_ins",
  medicalCheckInSchema
);
module.exports = MedicalCheckIn;
