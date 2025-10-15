import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import ImageUpload from './ImageUpload';
import ProductImageUpload from '../admin/ProductImageUpload';

/**
 * ProductFormModal Component - Sprint5-Story-05
 * Modal form for creating and editing products
 * Enhanced with Story-14: Product Image Upload
 */

export default function ProductFormModal({ product, onClose, onSubmit, onRefresh }) {
  const isEditing = Boolean(product);

  const [formData, setFormData] = useState({
    sku: '',
    name: '',
    description: '',
    category: 'stationery',
    price: '',
    discountPrice: '',
    stock: '',
    lowStockThreshold: '10',
    imageUrl: '',
    isActive: true
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        sku: product.sku || '',
        name: product.name || '',
        description: product.description || '',
        category: product.category || 'stationery',
        price: product.price?.toString() || '',
        discountPrice: product.discountPrice?.toString() || '',
        stock: product.stock?.toString() || '',
        lowStockThreshold: product.lowStockThreshold?.toString() || '10',
        imageUrl: product.imageUrl || '',
        isActive: product.isActive !== undefined ? product.isActive : true
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleImageUpload = (url) => {
    setFormData(prev => ({ ...prev, imageUrl: url }));
  };

  const validateForm = () => {
    const newErrors = {};

    // SKU validation (only for new products)
    if (!isEditing && !formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    } else if (!isEditing && !/^[A-Z0-9-]+$/.test(formData.sku)) {
      newErrors.sku = 'SKU must contain only uppercase letters, numbers, and hyphens';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.length < 3 || formData.name.length > 100) {
      newErrors.name = 'Name must be between 3 and 100 characters';
    }

    // Description validation
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.length < 10 || formData.description.length > 500) {
      newErrors.description = 'Description must be between 10 and 500 characters';
    }

    // Price validation
    const price = parseInt(formData.price);
    if (!formData.price || isNaN(price) || price < 1) {
      newErrors.price = 'Price must be a positive number';
    }

    // Discount price validation
    if (formData.discountPrice) {
      const discountPrice = parseInt(formData.discountPrice);
      if (isNaN(discountPrice) || discountPrice < 0) {
        newErrors.discountPrice = 'Discount price must be a non-negative number';
      } else if (discountPrice >= price) {
        newErrors.discountPrice = 'Discount price must be less than regular price';
      }
    }

    // Stock validation
    if (formData.stock) {
      const stock = parseInt(formData.stock);
      if (isNaN(stock) || stock < 0) {
        newErrors.stock = 'Stock must be a non-negative number';
      }
    }

    // Low stock threshold validation
    if (formData.lowStockThreshold) {
      const threshold = parseInt(formData.lowStockThreshold);
      if (isNaN(threshold) || threshold < 0) {
        newErrors.lowStockThreshold = 'Low stock threshold must be a non-negative number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitting(true);

    try {
      const submitData = {
        ...formData,
        price: parseInt(formData.price),
        discountPrice: formData.discountPrice ? parseInt(formData.discountPrice) : null,
        stock: formData.stock ? parseInt(formData.stock) : 0,
        lowStockThreshold: formData.lowStockThreshold ? parseInt(formData.lowStockThreshold) : 10
      };

      // Remove empty/null values
      Object.keys(submitData).forEach(key => {
        if (submitData[key] === '' || submitData[key] === null) {
          delete submitData[key];
        }
      });

      await onSubmit(submitData);
    } catch (error) {
      // Error handling is done in parent component
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit Product' : 'Create Product'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* SKU (disabled for editing) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              SKU <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              disabled={isEditing}
              placeholder="e.g., STAT-001"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.sku ? 'border-red-500' : 'border-slate-300'
              } ${isEditing ? 'bg-slate-100 cursor-not-allowed' : ''}`}
            />
            {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
            {isEditing && <p className="mt-1 text-xs text-slate-500">SKU cannot be changed</p>}
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Premium Notebook A4"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              placeholder="Detailed product description..."
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.description ? 'border-red-500' : 'border-slate-300'
              }`}
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
            <p className="mt-1 text-xs text-slate-500">{formData.description.length}/500 characters</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="stationery">Stationery</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
              <option value="uniforms">Uniforms</option>
              <option value="digital">Digital</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Price & Discount Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Price (coins) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="1"
                placeholder="100"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.price ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Discount Price (coins)
              </label>
              <input
                type="number"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                min="0"
                placeholder="80"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.discountPrice ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.discountPrice && <p className="mt-1 text-sm text-red-600">{errors.discountPrice}</p>}
            </div>
          </div>

          {/* Stock & Low Stock Threshold */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="50"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.stock ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Low Stock Threshold
              </label>
              <input
                type="number"
                name="lowStockThreshold"
                value={formData.lowStockThreshold}
                onChange={handleChange}
                min="0"
                placeholder="10"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.lowStockThreshold ? 'border-red-500' : 'border-slate-300'
                }`}
              />
              {errors.lowStockThreshold && <p className="mt-1 text-sm text-red-600">{errors.lowStockThreshold}</p>}
            </div>
          </div>

          {/* Image Upload (Legacy - for backward compatibility) */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Product Image (Legacy)
            </label>
            <ImageUpload
              currentImageUrl={formData.imageUrl}
              onUpload={handleImageUpload}
            />
            <p className="mt-1 text-xs text-slate-500">
              {isEditing ? 'Use the image manager below for multiple images' : 'Save product first to upload multiple images'}
            </p>
          </div>

          {/* Story-14: Product Image Management (Only for existing products) */}
          {isEditing && product._id && (
            <ProductImageUpload
              productId={product._id}
              existingImages={product.images || []}
              onUploadSuccess={onRefresh}
            />
          )}

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
              Product is active and visible to students
            </label>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Saving...' : (isEditing ? 'Update Product' : 'Create Product')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
