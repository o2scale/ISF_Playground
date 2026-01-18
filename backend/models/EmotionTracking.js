const mongoose = require('mongoose');

/**
 * EmotionTracking Model - Epic 01 Story 01
 * Tracks student emotions throughout their learning sessions
 * Used for mood analytics and student well-being monitoring
 */
const emotionTrackingSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    emotion: {
      type: String,
      enum: ['happy', 'sad', 'angry'],
      required: true
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
      index: true
    },
    synced: {
      type: Boolean,
      default: true,
      comment: 'False if synced from offline queue'
    },
    context: {
      page: { type: String },
      courseType: { type: String },
      taskId: { type: mongoose.Schema.Types.ObjectId }
    }
  },
  {
    timestamps: true,
    collection: 'emotion_tracking'
  }
);

// Index for efficient queries by student and date range
emotionTrackingSchema.index({ studentId: 1, timestamp: -1 });

// Index for analytics queries
emotionTrackingSchema.index({ emotion: 1, timestamp: -1 });

const EmotionTracking = mongoose.model('EmotionTracking', emotionTrackingSchema);

module.exports = EmotionTracking;
