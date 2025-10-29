import React from 'react';
import dayjs from 'dayjs';
import { cancelPurchaseRequest } from '../../../api';
import showToast from '../../../utils/toast';
import '../PurchaseManagement.css';

/**
 * View Request Modal - Sprint5-Story-17
 * Displays full details of a purchase request
 */
export default function ViewRequestModal({ request, onClose, userRole, onRefresh }) {
  const getStatusBadge = (status) => {
    const badges = {
      pending_approval: { icon: '🟡', label: 'Pending Approval', className: 'status-pending' },
      approved: { icon: '✅', label: 'Approved', className: 'status-approved' },
      rejected: { icon: '❌', label: 'Rejected', className: 'status-rejected' },
      completed: { icon: '✅', label: 'Completed', className: 'status-completed' },
      cancelled: { icon: '⚫', label: 'Cancelled', className: 'status-cancelled' }
    };

    const badge = badges[status] || badges.pending_approval;
    return (
      <span className={`status-badge large ${badge.className}`}>
        {badge.icon} {badge.label}
      </span>
    );
  };

  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this request?')) {
      return;
    }

    try {
      const response = await cancelPurchaseRequest(request._id);
      if (response.success) {
        showToast('Request cancelled successfully', 'success');
        onRefresh();
        onClose();
      } else {
        showToast(response.message || 'Error cancelling request', 'error');
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
      showToast(error.response?.data?.message || 'Error cancelling request', 'error');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h3>📋 Purchase Request Details</h3>
            <span className="request-id-badge">{request.requestId}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          {/* Status Section */}
          <div className="detail-section">
            <h4 className="section-title">Status</h4>
            <div className="status-display">
              {getStatusBadge(request.status)}
            </div>
          </div>

          {/* Product Information */}
          <div className="detail-section">
            <h4 className="section-title">Product Information</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Product Name:</span>
                <span className="detail-value">{request.productName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">SKU:</span>
                <span className="detail-value">{request.productSKU}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Stock:</span>
                <span className="detail-value">
                  {request.currentStock} units
                  {request.currentStock === 0 && (
                    <span className="stock-badge out-of-stock ml-2">Out of Stock</span>
                  )}
                  {request.currentStock > 0 && request.currentStock <= request.lowStockThreshold && (
                    <span className="stock-badge low-stock ml-2">Low Stock</span>
                  )}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Low Stock Threshold:</span>
                <span className="detail-value">{request.lowStockThreshold} units</span>
              </div>
              {request.balagruhaId && (
                <div className="detail-item">
                  <span className="detail-label">Balagruha:</span>
                  <span className="detail-value">📍 {request.balagruhaId.name}</span>
                </div>
              )}
            </div>
          </div>

          {/* Request Details */}
          <div className="detail-section">
            <h4 className="section-title">Request Details</h4>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Requested Quantity:</span>
                <span className="detail-value strong">{request.requestedQuantity} units</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Requested By:</span>
                <span className="detail-value">
                  {request.requestedBy?.name || 'Unknown'}
                  <span className="user-email">({request.requestedBy?.email})</span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Request Date:</span>
                <span className="detail-value">
                  {dayjs(request.createdAt).format('DD-MM-YYYY HH:mm')}
                  <span className="time-ago">({dayjs(request.createdAt).fromNow()})</span>
                </span>
              </div>
            </div>

            <div className="detail-item full-width">
              <span className="detail-label">Reason:</span>
              <p className="detail-text">{request.reason}</p>
            </div>

            {request.justification && (
              <div className="detail-item full-width">
                <span className="detail-label">Justification:</span>
                <p className="detail-text">{request.justification}</p>
              </div>
            )}
          </div>

          {/* Approval/Rejection Details */}
          {(request.status === 'approved' || request.status === 'rejected') && (
            <div className="detail-section">
              <h4 className="section-title">
                {request.status === 'approved' ? 'Approval Details' : 'Rejection Details'}
              </h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Reviewed By:</span>
                  <span className="detail-value">
                    {request.reviewedBy?.name || 'Unknown'}
                    <span className="user-email">({request.reviewedBy?.email})</span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Review Date:</span>
                  <span className="detail-value">
                    {dayjs(request.reviewedAt).format('DD-MM-YYYY HH:mm')}
                  </span>
                </div>
              </div>

              {request.reviewNotes && (
                <div className="detail-item full-width">
                  <span className="detail-label">
                    {request.status === 'approved' ? 'Approval Notes:' : 'Rejection Reason:'}
                  </span>
                  <p className="detail-text">{request.reviewNotes}</p>
                </div>
              )}
            </div>
          )}

          {/* Completion Details */}
          {request.status === 'completed' && (
            <div className="detail-section">
              <h4 className="section-title">Purchase & Stock Update Details</h4>
              <div className="detail-grid">
                {request.supplierName && (
                  <div className="detail-item">
                    <span className="detail-label">Supplier:</span>
                    <span className="detail-value">{request.supplierName}</span>
                  </div>
                )}
                {request.invoiceNumber && (
                  <div className="detail-item">
                    <span className="detail-label">Invoice Number:</span>
                    <span className="detail-value">{request.invoiceNumber}</span>
                  </div>
                )}
                {request.purchaseDate && (
                  <div className="detail-item">
                    <span className="detail-label">Purchase Date:</span>
                    <span className="detail-value">
                      {dayjs(request.purchaseDate).format('DD-MM-YYYY')}
                    </span>
                  </div>
                )}
                {request.actualCost && (
                  <div className="detail-item">
                    <span className="detail-label">Actual Cost:</span>
                    <span className="detail-value">{request.actualCost.toLocaleString()} coins</span>
                  </div>
                )}
                {request.receivedQuantity && (
                  <div className="detail-item">
                    <span className="detail-label">Received Quantity:</span>
                    <span className="detail-value strong">{request.receivedQuantity} units</span>
                  </div>
                )}
                {request.completedBy && (
                  <div className="detail-item">
                    <span className="detail-label">Completed By:</span>
                    <span className="detail-value">
                      {request.completedBy.name}
                      <span className="user-email">({request.completedBy.email})</span>
                    </span>
                  </div>
                )}
                {request.completedAt && (
                  <div className="detail-item">
                    <span className="detail-label">Completion Date:</span>
                    <span className="detail-value">
                      {dayjs(request.completedAt).format('DD-MM-YYYY HH:mm')}
                    </span>
                  </div>
                )}
              </div>

              {request.inventoryTransactionId && (
                <div className="detail-item full-width">
                  <span className="detail-label">Audit Trail:</span>
                  <span className="detail-value">
                    ✅ Linked to Inventory Transaction
                    <span className="transaction-id">(ID: {request.inventoryTransactionId})</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Metadata */}
          <div className="detail-section metadata">
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Created:</span>
                <span className="detail-value">{dayjs(request.createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Updated:</span>
                <span className="detail-value">{dayjs(request.updatedAt).format('DD-MM-YYYY HH:mm:ss')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {request.status === 'pending_approval' && userRole === 'purchase-manager' && (
            <button
              className="btn btn-danger"
              onClick={handleCancel}
            >
              ✖️ Cancel Request
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
