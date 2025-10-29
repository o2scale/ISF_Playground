import React, { useState } from 'react';
import { approvePurchaseRequest } from '../../../api';
import toast from 'react-hot-toast';

/**
 * ApproveRequestModal - Sprint5-Story-18
 * Modal for Admin to approve purchase requests with optional notes
 */
export default function ApproveRequestModal({ request, onClose, onSuccess }) {
  const [reviewNotes, setReviewNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    try {
      setLoading(true);
      const response = await approvePurchaseRequest(request._id, {
        reviewNotes: reviewNotes.trim()
      });

      if (response.success) {
        toast.success('Purchase request approved successfully');
        onSuccess();
      } else {
        toast.error(response.message || 'Error approving request');
      }
    } catch (error) {
      console.error('Error approving request:', error);
      toast.error(error.message || 'Error approving request');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date
  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Helper function to get time ago
  const getTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const then = new Date(date);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffMins > 0) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container approval-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>✅ Approve Purchase Request</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Request Summary */}
          <div className="request-summary">
            <div className="summary-row">
              <label>Request ID:</label>
              <strong>{request.requestId}</strong>
            </div>
            <div className="summary-row">
              <label>Product:</label>
              <strong>{request.productName} ({request.productSKU})</strong>
            </div>
            <div className="summary-row">
              <label>Current Stock:</label>
              <span className={request.currentStock === 0 ? 'text-danger' : 'text-warning'}>
                {request.currentStock} / {request.lowStockThreshold}
                {request.currentStock === 0 && ' 🔴 Out of Stock'}
                {request.currentStock > 0 && request.currentStock <= request.lowStockThreshold && ' ⚠️ Low Stock'}
              </span>
            </div>
            <div className="summary-row">
              <label>Quantity Requested:</label>
              <strong>{request.requestedQuantity} units</strong>
            </div>
            <div className="summary-row">
              <label>Requested By:</label>
              <span>
                {request.requestedBy?.name} (Purchase Manager)
                <br />
                <small>📍 {request.balagruhaId?.name || 'Shop-wide'}</small>
              </span>
            </div>
            <div className="summary-row">
              <label>Reason:</label>
              <p>{request.reason}</p>
            </div>
            {request.justification && (
              <div className="summary-row">
                <label>Justification:</label>
                <p>{request.justification}</p>
              </div>
            )}
            <div className="summary-row">
              <label>Requested:</label>
              <span>{formatDate(request.createdAt)} ({getTimeAgo(request.createdAt)})</span>
            </div>
          </div>

          <hr />

          {/* Admin Notes */}
          <div className="form-group">
            <label>Admin Notes (Optional)</label>
            <textarea
              rows="3"
              maxLength="500"
              value={reviewNotes}
              onChange={(e) => setReviewNotes(e.target.value)}
              placeholder="Add any notes about this approval (e.g., supplier to use, special instructions)"
            />
            <small className="char-count">{reviewNotes.length}/500</small>
          </div>

          {/* Stock Projection */}
          <div className="stock-projection">
            <div className="projection-item">
              <span>Current Stock:</span>
              <strong>{request.currentStock}</strong>
            </div>
            <div className="projection-arrow">→</div>
            <div className="projection-item">
              <span>After Purchase:</span>
              <strong className="text-success">
                {request.currentStock + request.requestedQuantity}
              </strong>
            </div>
          </div>

          {/* Confirmation */}
          <div className="confirmation-box">
            <p>⚠️ Are you sure you want to <strong>approve</strong> this purchase request?</p>
            <p>The Purchase Manager will be able to update stock after making the purchase.</p>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="cancel-button"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="approve-button"
            onClick={handleApprove}
            disabled={loading}
          >
            {loading ? 'Approving...' : '✅ Approve Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
