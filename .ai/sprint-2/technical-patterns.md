# Sprint 2 Technical Patterns - Reference Guide

**Last Updated:** 2025-10-24 17:45:28
**Purpose:** Common technical patterns used across all Sprint 2 stories

---

## Overview

This document contains reusable technical patterns that appear across multiple Sprint 2 stories. Use these patterns for consistency and to avoid reinventing solutions.

---

## 1. React Component Patterns

### 1.1 Functional Component with Hooks (Standard Pattern)

```jsx
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { courseService } from '../../services/courseService';
import { toast } from 'react-hot-toast';

const CourseViewer = ({ courseId }) => {
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    fetchCourse();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const data = await courseService.getCourse(courseId);
      setCourse(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch course:', err);
      setError(err.message);
      toast.error('Failed to load course');
    } finally {
      setLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={fetchCourse} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Main render
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{course.name}</h1>
      {/* Component content */}
    </div>
  );
};

export default CourseViewer;
```

### 1.2 Modal Component Pattern

```jsx
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose} // Click backdrop to close
    >
      <div
        className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-6">{children}</div>

        {/* Footer (optional) */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
```

### 1.3 Form with Validation Pattern

```jsx
const CourseForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Course name is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Please fix the errors before submitting');
      return;
    }

    try {
      setSubmitting(true);
      await onSubmit(formData);
      toast.success('Course created successfully!');
      // Reset form
      setFormData({ name: '', description: '', category: '' });
      setErrors({});
    } catch (error) {
      toast.error('Failed to create course');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Course Name *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
            errors.name
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {submitting ? 'Creating...' : 'Create Course'}
      </button>
    </form>
  );
};
```

---

## 2. Service Layer Patterns

### 2.1 API Service Pattern

```javascript
// services/courseService.js
const API_BASE_URL = '/api/v2';

class CourseService {
  // GET request
  async getCourse(courseId) {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data.data; // Assuming response format: { success: true, data: {...} }
    } catch (error) {
      console.error('getCourse error:', error);
      throw error;
    }
  }

  // POST request
  async createCourse(courseData) {
    try {
      const response = await fetch(`${API_BASE_URL}/courses`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create course');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('createCourse error:', error);
      throw error;
    }
  }

  // PUT request
  async updateCourse(courseId, updates) {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('updateCourse error:', error);
      throw error;
    }
  }

  // DELETE request
  async deleteCourse(courseId) {
    try {
      const response = await fetch(`${API_BASE_URL}/courses/${courseId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      return true;
    } catch (error) {
      console.error('deleteCourse error:', error);
      throw error;
    }
  }
}

export const courseService = new CourseService();
```

### 2.2 File Upload Service Pattern (S3 Direct Upload)

```javascript
// services/uploadService.js
class UploadService {
  async uploadFile(file, fileType = 'image') {
    try {
      // Step 1: Get signed URL from backend
      const urlResponse = await fetch('/api/v2/media/upload-url', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          contentType: fileType,
        }),
      });

      if (!urlResponse.ok) {
        throw new Error('Failed to get upload URL');
      }

      const { signedUrl, s3Key, cdnUrl } = await urlResponse.json();

      // Step 2: Upload file directly to S3
      const uploadResponse = await fetch(signedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': file.type,
        },
        body: file,
      });

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file to S3');
      }

      // Step 3: Return CDN URL and S3 key
      return {
        cdnUrl,
        s3Key,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
      };
    } catch (error) {
      console.error('uploadFile error:', error);
      throw error;
    }
  }

  // Upload with progress tracking
  async uploadFileWithProgress(file, fileType = 'image', onProgress) {
    try {
      // Get signed URL
      const urlResponse = await fetch('/api/v2/media/upload-url', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          contentType: fileType,
        }),
      });

      const { signedUrl, s3Key, cdnUrl } = await urlResponse.json();

      // Upload with XMLHttpRequest for progress tracking
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.upload.addEventListener('progress', (e) => {
          if (e.lengthComputable) {
            const percentComplete = (e.loaded / e.total) * 100;
            onProgress(percentComplete);
          }
        });

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
            resolve({ cdnUrl, s3Key, fileName: file.name });
          } else {
            reject(new Error('Upload failed'));
          }
        });

        xhr.addEventListener('error', () => {
          reject(new Error('Upload failed'));
        });

        xhr.open('PUT', signedUrl);
        xhr.setRequestHeader('Content-Type', file.type);
        xhr.send(file);
      });
    } catch (error) {
      console.error('uploadFileWithProgress error:', error);
      throw error;
    }
  }
}

export const uploadService = new UploadService();
```

---

## 3. Backend Patterns

### 3.1 Express Controller Pattern

```javascript
// controllers/courseController.js
const Course = require('../models/Course');
const { ErrorHandler } = require('../utils/errorHandler');

// GET /api/v2/courses/:id - Get single course
exports.getCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id)
      .populate('modules')
      .populate('createdBy', 'name email');

    if (!course) {
      return next(new ErrorHandler('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// POST /api/v2/courses - Create course
exports.createCourse = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;

    // Validation
    if (!name || !description || !category) {
      return next(new ErrorHandler('All fields are required', 400));
    }

    const course = await Course.create({
      name,
      description,
      category,
      createdBy: req.user._id,
      status: 'draft',
    });

    res.status(201).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// PUT /api/v2/courses/:id - Update course
exports.updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const course = await Course.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    );

    if (!course) {
      return next(new ErrorHandler('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};

// DELETE /api/v2/courses/:id - Delete course
exports.deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findByIdAndDelete(id);

    if (!course) {
      return next(new ErrorHandler('Course not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
```

### 3.2 MongoDB Aggregation Pipeline Pattern

```javascript
// Complex aggregation for course analytics
exports.getCourseAnalytics = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const analytics = await Progress.aggregate([
      // Stage 1: Match progresses for this course
      {
        $match: { courseId: mongoose.Types.ObjectId(courseId) },
      },

      // Stage 2: Lookup student details
      {
        $lookup: {
          from: 'students',
          localField: 'studentId',
          foreignField: '_id',
          as: 'student',
        },
      },

      // Stage 3: Unwind student array
      {
        $unwind: '$student',
      },

      // Stage 4: Group by status and calculate stats
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgProgress: { $avg: '$progress' },
          students: { $push: '$student.name' },
        },
      },

      // Stage 5: Sort by count descending
      {
        $sort: { count: -1 },
      },
    ]);

    res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
```

### 3.3 MongoDB Schema Pattern

```javascript
// models/Course.js
const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Course name is required'],
      trim: true,
      maxlength: [100, 'Course name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['technical', 'creative', 'language', 'life-skills'],
    },
    icon: {
      type: String,
      default: '📚',
    },
    status: {
      type: String,
      enum: ['draft', 'active', 'archived'],
      default: 'draft',
    },
    modules: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Module',
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    translations: {
      hindi: {
        name: String,
        description: String,
      },
      telugu: {
        name: String,
        description: String,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

// Indexes for performance
CourseSchema.index({ status: 1, createdAt: -1 });
CourseSchema.index({ category: 1 });
CourseSchema.index({ createdBy: 1 });

// Virtual for module count
CourseSchema.virtual('moduleCount').get(function () {
  return this.modules.length;
});

// Instance method
CourseSchema.methods.publish = async function () {
  this.status = 'active';
  return await this.save();
};

// Static method
CourseSchema.statics.findActive = function () {
  return this.find({ status: 'active' });
};

module.exports = mongoose.model('Course', CourseSchema);
```

---

## 4. WebSocket Patterns

### 4.1 Server-Side WebSocket Setup

```javascript
// server.js
const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');

// Initialize Socket.IO
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// Authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    socket.userRole = decoded.role;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});

// Connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // Join user-specific room
  socket.join(`user_${socket.userId}`);

  // Join role-specific room
  socket.join(`role_${socket.userRole}`);

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
});

// Export for use in controllers
module.exports = { io };
```

### 4.2 Sending WebSocket Notifications

```javascript
// controllers/notificationController.js
const { io } = require('../server');

// Send notification to specific user
const sendNotificationToUser = (userId, notification) => {
  io.to(`user_${userId}`).emit('notification', notification);
};

// Send notification to all users with a role
const sendNotificationToRole = (role, notification) => {
  io.to(`role_${role}`).emit('notification', notification);
};

// Send broadcast to all connected users
const sendBroadcast = (notification) => {
  io.emit('broadcast', notification);
};

// Example usage in controller
exports.createQuizGrade = async (req, res, next) => {
  try {
    // ... grade quiz logic

    // Send WebSocket notification to student
    sendNotificationToUser(studentId, {
      type: 'quiz_graded',
      title: 'Quiz Graded!',
      message: `You scored ${score}% on ${quizName}`,
      data: { quizId, score },
    });

    res.status(200).json({ success: true, data: grade });
  } catch (error) {
    next(new ErrorHandler(error.message, 500));
  }
};
```

### 4.3 Client-Side WebSocket Connection

```jsx
// hooks/useWebSocket.js
import { useEffect } from 'react';
import io from 'socket.io-client';
import { useAuth } from './useAuth';

export const useWebSocket = (onNotification) => {
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const socket = io(process.env.REACT_APP_API_URL, {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log('WebSocket connected');
    });

    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      onNotification(data);
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    return () => {
      socket.disconnect();
    };
  }, [token, onNotification]);
};

// Usage in component
const StudentDashboard = () => {
  const handleNotification = useCallback((notification) => {
    // Add to notification state
    addNotification(notification);

    // Show toast
    toast.success(notification.message);
  }, []);

  useWebSocket(handleNotification);

  return <div>Dashboard Content</div>;
};
```

---

## 5. Media Recording Patterns

### 5.1 Audio Recording with Waveform

```jsx
import React, { useState, useRef, useEffect } from 'react';

const VoiceRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const analyserRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Set up MediaRecorder
      mediaRecorderRef.current = new MediaRecorder(stream);
      chunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        setAudioBlob(blob);
        onRecordingComplete(blob);

        // Stop all tracks
        stream.getTracks().forEach((track) => track.stop());
      };

      // Set up audio analysis for waveform
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      source.connect(analyser);
      analyserRef.current = analyser;

      // Start recording
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);

      // Start waveform animation
      drawWaveform();
    } catch (error) {
      console.error('Error starting recording:', error);
      toast.error('Failed to access microphone');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      cancelAnimationFrame(animationRef.current);
    }
  };

  const drawWaveform = () => {
    if (!canvasRef.current || !analyserRef.current) return;

    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const analyser = analyserRef.current;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteTimeDomainData(dataArray);

      canvasCtx.fillStyle = 'rgb(240, 240, 240)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(37, 99, 235)';
      canvasCtx.beginPath();

      const sliceWidth = (canvas.width * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();
    };

    draw();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      {/* Waveform Canvas */}
      <canvas
        ref={canvasRef}
        width={600}
        height={100}
        className="w-full rounded-lg mb-4"
      />

      {/* Timer */}
      {isRecording && (
        <div className="text-center mb-4">
          <span className="text-2xl font-bold text-blue-600">{formatTime(recordingTime)}</span>
        </div>
      )}

      {/* Controls */}
      <div className="flex justify-center gap-4">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            🎤 Start Recording
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 animate-pulse"
          >
            ⏹️ Stop Recording
          </button>
        )}
      </div>

      {/* Audio Preview */}
      {audioBlob && (
        <div className="mt-4">
          <audio src={URL.createObjectURL(audioBlob)} controls className="w-full" />
        </div>
      )}
    </div>
  );
};

export default VoiceRecorder;
```

---

## 6. Error Handling Patterns

### 6.1 Global Error Handler (Express)

```javascript
// utils/errorHandler.js
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { ErrorHandler };

// middleware/errorMiddleware.js
const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Log error
  console.error('Error:', {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    user: req.user?._id,
  });

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    err.message = `${field} already exists`;
    err.statusCode = 400;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message);
    err.message = errors.join(', ');
    err.statusCode = 400;
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    err.message = 'Invalid token';
    err.statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    err.message = 'Token expired';
    err.statusCode = 401;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = errorMiddleware;
```

### 6.2 React Error Boundary

```jsx
// components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Send error to backend for logging
    fetch('/api/v2/errors/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.toString(),
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      }),
    });
  }

  render() {
    if (this.state.hasError) {
      const { role } = this.props;

      // Student-friendly error (child UI)
      if (role === 'student') {
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex flex-col items-center justify-center p-12">
            <div className="text-9xl mb-8 animate-bounce">😊</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-6 font-['Patrick_Hand']">
              Oops! Something went wrong
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-['Patrick_Hand'] text-center max-w-md">
              We're working on fixing this right now. Don't worry, we'll have it sorted out in
              just a moment! 🛠️
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-4 bg-gradient-to-br from-green-400 to-blue-500 text-white text-lg font-['Patrick_Hand'] rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Try Again 🚀
            </button>
          </div>
        );
      }

      // Admin/Coach detailed error
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Application Error</h1>
            <p className="text-gray-700 mb-4">{this.state.error.toString()}</p>
            <details className="mb-4">
              <summary className="cursor-pointer text-blue-600 hover:text-blue-800">
                Show Error Details
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto text-xs">
                {this.state.error.stack}
              </pre>
            </details>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

---

## 7. Authentication Patterns

### 7.1 Protected Route Pattern

```jsx
// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

// Usage in App.jsx
<Route
  path="/admin/*"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>
```

---

**For More Patterns:**
Refer to individual story documents in `docs/stories/sprint2/` for story-specific implementation details.

**End of Technical Patterns Reference**
