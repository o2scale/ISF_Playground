import React, { useState, useEffect } from 'react';
import {
  createPurchaseRequest,
  getLowStockProducts
} from '../../../api';
import showToast from '../../../utils/toast';
import '../PurchaseManagement.css';

/**
 * Create Purchase Request Modal - Sprint5-Story-17
 * Form for Purchase Managers to create multi-product purchase requests with file upload
 * REWRITTEN: Supports multiple products, file attachments, and estimated costs
 */
export default function CreatePurchaseRequestModal({
  onClose,
  onSuccess,
  userBalagruhas,
  balagruhas
}) {
  // ============================================================================
  // STATE MANAGEMENT
  // ============================================================================

  const [formData, setFormData] = useState({
    balagruhaId: '',
    items: [],  // Array of {productId, productName, productSKU, requestedQuantity, estimatedUnitCost}
    reason: '',
    justification: '',
    attachments: []  // NEW - File array
  });

  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState(new Set());
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(false);

  // ============================================================================
  // FILE PREVIEW COMPONENT (Copied from MachineRepairsView.jsx)
  // ============================================================================

  const FilePreview = ({ file }) => {
    const [preview, setPreview] = useState("");

    useEffect(() => {
      if (file) {
        if (file instanceof File) {
          // For new files
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
          };
          reader.readAsDataURL(file);
        } else {
          // For existing files from server
          setPreview(file.fileUrl || file.url);
        }
      }
    }, [file]);

    const isImage = (file) => {
      const imageTypes = ["jpg", "jpeg", "png", "gif", "webp"];
      const extension = file.name
        ? file.name.split(".").pop().toLowerCase()
        : (file.fileUrl || file.url)?.split(".").pop().toLowerCase();
      return imageTypes.includes(extension);
    };

    return (
      <div className="file-preview">
        {isImage(file) ? (
          <img src={preview} alt="preview" className="preview-image" />
        ) : (
          <div className="preview-document">
            <i className="fas fa-file-pdf"></i>
            <span>{file.name || "Document"}</span>
          </div>
        )}
      </div>
    );
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    // Set default balagruha if only one assigned
    if (userBalagruhas.length === 1 && balagruhas.length > 0) {
      const defaultBalagruha = balagruhas[0];
      setFormData(prev => ({ ...prev, balagruhaId: defaultBalagruha._id }));
      fetchProducts(defaultBalagruha._id);
    }
  }, [userBalagruhas, balagruhas]);

  // ============================================================================
  // PRODUCT FETCHING
  // ============================================================================

  const fetchProducts = async (balagruhaId) => {
    try {
      setFetchingProducts(true);
      // Use new endpoint that Purchase Managers can access
      const response = await getLowStockProducts();

      if (response.success) {
        const allProducts = response.products || [];

        // Filter products by selected balagruha (backend already filters low stock)
        const filtered = allProducts.filter(item => {
          const matchesBalagruha = !item.balagruhaId || item.balagruhaId === balagruhaId;
          return matchesBalagruha;
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

  // ============================================================================
  // EVENT HANDLERS - Balagruha Selection
  // ============================================================================

  const handleBalagruhaChange = (e) => {
    const balagruhaId = e.target.value;
    setFormData(prev => ({
      ...prev,
      balagruhaId,
      items: []  // Reset items when balagruha changes
    }));
    setSelectedProducts(new Set());  // Clear selected products

    if (balagruhaId) {
      fetchProducts(balagruhaId);
    } else {
      setLowStockProducts([]);
    }
  };

  // ============================================================================
  // EVENT HANDLERS - Product Selection
  // ============================================================================

  const handleProductToggle = (product) => {
    const newSelected = new Set(selectedProducts);

    if (newSelected.has(product._id)) {
      // Uncheck - remove from selection
      newSelected.delete(product._id);
      setFormData(prev => ({
        ...prev,
        items: prev.items.filter(item => item.productId !== product._id)
      }));
    } else {
      // Check - add to selection
      newSelected.add(product._id);
      setFormData(prev => ({
        ...prev,
        items: [...prev.items, {
          productId: product._id,
          productName: product.name,
          productSKU: product.sku,
          requestedQuantity: 1,  // Default quantity
          estimatedUnitCost: 0   // User must fill in
        }]
      }));
    }

    setSelectedProducts(newSelected);
  };

  // ============================================================================
  // EVENT HANDLERS - Item Quantity and Cost
  // ============================================================================

  const updateItemQuantity = (index, quantity) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, requestedQuantity: Math.max(1, parseInt(quantity) || 1) } : item
      )
    }));
  };

  const updateItemCost = (index, cost) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index ? { ...item, estimatedUnitCost: Math.max(0, parseFloat(cost) || 0) } : item
      )
    }));
  };

  const removeItem = (index) => {
    const removedProductId = formData.items[index].productId;

    setFormData(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index)
    }));

    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      newSet.delete(removedProductId);
      return newSet;
    });
  };

  // ============================================================================
  // EVENT HANDLERS - File Upload (Copied from MachineRepairsView.jsx)
  // ============================================================================

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  // ============================================================================
  // UTILITY FUNCTIONS
  // ============================================================================

  const calculateTotalCost = () => {
    return formData.items.reduce((sum, item) => {
      return sum + (item.requestedQuantity * item.estimatedUnitCost);
    }, 0);
  };

  const getStockBadge = (product) => {
    if (product.stock === 0) {
      return <span className="stock-badge out-of-stock">🔴</span>;
    } else if (product.stock <= product.lowStockThreshold) {
      return <span className="stock-badge low-stock">⚠️</span>;
    }
    return null;
  };

  // ============================================================================
  // FORM SUBMISSION
  // ============================================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation - Balagruha
    if (!formData.balagruhaId) {
      showToast('Please select a balagruha', 'error');
      return;
    }

    // Validation - At least one product
    if (formData.items.length === 0) {
      showToast('Please select at least one product', 'error');
      return;
    }

    // Validation - All items must have valid quantity and cost
    const invalidItems = formData.items.filter(
      item => !item.requestedQuantity || item.requestedQuantity < 1 ||
              item.estimatedUnitCost < 0
    );

    if (invalidItems.length > 0) {
      showToast('Please enter valid quantity (≥1) and cost (≥0) for all products', 'error');
      return;
    }

    // Validation - Reason required
    if (!formData.reason.trim()) {
      showToast('Please provide a reason', 'error');
      return;
    }

    try {
      setLoading(true);

      // Create FormData (required for file upload)
      const submitData = new FormData();

      // Add regular fields
      submitData.append('balagruhaId', formData.balagruhaId);
      submitData.append('items', JSON.stringify(formData.items)); // Stringify items array
      submitData.append('reason', formData.reason.trim());
      submitData.append('justification', formData.justification.trim());

      // Add files
      formData.attachments.forEach(file => {
        submitData.append('attachments', file);
      });

      // Send request
      const response = await createPurchaseRequest(submitData);

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

  // ============================================================================
  // RENDER
  // ============================================================================

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📝 New Purchase Request (Multi-Product)</h3>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">

            {/* ================================================================ */}
            {/* BALAGRUHA SELECTION */}
            {/* ================================================================ */}

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

            {/* ================================================================ */}
            {/* PRODUCT SELECTION - Checkbox List */}
            {/* ================================================================ */}

            <div className="form-group">
              <label className="form-label">
                Select Products <span className="required">*</span>
              </label>

              {/* Toggle: Show All Products */}
              <div className="product-filter">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={showAllProducts}
                    onChange={(e) => setShowAllProducts(e.target.checked)}
                    disabled={!formData.balagruhaId || fetchingProducts}
                  />
                  Show all products (not just low stock)
                </label>
              </div>

              {/* Product Checkbox List */}
              {formData.balagruhaId && !fetchingProducts && (
                <div className="product-checklist">
                  {(showAllProducts ? products : lowStockProducts)
                    .filter(p => !p.balagruhaId || p.balagruhaId === formData.balagruhaId)
                    .map(product => (
                      <label key={product._id} className="product-checkbox-item">
                        <input
                          type="checkbox"
                          checked={selectedProducts.has(product._id)}
                          onChange={() => handleProductToggle(product)}
                        />
                        <span className="product-details">
                          <span className="product-name">{product.name}</span>
                          <span className="product-meta">
                            {product.sku} · Stock: {product.stock}/{product.lowStockThreshold}
                            {getStockBadge(product)}
                          </span>
                        </span>
                      </label>
                    ))}
                </div>
              )}

              {fetchingProducts && (
                <p className="form-hint">Loading products...</p>
              )}

              {!formData.balagruhaId && (
                <p className="form-hint">Please select a balagruha first</p>
              )}

              {formData.balagruhaId && !fetchingProducts &&
               lowStockProducts.filter(p => !p.balagruhaId || p.balagruhaId === formData.balagruhaId).length === 0 &&
               !showAllProducts && (
                <small className="form-hint success">
                  ✅ No low-stock items in this balagruha! Toggle to show all products.
                </small>
              )}
            </div>

            {/* ================================================================ */}
            {/* SELECTED PRODUCTS TABLE */}
            {/* ================================================================ */}

            {formData.items.length > 0 && (
              <div className="selected-products-section">
                <h4>Selected Products ({formData.items.length})</h4>
                <div className="table-responsive">
                  <table className="selected-items-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>SKU</th>
                        <th style={{width: '120px'}}>Quantity *</th>
                        <th style={{width: '140px'}}>Unit Cost (₹) *</th>
                        <th style={{width: '120px'}}>Total (₹)</th>
                        <th style={{width: '60px'}}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {formData.items.map((item, index) => (
                        <tr key={item.productId}>
                          <td>{item.productName}</td>
                          <td className="sku-cell">{item.productSKU}</td>
                          <td>
                            <input
                              type="number"
                              className="table-input"
                              value={item.requestedQuantity}
                              onChange={(e) => updateItemQuantity(index, e.target.value)}
                              min="1"
                              required
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              className="table-input"
                              value={item.estimatedUnitCost}
                              onChange={(e) => updateItemCost(index, e.target.value)}
                              min="0"
                              step="0.01"
                              placeholder="0.00"
                              required
                            />
                          </td>
                          <td className="total-cell">
                            ₹{(item.requestedQuantity * item.estimatedUnitCost).toFixed(2)}
                          </td>
                          <td>
                            <button
                              type="button"
                              className="btn-icon-remove"
                              onClick={() => removeItem(index)}
                              title="Remove product"
                            >
                              ✖
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="total-row">
                        <td colSpan="4" className="total-label">
                          <strong>Total Estimated Cost:</strong>
                        </td>
                        <td colSpan="2" className="total-amount">
                          <strong>₹{calculateTotalCost().toFixed(2)}</strong>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className="form-hint">
                  * Fill in quantity and estimated unit cost for all products before submitting
                </p>
              </div>
            )}

            {/* ================================================================ */}
            {/* FILE UPLOAD SECTION */}
            {/* ================================================================ */}

            <div className="form-group">
              <label className="form-label">
                Attachments (Optional)
              </label>
              <div className="file-upload-container">
                <input
                  type="file"
                  id="purchase-request-file-upload"
                  onChange={handleFileUpload}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                  style={{ display: 'none' }}
                />
                <label
                  htmlFor="purchase-request-file-upload"
                  className="file-upload-label"
                >
                  <i className="fas fa-cloud-upload-alt"></i>
                  Choose Files (PDF, Images, Documents)
                </label>
              </div>

              {/* File Previews */}
              {formData.attachments.length > 0 && (
                <div className="new-attachments">
                  <h4>Selected Files ({formData.attachments.length}):</h4>
                  <div className="attachments-grid">
                    {formData.attachments.map((file, index) => (
                      <div key={`new-${index}`} className="attachment-item">
                        <FilePreview file={file} />
                        <div className="attachment-actions">
                          <span className="file-name">{file.name}</span>
                          <button
                            type="button"
                            className="remove-file"
                            onClick={() => removeFile(index)}
                            title="Remove file"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ================================================================ */}
            {/* REASON */}
            {/* ================================================================ */}

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

            {/* ================================================================ */}
            {/* JUSTIFICATION */}
            {/* ================================================================ */}

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

          {/* ================================================================ */}
          {/* MODAL FOOTER - Action Buttons */}
          {/* ================================================================ */}

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
              disabled={loading || formData.items.length === 0}
            >
              {loading ? 'Creating...' : 'Create Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
