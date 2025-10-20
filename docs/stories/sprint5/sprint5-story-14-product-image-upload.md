# Sprint5-Story-14: Shop Product Image Upload

**Epic:** ISF Shop System - Sprint 5
**Story ID:** STORY-14
**Priority:** High
**Estimated Effort:** 8 Story Points
**Sprint:** Sprint 5
**Status:** Ready for Development
**Assigned To:** Dev Agent James

---

## Story Overview

**As a** Coach/Admin
**I want to** upload and manage product images for shop items
**So that** students can see what products look like before purchasing

---

## Business Context

Currently, shop products use Unsplash URLs for images (`imageUrl` field). This creates several issues:
1. External dependency on Unsplash API
2. No control over image quality/availability
3. Cannot upload custom product photos
4. Single image limitation

This story implements a proper image upload system following the existing ISF Playground S3 patterns used by WTF, Tasks, Medical Records, and other modules.

---

## Acceptance Criteria

### AC1: Backend - S3 Image Upload Service
**Given** a coach/admin wants to upload product images
**When** they submit images via the API
**Then** the system should:
- Upload images to AWS S3 bucket `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS`
- Store images in folder structure: `shop/products/{productId}_{timestamp}.{ext}`
- Support multiple images per product (1-5 images)
- Validate: Only image files (jpeg, jpg, png, webp)
- Validate: Max 5MB per image
- Clean up local temporary files after successful S3 upload
- Return S3 URLs in response

**Verification:**
```bash
# Test API endpoint
POST /api/v2/shop/products/:productId/images
Authorization: Bearer {coach_token}
Content-Type: multipart/form-data

Files: images[] (array of image files)

Expected Response:
{
  "success": true,
  "images": [
    {
      "url": "https://s3.amazonaws.com/isf-shop-products/shop/products/67abc123_1729876543210.jpg",
      "isPrimary": true,
      "uploadedAt": "2025-10-15T10:30:00.000Z"
    }
  ]
}
```

### AC2: Backend - Image Delete Functionality
**Given** a coach/admin wants to remove a product image
**When** they delete an image via API
**Then** the system should:
- Remove image from S3 bucket
- Remove image reference from product document
- Return success confirmation

**Verification:**
```bash
DELETE /api/v2/shop/products/:productId/images/:imageId
Authorization: Bearer {coach_token}

Expected Response:
{
  "success": true,
  "message": "Image deleted successfully"
}
```

### AC3: Backend - Product Model Update
**Given** the system needs to store multiple images
**When** product data is queried
**Then** the product model should include:
- `imageUrl` (String) - Keep for backward compatibility
- `images` (Array) - New field structure:
  ```javascript
  images: [{
    url: String,
    isPrimary: Boolean,
    uploadedAt: Date
  }]
  ```

**Verification:**
- Existing products with `imageUrl` still work
- New products can have multiple images in `images` array
- First image in array is marked as `isPrimary: true`

### AC4: Frontend - Product Image Upload Component
**Given** a coach/admin is on the Product Management page
**When** they edit a product
**Then** they should see:
- Image upload interface with file selector
- Support for multiple file selection (max 5)
- Image preview for selected files
- Upload button with loading state
- Grid display of existing product images
- Delete button for each uploaded image

**Verification:**
- Component renders in Product Management modal
- File validation: Only images, max 5MB each
- Preview shows selected images before upload
- Error messages for invalid files

### AC5: Frontend - Image Upload Flow
**Given** a coach/admin has selected product images
**When** they click "Upload Images"
**Then** the system should:
- Show upload progress indicator
- Send files via multipart/form-data to backend
- Display success/error notifications
- Refresh product image grid on success
- Clear file selection after successful upload

**Verification:**
```javascript
// Test in browser console
const formData = new FormData();
formData.append('images', file1);
formData.append('images', file2);

const response = await api.post(
  '/api/v2/shop/products/{productId}/images',
  formData,
  { headers: { 'Content-Type': 'multipart/form-data' } }
);
```

### AC6: Migration - Existing Product Images
**Given** products exist with Unsplash `imageUrl` field
**When** the migration script runs
**Then** the system should:
- Convert existing `imageUrl` to `images` array format
- Mark migrated image as `isPrimary: true`
- Keep original `imageUrl` for backward compatibility
- Log migration success/failure

**Verification:**
```bash
node backend/scripts/migrateProductImages.js

Expected Output:
✅ Migrated 32 products successfully
📦 32 products now have images array
```

---

## Technical Implementation

### Architecture Decision: Follow Existing S3 Patterns

After analyzing the ISF Playground codebase, the following modules use S3:
- **WTF Module**: Images, videos, voice notes → `AWS_S3_WTF_BUCKET_NAME`
- **Tasks Module**: Attachments → `AWS_S3_BUCKET_NAME_TASK_ATTACHMENTS`
- **Medical Records**: Documents → `AWS_S3_BUCKET_NAME_MEDICAL_RECORDS`
- **Repair Requests**: Photos → `AWS_S3_BUCKET_NAME_REPAIR_REQUEST_ATTACHMENTS`

**Common Pattern (3-step process):**
1. Multer saves file to local `uploads/` directory
2. S3 service uploads file to AWS S3 bucket
3. Local file cleanup after successful upload

**Shop Images will follow this exact pattern.**

---

## Backend Implementation

### File Structure
```
backend/
├── services/
│   └── aws/
│       └── shopS3.js (NEW)
├── controllers/
│   └── shopProductImageController.js (NEW)
├── routes/
│   └── shopRoutes.js (UPDATE)
├── models/
│   └── shopItem.js (UPDATE)
└── scripts/
    └── migrateProductImages.js (NEW)
```

### 1. Environment Variables
Add to `backend/.env`:
```env
AWS_S3_BUCKET_NAME_SHOP_PRODUCTS=isf-shop-products
```

### 2. Shop S3 Service (`backend/services/aws/shopS3.js`)
```javascript
const { uploadFileToS3, deleteWtfMedia, extractS3KeyFromUrl } = require('./s3');
const path = require('path');

/**
 * Upload shop product image to S3
 * @param {string} filePath - Local file path from multer
 * @param {string} productId - MongoDB product ID
 * @returns {Promise<{success: boolean, url: string, key: string}>}
 */
exports.uploadShopProductImage = async (filePath, productId) => {
  try {
    const fileExtension = path.extname(filePath);
    const fileName = `shop/products/${productId}_${Date.now()}${fileExtension}`;

    const result = await uploadFileToS3(
      filePath,
      process.env.AWS_S3_BUCKET_NAME_SHOP_PRODUCTS,
      fileName
    );

    return result;
  } catch (error) {
    console.error('Shop image upload error:', error);
    throw error;
  }
};

/**
 * Delete shop product image from S3
 * @param {string} imageUrl - Full S3 URL or key
 * @returns {Promise<{success: boolean, key: string}>}
 */
exports.deleteShopProductImage = async (imageUrl) => {
  try {
    // Reuse existing delete function from s3.js
    const result = await deleteWtfMedia(imageUrl);
    return result;
  } catch (error) {
    console.error('Shop image delete error:', error);
    throw error;
  }
};
```

### 3. Product Image Controller (`backend/controllers/shopProductImageController.js`)
```javascript
const ShopItem = require('../models/shopItem');
const { uploadShopProductImage, deleteShopProductImage } = require('../services/aws/shopS3');
const fs = require('fs');
const { errorLogger } = require('../config/pino-config');

/**
 * Upload product images
 * POST /api/v2/shop/products/:productId/images
 */
exports.uploadProductImages = async (req, res) => {
  try {
    const { productId } = req.params;
    const files = req.files;

    // Validation
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No images provided'
      });
    }

    if (files.length > 5) {
      return res.status(400).json({
        success: false,
        message: 'Maximum 5 images allowed per product'
      });
    }

    // Check product exists
    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const uploadedImages = [];
    const existingImageCount = product.images ? product.images.length : 0;

    // Upload each image to S3
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const result = await uploadShopProductImage(file.path, productId);

        if (result.success) {
          uploadedImages.push({
            url: result.url,
            isPrimary: existingImageCount === 0 && i === 0, // First image is primary
            uploadedAt: new Date()
          });

          // Cleanup local file
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
        }
      } catch (uploadError) {
        errorLogger.error({
          error: uploadError,
          file: file.filename
        }, 'Failed to upload image');

        // Continue with other files even if one fails
        continue;
      }
    }

    if (uploadedImages.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Failed to upload any images'
      });
    }

    // Update product with new images
    product.images = [...(product.images || []), ...uploadedImages];
    await product.save();

    res.json({
      success: true,
      images: uploadedImages,
      message: `Successfully uploaded ${uploadedImages.length} image(s)`
    });

  } catch (error) {
    errorLogger.error({ error }, 'Product image upload controller error');
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Delete product image
 * DELETE /api/v2/shop/products/:productId/images/:imageId
 */
exports.deleteProductImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Find image in product
    const imageIndex = product.images.findIndex(
      img => img._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    const imageToDelete = product.images[imageIndex];

    // Delete from S3
    try {
      await deleteShopProductImage(imageToDelete.url);
    } catch (s3Error) {
      errorLogger.error({ error: s3Error }, 'Failed to delete from S3');
      // Continue even if S3 delete fails - remove from DB anyway
    }

    // Remove from product
    product.images.splice(imageIndex, 1);

    // If deleted image was primary, make first image primary
    if (imageToDelete.isPrimary && product.images.length > 0) {
      product.images[0].isPrimary = true;
    }

    await product.save();

    res.json({
      success: true,
      message: 'Image deleted successfully'
    });

  } catch (error) {
    errorLogger.error({ error }, 'Product image delete controller error');
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/**
 * Set primary image
 * PUT /api/v2/shop/products/:productId/images/:imageId/primary
 */
exports.setPrimaryImage = async (req, res) => {
  try {
    const { productId, imageId } = req.params;

    const product = await ShopItem.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Reset all images to non-primary
    product.images.forEach(img => {
      img.isPrimary = false;
    });

    // Set selected image as primary
    const imageIndex = product.images.findIndex(
      img => img._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }

    product.images[imageIndex].isPrimary = true;
    await product.save();

    res.json({
      success: true,
      message: 'Primary image updated successfully'
    });

  } catch (error) {
    errorLogger.error({ error }, 'Set primary image error');
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
```

### 4. Update Routes (`backend/routes/shopRoutes.js`)
```javascript
const { uploadProductImages, deleteProductImage, setPrimaryImage } = require('../controllers/shopProductImageController');
const { upload } = require('../middleware/upload');

// Add these routes to existing shop routes
router.post('/products/:productId/images',
  authenticate,
  authorize(['admin', 'coach']),
  upload.array('images', 5),  // Max 5 images
  uploadProductImages
);

router.delete('/products/:productId/images/:imageId',
  authenticate,
  authorize(['admin', 'coach']),
  deleteProductImage
);

router.put('/products/:productId/images/:imageId/primary',
  authenticate,
  authorize(['admin', 'coach']),
  setPrimaryImage
);
```

### 5. Update Shop Item Model (`backend/models/shopItem.js`)
```javascript
// Add to existing shopItemSchema
const shopItemSchema = new mongoose.Schema({
  // ... existing fields ...

  imageUrl: {
    type: String,
    default: ''  // Keep for backward compatibility
  },

  // NEW: Multiple images support
  images: [{
    url: {
      type: String,
      required: true
    },
    isPrimary: {
      type: Boolean,
      default: false
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],

  // ... rest of schema ...
}, {
  timestamps: true
});

// Virtual property for primary image (for backward compatibility)
shopItemSchema.virtual('primaryImageUrl').get(function() {
  if (this.images && this.images.length > 0) {
    const primaryImage = this.images.find(img => img.isPrimary);
    return primaryImage ? primaryImage.url : this.images[0].url;
  }
  return this.imageUrl || '';
});

// Ensure virtuals are included in JSON output
shopItemSchema.set('toJSON', { virtuals: true });
shopItemSchema.set('toObject', { virtuals: true });
```

### 6. Migration Script (`backend/scripts/migrateProductImages.js`)
```javascript
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const ShopItem = require('../models/shopItem');

async function migrateProductImages() {
  try {
    const dbConnection = process.env.NODE_ENV === 'local'
      ? process.env.MONGO_URI_LOCAL
      : process.env.MONGO_URI;

    await mongoose.connect(dbConnection, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('✅ Connected to MongoDB');

    // Find products with imageUrl but no images array
    const products = await ShopItem.find({
      imageUrl: { $exists: true, $ne: '' },
      $or: [
        { images: { $exists: false } },
        { images: { $size: 0 } }
      ]
    });

    console.log(`\n📦 Found ${products.length} products to migrate`);

    let migratedCount = 0;

    for (const product of products) {
      if (!product.images || product.images.length === 0) {
        product.images = [{
          url: product.imageUrl,
          isPrimary: true,
          uploadedAt: product.createdAt || new Date()
        }];

        await product.save();
        migratedCount++;

        console.log(`✅ Migrated: ${product.name}`);
      }
    }

    console.log(`\n✅ Migration completed successfully!`);
    console.log(`📊 Migrated ${migratedCount} products`);

    await mongoose.disconnect();
    console.log('✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Migration error:', error.message);
    process.exit(1);
  }
}

migrateProductImages();
```

---

## Frontend Implementation

### File Structure
```
frontend/src/
├── components/
│   └── admin/
│       └── ProductImageUpload.jsx (NEW)
├── pages/
│   └── admin/
│       └── ProductManagement.jsx (UPDATE)
└── api.js (no changes needed)
```

### 1. Product Image Upload Component (`frontend/src/components/admin/ProductImageUpload.jsx`)
```javascript
import React, { useState } from 'react';
import { api } from '../../api';
import { toast } from 'react-toastify';

const ProductImageUpload = ({ productId, existingImages = [], onUploadSuccess }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(null);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);

    // Validation
    const validFiles = files.filter(file => {
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 5MB)`);
        return false;
      }

      return true;
    });

    // Check total count
    const totalImages = existingImages.length + validFiles.length;
    if (totalImages > 5) {
      toast.error('Maximum 5 images allowed per product');
      return;
    }

    setSelectedFiles(validFiles);

    // Generate previews
    const newPreviews = validFiles.map(file => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error('Please select images to upload');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append('images', file);
      });

      const response = await api.post(
        `/api/v2/shop/products/${productId}/images`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setSelectedFiles([]);
        setPreviews([]);

        // Clear file input
        document.getElementById('imageInput').value = '';

        // Callback to refresh product data
        if (onUploadSuccess) {
          onUploadSuccess(response.data.images);
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error.response?.data?.message || 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (imageId) => {
    if (!window.confirm('Are you sure you want to delete this image?')) {
      return;
    }

    setDeleting(imageId);

    try {
      const response = await api.delete(
        `/api/v2/shop/products/${productId}/images/${imageId}`
      );

      if (response.data.success) {
        toast.success('Image deleted successfully');

        // Callback to refresh product data
        if (onUploadSuccess) {
          onUploadSuccess();
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(error.response?.data?.message || 'Failed to delete image');
    } finally {
      setDeleting(null);
    }
  };

  const handleSetPrimary = async (imageId) => {
    try {
      const response = await api.put(
        `/api/v2/shop/products/${productId}/images/${imageId}/primary`
      );

      if (response.data.success) {
        toast.success('Primary image updated');

        if (onUploadSuccess) {
          onUploadSuccess();
        }
      }
    } catch (error) {
      console.error('Set primary error:', error);
      toast.error('Failed to set primary image');
    }
  };

  return (
    <div className="product-image-upload">
      <h3 className="text-lg font-semibold mb-4">Product Images</h3>

      {/* Existing Images Grid */}
      {existingImages.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-600 mb-3">
            Current Images ({existingImages.length}/5)
          </p>
          <div className="grid grid-cols-5 gap-4">
            {existingImages.map((img) => (
              <div key={img._id} className="relative group">
                <img
                  src={img.url}
                  alt="Product"
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                {img.isPrimary && (
                  <span className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                    Primary
                  </span>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                  {!img.isPrimary && (
                    <button
                      onClick={() => handleSetPrimary(img._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                    >
                      Set Primary
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deleting === img._id}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
                  >
                    {deleting === img._id ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload New Images */}
      {existingImages.length < 5 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
          <input
            id="imageInput"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            multiple
            onChange={handleFileSelect}
            className="mb-4"
            max={5 - existingImages.length}
          />

          <p className="text-sm text-gray-600 mb-4">
            Select up to {5 - existingImages.length} image(s). Max 5MB each.
            Formats: JPEG, PNG, WebP
          </p>

          {/* Selected Files Preview */}
          {previews.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold mb-2">Selected Files:</p>
              <div className="grid grid-cols-5 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <span className="absolute bottom-1 left-1 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                      {selectedFiles[index].name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading || selectedFiles.length === 0}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {uploading ? 'Uploading...' : 'Upload Images'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductImageUpload;
```

### 2. Update Product Management Page (`frontend/src/pages/admin/ProductManagement.jsx`)
```javascript
import ProductImageUpload from '../../components/admin/ProductImageUpload';

// Inside the product edit modal, add:
<div className="mt-6">
  <ProductImageUpload
    productId={selectedProduct._id}
    existingImages={selectedProduct.images || []}
    onUploadSuccess={() => {
      // Refresh product data
      fetchProducts();
      // Optionally close modal or update selectedProduct state
    }}
  />
</div>
```

---

## Testing Plan

### Unit Tests
```javascript
// backend/tests/shopS3.test.js
describe('Shop S3 Service', () => {
  test('should upload product image to S3', async () => {
    const result = await uploadShopProductImage('./test-image.jpg', 'product123');
    expect(result.success).toBe(true);
    expect(result.url).toContain('shop/products/product123_');
  });

  test('should delete product image from S3', async () => {
    const result = await deleteShopProductImage('https://s3.../shop/products/product123_123456.jpg');
    expect(result.success).toBe(true);
  });
});

// backend/tests/shopProductImageController.test.js
describe('Product Image Controller', () => {
  test('should upload multiple images', async () => {
    // Mock multer files
    const req = {
      params: { productId: 'product123' },
      files: [mockFile1, mockFile2]
    };

    await uploadProductImages(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      images: expect.arrayContaining([
        expect.objectContaining({ url: expect.any(String) })
      ])
    });
  });

  test('should reject more than 5 images', async () => {
    const req = {
      params: { productId: 'product123' },
      files: [file1, file2, file3, file4, file5, file6]
    };

    await uploadProductImages(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});
```

### Integration Tests
```javascript
// backend/tests/integration/productImages.test.js
describe('Product Image Upload Integration', () => {
  test('Full upload flow', async () => {
    // 1. Create product
    const product = await ShopItem.create({ name: 'Test Product', price: 100 });

    // 2. Upload image
    const response = await request(app)
      .post(`/api/v2/shop/products/${product._id}/images`)
      .set('Authorization', `Bearer ${coachToken}`)
      .attach('images', './test-image.jpg');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    // 3. Verify product updated
    const updatedProduct = await ShopItem.findById(product._id);
    expect(updatedProduct.images.length).toBe(1);
    expect(updatedProduct.images[0].isPrimary).toBe(true);
  });
});
```

### E2E Tests
```javascript
// frontend/tests/e2e/productImageUpload.spec.js
describe('Product Image Upload E2E', () => {
  test('Coach uploads product images', async () => {
    // 1. Login as coach
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'coach@test.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    // 2. Navigate to Product Management
    await page.goto('http://localhost:3000/admin/products');

    // 3. Edit product
    await page.click('[data-testid="edit-product-btn"]');

    // 4. Upload image
    const fileInput = await page.$('input[type="file"]');
    await fileInput.setInputFiles('./test-image.jpg');
    await page.click('button:has-text("Upload Images")');

    // 5. Verify success
    await page.waitForSelector('.toast:has-text("Successfully uploaded")');
    await page.waitForSelector('.image-grid img');
  });
});
```

---

## QA Test Cases

### TC1: Upload Single Image
**Preconditions:** Logged in as coach, product exists
1. Navigate to Product Management
2. Click Edit on any product
3. Click "Choose Files" and select 1 image (< 5MB)
4. Click "Upload Images"
**Expected:** Image uploads successfully, appears in grid, toast shows success

### TC2: Upload Multiple Images (Max 5)
**Preconditions:** Same as TC1
1. Select 5 images at once
2. Click "Upload Images"
**Expected:** All 5 images upload, total count = 5, further uploads disabled

### TC3: Upload Exceeds 5 Images
**Preconditions:** Product has 3 images
1. Try to upload 3 more images
**Expected:** Error toast: "Maximum 5 images allowed per product"

### TC4: Upload Invalid File Type
**Preconditions:** Same as TC1
1. Select a PDF file
2. Try to upload
**Expected:** Error toast: "file.pdf is not an image file"

### TC5: Upload Oversized Image
**Preconditions:** Same as TC1
1. Select image > 5MB
2. Try to upload
**Expected:** Error toast: "file.jpg is too large (max 5MB)"

### TC6: Delete Product Image
**Preconditions:** Product has 3 images
1. Hover over any image
2. Click "Delete"
3. Confirm deletion
**Expected:** Image removed from grid, product updated, remaining images still visible

### TC7: Set Primary Image
**Preconditions:** Product has 3 images, image #2 is primary
1. Hover over image #3
2. Click "Set Primary"
**Expected:** Image #3 shows "Primary" badge, image #2 badge removed

### TC8: Migration Script
**Preconditions:** Products exist with imageUrl field
1. Run: `node backend/scripts/migrateProductImages.js`
**Expected:** Console shows success count, products have images array populated

### TC9: API Authorization
**Preconditions:** Logged in as student
1. Try to upload image via API
**Expected:** 403 Forbidden - Only coaches/admins can upload

### TC10: Backward Compatibility
**Preconditions:** Product with old imageUrl field
1. Fetch product via API
2. Check response
**Expected:** Product has both `imageUrl` and `images` array, `primaryImageUrl` virtual field works

---

## Dependencies

### Backend
- Existing: `multer`, `@aws-sdk/client-s3`
- No new packages needed ✅

### Frontend
- Existing: `axios`, `react-toastify`
- No new packages needed ✅

### Infrastructure
- AWS S3 bucket: `isf-shop-products`
- IAM permissions for S3 upload/delete

---

## Deployment Checklist

### Pre-Deployment
- [ ] Create S3 bucket: `isf-shop-products`
- [ ] Configure S3 bucket permissions (CORS, public read)
- [ ] Add environment variable to server: `AWS_S3_BUCKET_NAME_SHOP_PRODUCTS`
- [ ] Run migration script on production: `node backend/scripts/migrateProductImages.js`

### Backend Deployment
- [ ] Deploy backend changes
- [ ] Restart backend server: `pm2 restart ISF-BE`
- [ ] Verify routes: `curl -X GET https://playground.../api/v2/shop/products`
- [ ] Test image upload via Postman

### Frontend Deployment
- [ ] Build frontend: `npm run build`
- [ ] Deploy to server
- [ ] Clear browser cache
- [ ] Verify image upload UI appears

### Post-Deployment
- [ ] Smoke test: Upload 1 image
- [ ] Smoke test: Delete 1 image
- [ ] Smoke test: Set primary image
- [ ] Check S3 bucket for uploaded files
- [ ] Monitor backend logs for errors

---

## Risks and Mitigations

### Risk 1: S3 Bucket Not Created
**Impact:** Backend crashes on image upload
**Mitigation:** Create bucket beforehand, add try-catch in controller

### Risk 2: Large Image Upload Timeout
**Impact:** Upload fails for slow networks
**Mitigation:** Add timeout configuration to multer, show progress indicator

### Risk 3: S3 Delete Fails but DB Updated
**Impact:** Orphaned files in S3 bucket
**Mitigation:** Log delete failures, create cleanup script to find orphaned files

### Risk 4: Migration Script Overwrites Existing Images
**Impact:** Data loss
**Mitigation:** Migration checks for existing `images` array before overwriting

---

## Success Metrics

- [ ] Coaches can upload product images via admin panel
- [ ] Students see product images on shop page
- [ ] No external dependency on Unsplash
- [ ] Images load from S3 with <2 second latency
- [ ] All existing products migrated successfully
- [ ] Zero S3 upload errors in production logs

---

## Story Sign-Off

**Definition of Done:**
- [ ] All acceptance criteria met
- [ ] Unit tests pass (>80% coverage)
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] QA approved all test cases
- [ ] Code reviewed and merged
- [ ] Backend deployed to production
- [ ] Frontend deployed to production
- [ ] Migration script executed successfully
- [ ] Product Owner approved

**Developed By:** Dev Agent James (Claude Sonnet 4.5)
**Reviewed By:** _Pending_
**QA Approved By:** _Pending_
**Product Owner:** _Pending_

---

**Story Created:** October 15, 2025
**Target Completion:** Sprint 5
**Actual Completion:** _Pending_

---

# DEV AGENT IMPLEMENTATION RECORD
