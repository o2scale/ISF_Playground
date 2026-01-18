# Mobile Facial Recognition API Integration Guide

**Sprint 1.1 - Epic 02 - Story 01 - Task 10**
**Created:** 2025-10-23 21:07:57
**Target:** Sprint 3 Mobile App Development

---

## Overview

This guide provides comprehensive instructions for integrating the ISF Facial Recognition API into mobile applications (React Native, Flutter, native iOS/Android). The API supports both **multipart/form-data** and **base64-encoded** image uploads for maximum flexibility.

---

## API Endpoints

### Base URL
```
Development: http://localhost:5001/api/v2/fr
Production: [Your production URL]/api/v2/fr
```

### Authentication
All FR endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

#### 1. Register Face
**POST** `/register`

Register a student's face for future recognition.

#### 2. Recognize Face
**POST** `/recognize`

Identify a person by their face (facial login).

#### 3. Get Registration Status
**GET** `/status/:studentId`

Check if a student has a face registered.

#### 4. Delete Face Registration
**DELETE** `/register/:studentId`

Remove a student's face registration.

#### 5. Get FR Statistics
**GET** `/stats`

Get system-wide FR statistics (admin only).

---

## Image Upload Formats

The API supports **two upload formats**:

### Format 1: Multipart/Form-Data (Recommended for Web)
```javascript
const formData = new FormData();
formData.append('studentId', '507f1f77bcf86cd799439011');
formData.append('photo', {
  uri: 'file:///path/to/photo.jpg',
  type: 'image/jpeg',
  name: 'photo.jpg'
});

fetch('http://localhost:5001/api/v2/fr/register', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN'
  },
  body: formData
});
```

### Format 2: Base64 JSON (Recommended for Mobile)
```javascript
const base64Image = await convertImageToBase64(photoUri);

fetch('http://localhost:5001/api/v2/fr/register', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    studentId: '507f1f77bcf86cd799439011',
    photo: base64Image // Can be data URI or plain base64
  })
});
```

---

## Integration Examples

### React Native (Expo)

#### Installation
```bash
npm install expo-camera expo-image-picker expo-file-system
```

#### Face Registration
```javascript
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

async function registerFace(studentId, authToken) {
  try {
    // 1. Request camera permissions
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission required');
      return;
    }

    // 2. Capture photo
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8, // Good balance of quality and size
    });

    if (result.canceled) {
      return;
    }

    // 3. Convert to base64
    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 4. Send to API
    const response = await fetch('http://localhost:5001/api/v2/fr/register', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId,
        photo: `data:image/jpeg;base64,${base64}`,
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Registration successful:', data.data);
      return data.data;
    } else {
      throw new Error(data.error || 'Registration failed');
    }
  } catch (error) {
    console.error('Error registering face:', error);
    throw error;
  }
}
```

#### Face Recognition (Login)
```javascript
async function recognizeFace(authToken) {
  try {
    // 1. Capture photo
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (result.canceled) {
      return null;
    }

    // 2. Convert to base64
    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // 3. Send to API
    const response = await fetch('http://localhost:5001/api/v2/fr/recognize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        photo: `data:image/jpeg;base64,${base64}`,
        threshold: 0.5, // Optional, default is 0.5
      }),
    });

    const data = await response.json();

    if (data.success) {
      console.log('Recognition successful:', data.data.student);
      return data.data;
    } else {
      throw new Error(data.error || 'Recognition failed');
    }
  } catch (error) {
    console.error('Error recognizing face:', error);
    throw error;
  }
}
```

---

### React Native (Without Expo)

```javascript
import { launchCamera } from 'react-native-image-picker';
import RNFS from 'react-native-fs';

async function captureFacePhoto() {
  return new Promise((resolve, reject) => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'front',
        quality: 0.8,
        maxWidth: 1280,
        maxHeight: 1280,
      },
      async (response) => {
        if (response.didCancel) {
          reject(new Error('User cancelled'));
          return;
        }

        if (response.errorCode) {
          reject(new Error(response.errorMessage));
          return;
        }

        const photo = response.assets[0];
        const base64 = await RNFS.readFile(photo.uri, 'base64');
        resolve(`data:image/jpeg;base64,${base64}`);
      }
    );
  });
}

async function registerFaceRN(studentId, authToken) {
  try {
    const base64Photo = await captureFacePhoto();

    const response = await fetch('http://localhost:5001/api/v2/fr/register', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        studentId,
        photo: base64Photo,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Face registration error:', error);
    throw error;
  }
}
```

---

### Flutter

```dart
import 'package:image_picker/image_picker.dart';
import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;

class FRService {
  final String baseUrl = 'http://localhost:5001/api/v2/fr';
  final String authToken;

  FRService(this.authToken);

  Future<Map<String, dynamic>> registerFace(String studentId) async {
    try {
      // 1. Capture photo
      final ImagePicker picker = ImagePicker();
      final XFile? photo = await picker.pickImage(
        source: ImageSource.camera,
        preferredCameraDevice: CameraDevice.front,
        imageQuality: 80,
        maxWidth: 1280,
      );

      if (photo == null) {
        throw Exception('No photo captured');
      }

      // 2. Convert to base64
      final bytes = await File(photo.path).readAsBytes();
      final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';

      // 3. Send to API
      final response = await http.post(
        Uri.parse('$baseUrl/register'),
        headers: {
          'Authorization': 'Bearer $authToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'studentId': studentId,
          'photo': base64Image,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success']) {
        return data['data'];
      } else {
        throw Exception(data['error'] ?? 'Registration failed');
      }
    } catch (error) {
      print('Error registering face: $error');
      rethrow;
    }
  }

  Future<Map<String, dynamic>> recognizeFace() async {
    try {
      // 1. Capture photo
      final ImagePicker picker = ImagePicker();
      final XFile? photo = await picker.pickImage(
        source: ImageSource.camera,
        preferredCameraDevice: CameraDevice.front,
        imageQuality: 80,
      );

      if (photo == null) {
        throw Exception('No photo captured');
      }

      // 2. Convert to base64
      final bytes = await File(photo.path).readAsBytes();
      final base64Image = 'data:image/jpeg;base64,${base64Encode(bytes)}';

      // 3. Send to API
      final response = await http.post(
        Uri.parse('$baseUrl/recognize'),
        headers: {
          'Authorization': 'Bearer $authToken',
          'Content-Type': 'application/json',
        },
        body: jsonEncode({
          'photo': base64Image,
          'threshold': 0.5,
        }),
      );

      final data = jsonDecode(response.body);

      if (response.statusCode == 200 && data['success']) {
        return data['data'];
      } else {
        throw Exception(data['error'] ?? 'Recognition failed');
      }
    } catch (error) {
      print('Error recognizing face: $error');
      rethrow;
    }
  }
}
```

---

## Image Optimization for Mobile

### Recommended Settings

```javascript
// React Native / Expo
{
  quality: 0.8,        // 80% quality (good balance)
  maxWidth: 1280,      // Max width in pixels
  maxHeight: 1280,     // Max height in pixels
  aspect: [3, 4],      // Aspect ratio for face photos
}

// Flutter
imageQuality: 80,
maxWidth: 1280,
```

### Why These Settings?
- **Quality 0.8 (80%):** Maintains good facial detail while reducing file size
- **Max dimensions 1280px:** Sufficient for FR (backend resizes to 640x480 anyway)
- **Aspect 3:4:** Common portrait ratio for face photos

### File Size Guidelines
- Target: 200-500 KB per photo
- Maximum: 10 MB (enforced by API)
- Typical mobile photo at 80% quality: ~300 KB

---

## Error Handling

### Common Errors

#### 1. No Face Detected
```json
{
  "success": false,
  "error": "No face detected in the image",
  "failureReason": "no_face_detected"
}
```
**Solution:** Ensure good lighting, face is centered, and camera is clear.

#### 2. Liveness Check Failed
```json
{
  "success": false,
  "error": "Liveness check failed. Please use a live camera, not a photo or screen.",
  "failureReason": "liveness_failed",
  "livenessScore": 0.42
}
```
**Solution:** Use live camera capture, not gallery photos or screenshots.

#### 3. Face Not Recognized
```json
{
  "success": false,
  "error": "Face not recognized",
  "failureReason": "no_match_found"
}
```
**Solution:** Ensure student is registered, improve lighting, or try again.

#### 4. Image Too Large
```json
{
  "success": false,
  "error": "Image too large (max 10MB)"
}
```
**Solution:** Reduce image quality or dimensions.

---

## Network Optimization

### Mobile Network Considerations

#### 1. Image Compression
```javascript
// Optimize for mobile networks (3G/4G)
const optimizedConfig = {
  quality: 0.7,  // Lower quality for slower networks
  maxWidth: 960, // Smaller dimensions
  maxHeight: 960,
};
```

#### 2. Retry Logic
```javascript
async function uploadWithRetry(url, body, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        return await response.json();
      }

      // If not last retry, wait before retrying
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
      }
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
    }
  }
}
```

#### 3. Offline Queue (Future Enhancement - Sprint 3)
```javascript
// Store failed uploads for later retry
import AsyncStorage from '@react-native-async-storage/async-storage';

async function queueFailedUpload(data) {
  const queue = JSON.parse(await AsyncStorage.getItem('fr_queue') || '[]');
  queue.push({ ...data, timestamp: Date.now() });
  await AsyncStorage.setItem('fr_queue', JSON.stringify(queue));
}

async function processQueue() {
  const queue = JSON.parse(await AsyncStorage.getItem('fr_queue') || '[]');
  // Process queue when online
}
```

---

## Performance Benchmarks

### Expected API Response Times

| Network | Registration | Recognition | Notes |
|---------|-------------|-------------|-------|
| WiFi | 1-2 seconds | 1-2 seconds | Optimal |
| 5G | 2-3 seconds | 2-3 seconds | Very good |
| 4G | 3-5 seconds | 3-5 seconds | Good |
| 3G | 5-10 seconds | 5-10 seconds | Acceptable |
| 2G | Not recommended | Not recommended | Too slow |

### Image Upload Sizes

| Quality | Dimensions | File Size | Upload Time (4G) |
|---------|-----------|-----------|------------------|
| 100% | 1920x1080 | ~800 KB | ~3 seconds |
| 80% | 1280x960 | ~300 KB | ~1 second |
| 70% | 960x720 | ~180 KB | ~0.7 seconds |

---

## Security Best Practices

### 1. Token Management
```javascript
// DO NOT store tokens in plain text
import * as SecureStore from 'expo-secure-store';

async function saveToken(token) {
  await SecureStore.setItemAsync('auth_token', token);
}

async function getToken() {
  return await SecureStore.getItemAsync('auth_token');
}
```

### 2. HTTPS Only in Production
```javascript
const API_BASE_URL = __DEV__
  ? 'http://localhost:5001/api/v2/fr'
  : 'https://your-production-api.com/api/v2/fr';
```

### 3. Validate Responses
```javascript
function validateFRResponse(data) {
  if (!data || typeof data.success !== 'boolean') {
    throw new Error('Invalid API response format');
  }

  if (!data.success && !data.error) {
    throw new Error('API returned error without message');
  }

  return data;
}
```

---

## Testing Checklist

- [ ] Test on iOS device
- [ ] Test on Android device
- [ ] Test with poor lighting
- [ ] Test with good lighting
- [ ] Test on 4G network
- [ ] Test on WiFi
- [ ] Test offline behavior
- [ ] Test error handling (no face, liveness fail, not recognized)
- [ ] Test with large images (>5MB)
- [ ] Test token expiration handling
- [ ] Test camera permissions denial
- [ ] Test with different camera resolutions

---

## Troubleshooting

### Issue: Camera permission denied
**Solution:** Add platform-specific permission requests:

**iOS (Info.plist):**
```xml
<key>NSCameraUsageDescription</key>
<string>We need camera access for facial recognition</string>
```

**Android (AndroidManifest.xml):**
```xml
<uses-permission android:name="android.permission.CAMERA" />
```

### Issue: Slow upload times
**Solution:**
- Reduce image quality to 70-80%
- Reduce max dimensions to 960x720
- Implement loading indicators for better UX

### Issue: Liveness check always fails
**Possible causes:**
- Using gallery photos instead of live camera
- Poor lighting conditions
- Camera quality too low

---

## Future Enhancements (Sprint 3)

1. **Offline Queue:** Store face captures offline, upload when online
2. **Real-Time Preview:** Show face detection preview before capture (like web UI)
3. **Batch Processing:** Upload multiple faces at once
4. **Quality Feedback:** Show real-time quality score before capture
5. **Progressive Upload:** Upload in chunks for large images

---

## Support

For issues or questions:
- Check backend logs: `backend/logs/`
- Review FRSession records in MongoDB for detailed failure reasons
- Contact backend team for API issues

---

## API Response Examples

### Successful Registration
```json
{
  "success": true,
  "message": "Face registered successfully",
  "data": {
    "studentId": "507f1f77bcf86cd799439011",
    "studentName": "John Doe",
    "confidence": 0.98,
    "quality": {
      "overall": 0.92,
      "faceSize": "good",
      "resolution": "high"
    },
    "livenessScore": 0.87
  }
}
```

### Successful Recognition
```json
{
  "success": true,
  "message": "Face recognized successfully",
  "data": {
    "studentId": "507f1f77bcf86cd799439011",
    "student": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "balagruha": "60f1c9b8e6a5c832487f8a1d"
    },
    "confidence": 0.89,
    "threshold": 0.5,
    "quality": {
      "overall": 0.91
    }
  }
}
```

---

**Document Version:** 1.0
**Last Updated:** 2025-10-23 21:07:57
**Maintained by:** Backend Team
