import React, { useState, useEffect } from 'react';
import {
  createPurchaseRequest,
  getAllShopItems
} from '../../../api';
import showToast from '../../../utils/toast';
import '../PurchaseManagement.css';

/**
 * Create Purchase Request Modal - Sprint5-Story-17
 * Form for Purchase Managers to create new purchase requests
 */
export default function CreatePurchaseRequestModal({
  onClose,
  onSuccess,
  userBalagruhas,
  balagruhas
}) {
  const [formData, setFormData] = useState({
    balagruhaId: '',
    productId: '',
    requestedQuantity: '',
    reason: '',
    justification: ''
  });
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  useEffect(() => {
    // Set default balagruha if only one assigned
    if (userBalagruhas.length === 1 && balagruhas.length > 0) {
      const defaultBalagruha = balagruhas[0];
      setFormData(prev => ({ ...prev, balagruhaId: defaultBalagruha._id }));
      fetchProducts(defaultBalagruha._id);
    }
  }, [userBalagruhas, balagruhas]);

  const fetchProducts = async (balagruhaId) => {
    try {
      setFetchingProducts(true);
      const response = await getAllShopItems();

      if (response.success) {
        const allProducts = response.products || [];

        // Filter products: low stock + from selected balagruha (or shop-wide)
        const filtered = allProducts.filter(item => {
          const isLowStock = item.stock <= item.lowStockThreshold;
          const matchesBalagruha = !item.balagruhaId || item.balagruhaId === balagruhaId;
          return isLowStock && matchesBalagruha && item.isActive;
        });

        setProducts(allProducts);
        setLowStockProducts(filtered);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showToast('Error loading products', 'error');
    } finally {
      setFetchingProducts(false);
    }
  };

  const handleBalagruhaChange = (e) => {
    const balagruhaId = e.target.value;
    setFormData(prev => ({
      ...prev,
      balagruhaId,
      productId: ''  // Reset product when balagruha changes
    }));

    if (balagruhaId) {
      fetchProducts(balagruhaId);
    } else {
      setLowStockProducts([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.balagruhaId) {
      showToast('Please select a balagruha', 'error');
      return;
    }
    if (!formData.productId) {
      showToast('Please select a product', 'error');
      return;
    }
    if (!formData.requestedQuantity || formData.requestedQuantity < 1) {
      showToast('Please enter a valid quantity (at least 1)', 'error');
      return;
    }
    if (!formData.reason.trim()) {
      showToast('Please provide a reason', 'error');
      return;
    }

    try {
      setLoading(true);
      const response = await createPurchaseRequest({
        productId: formData.productId,
        requestedQuantity: parseInt(formData.requestedQuantity),
        reason: formData.reason.trim(),
        justification: formData.justification.trim()
      });

      if (response.success) {
        showToast('Purchase request created successfully', 'success');
        onSuccess();
      } else {
        showToast(response.message || 'Error creating request', 'error');
      }
    } catch (error) {
      console.error('Error creating request:', error);
      showToast(error.response?.data?.message || 'Error creating request', 'error');
    } finally {
      setLoading(false);
    }
  };

  const getStockBadge = (product) => {
    if (product.stock === 0) {
      return <span className="stock-badge out-of-stock">🔴 Out of Stock</span>;
    } else if (product.stock <= product.lowStockThreshold) {
      return <span className="stock-badge low-stock">⚠️ Low Stock</span>;
    }
    return null;
  };

  const selectedProduct = products.find(p => p._id === formData.productId);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📝 New Purchase Request</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {/* Balagruha Selection */}
            <div className="form-group">
              <label className="form-label">
                Balagruha <span className="required">*</span>
              </label>
              <select
                value={formData.balagruhaId}
                onChange={handleBalagruhaChange}
                required
                disabled={userBalagruhas.length === 1}
                className="form-select"
              >
                <option value="">Select Balagruha</option>
                {balagruhas.map(bg => (
                  <option key={bg._id} value={bg._id}>
                    {bg.name}
                  </option>
                ))}
              </select>
              {userBalagruhas.length === 1 && (
                <small className="form-hint">Only one balagruha assigned to you</small>
              )}
            </div>

            {/* Product Selection */}
            <div className="form-group">
              <label className="form-label">
                Product (Low Stock Items) <span className="required">*</span>
              </label>
              <select
                value={formData.productId}
                onChange={(e) => setFormData(prev => ({ ...prev, productId: e.target.value }))}
                required
                disabled={!formData.balagruhaId || fetchingProducts}
                className="form-select"
              >
                <option value="">
                  {fetchingProducts
                    ? 'Loading products...'
                    : formData.balagruhaId
                    ? 'Select Product'
                    : 'Select Balagruha first'}
                </option>
                {lowStockProducts.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.name} - Stock: {product.stock}/{product.lowStockThreshold}
                    {product.stock === 0 ? ' 🔴' : ' ⚠️'}
                  </option>
                ))}
              </select>
              {lowStockProducts.length === 0 && formData.balagruhaId && !fetchingProducts && (
                <small className="form-hint success">
                  ✅ No low-stock items in this balagruha!
                </small>
              )}
            </div>

            {/* Selected Product Info */}
            {selectedProduct && (
              <div className="product-info-card">
                <h4>Selected Product Details</h4>
                <div className="product-detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedProduct.name}</span>
                </div>
                <div className="product-detail-row">
                  <span className="detail-label">SKU:</span>
                  <span className="detail-value">{selectedProduct.sku}</span>
                </div>
                <div className="product-detail-row">
                  <span className="detail-label">Current Stock:</span>
                  <span className="detail-value">
                    {selectedProduct.stock} / {selectedProduct.lowStockThreshold}
                    {getStockBadge(selectedProduct)}
                  </span>
                </div>
                <div className="product-detail-row">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">{selectedProduct.price} coins</span>
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="form-group">
              <label className="form-label">
                Quantity Requested <span className="required">*</span>
              </label>
              <input
                type="number"
                min="1"
                value={formData.requestedQuantity}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  requestedQuantity: e.target.value
                }))}
                placeholder="Enter quantity"
                required
                className="form-input"
              />
              {selectedProduct && formData.requestedQuantity && (
                <small className="form-hint">
                  Estimated cost: {(selectedProduct.price * formData.requestedQuantity).toLocaleString()} coins
                </small>
              )}
            </div>

            {/* Reason */}
            <div className="form-group">
              <label className="form-label">
                Reason <span className="required">*</span>
              </label>
              <input
                type="text"
                maxLength="200"
                value={formData.reason}
                onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
                placeholder="Why is this purchase needed?"
                required
                className="form-input"
              />
              <small className="char-count">{formData.reason.length}/200 characters</small>
            </div>

            {/* Justification */}
            <div className="form-group">
              <label className="form-label">
                Justification (Optional)
              </label>
              <textarea
                maxLength="500"
                rows="3"
                value={formData.justification}
                onChange={(e) => setFormData(prev => ({ ...prev, justification: e.target.value }))}
                placeholder="Additional details or context (optional)"
                className="form-textarea"
              />
              <small className="char-count">{formData.justification.length}/500 characters</small>
            </div>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || lowStockProducts.length === 0}
            >
              {loading ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
