import React, { useState, useEffect } from 'react';
import {
  getMyPurchaseRequests,
  getAllPurchaseRequests,
  cancelPurchaseRequest,
  getBalagruhaWithStock  // Sprint5-Story-21: Use with-stock endpoint
} from '../../../api';
import showToast from '../../../utils/toast';
import CreatePurchaseRequestModal from '../modals/CreatePurchaseRequestModal';
import ViewRequestModal from '../modals/ViewRequestModal';
import ApproveRequestModal from '../modals/ApproveRequestModal';
import RejectRequestModal from '../modals/RejectRequestModal';
import UpdateStockModal from '../modals/UpdateStockModal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import '../PurchaseManagement.css';

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/**
 * Shop Inventory View - Sprint5-Story-17
 * Displays purchase requests for shop inventory with frontend filtering
 */
export default function ShopInventoryView({ userRole, userId, userBalagruhas }) {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [balagruhas, setBalagruhas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showUpdateStockModal, setShowUpdateStockModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Filter states
  const [filters, setFilters] = useState({
    dateRange: null,
    fromDate: '',
    toDate: '',
    balagruha: 'all',
    purchaseManager: 'all',
    category: 'All Categories',  // Sprint5-Story-20
    status: 'all',
    search: ''
  });

  useEffect(() => {
    fetchBalagruhas();
    fetchPurchaseRequests();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [requests, filters, userRole, userId, userBalagruhas]);

  const fetchBalagruhas = async () => {
    try {
      const response = await getBalagruhaWithStock();  // Sprint5-Story-21: Fetch with STOCK option
      if (response.success) {
        setBalagruhas(response.data.balagruhas || []);
      }
    } catch (error) {
      console.error('Error fetching balagruhas:', error);
    }
  };

  const fetchPurchaseRequests = async () => {
    try {
      setLoading(true);
      const response = userRole === 'admin'
        ? await getAllPurchaseRequests()
        : await getMyPurchaseRequests();

      if (response.success) {
        setRequests(response.data.requests || []);
      } else {
        showToast('Error fetching purchase requests', 'error');
      }
    } catch (error) {
      console.error('Error fetching purchase requests:', error);
      showToast('Error fetching purchase requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...requests];

    // FRONTEND FILTERING for Purchase Manager
    // Note: Backend already filters by requestedBy for getMyPurchaseRequests()
    // So we only need to filter by balagruha on frontend
    if (userRole === 'purchase-manager') {
      filtered = filtered.filter(request => {
        // Only show requests from assigned balagruhas
        const balagruhaIdStr = request.balagruhaId?._id || request.balagruhaId;
        const matchesBalagruha = !request.balagruhaId ||
          userBalagruhas.some(bgId => bgId === balagruhaIdStr);

        return matchesBalagruha;
      });
    }

    // Date range filter
    if (filters.dateRange && filters.dateRange !== 'all') {
      const now = dayjs();
      filtered = filtered.filter(request => {
        const createdDate = dayjs(request.createdAt);

        if (filters.dateRange === 'today') {
          return createdDate.isSame(now, 'day');
        } else if (filters.dateRange === 'thisWeek') {
          return createdDate.isSame(now, 'week');
        } else if (filters.dateRange === 'thisMonth') {
          return createdDate.isSame(now, 'month');
        } else if (filters.dateRange === 'custom' && filters.fromDate && filters.toDate) {
          return createdDate.isSameOrAfter(dayjs(filters.fromDate), 'day') &&
                 createdDate.isSameOrBefore(dayjs(filters.toDate), 'day');
        }
        return true;
      });
    }

    // Balagruha filter
    if (filters.balagruha !== 'all') {
      filtered = filtered.filter(request =>
        request.balagruhaId?._id === filters.balagruha
      );
    }

    // Purchase Manager filter (Admin only)
    if (filters.purchaseManager !== 'all') {
      filtered = filtered.filter(request =>
        request.requestedBy?._id === filters.purchaseManager
      );
    }

    // Category filter (Sprint5-Story-20)
    if (filters.category !== 'All Categories') {
      filtered = filtered.filter(request => request.category === filters.category);
    }

    // Status filter
    if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }

    // Search filter (product name, SKU, reason, requestId)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(request => {
        // Search in items array for multi-product requests
        const matchesProduct = request.items?.some(item =>
          item.productName?.toLowerCase().includes(searchLower) ||
          item.productSKU?.toLowerCase().includes(searchLower)
        );
        const matchesReason = request.reason?.toLowerCase().includes(searchLower);
        const matchesRequestId = request.requestId?.toLowerCase().includes(searchLower);
        return matchesProduct || matchesReason || matchesRequestId;
      });
    }

    setFilteredRequests(filtered);
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending_approval: { icon: '🟡', label: 'Pending', className: 'status-pending' },
      approved: { icon: '✅', label: 'Approved', className: 'status-approved' },
      rejected: { icon: '❌', label: 'Rejected', className: 'status-rejected' },
      completed: { icon: '✅', label: 'Completed', className: 'status-completed' },
      cancelled: { icon: '⚫', label: 'Cancelled', className: 'status-cancelled' }
    };

    const badge = badges[status] || badges.pending_approval;
    return (
      <span className={`status-badge ${badge.className}`}>
        {badge.icon} {badge.label}
      </span>
    );
  };

  const handleCancelRequest = async (requestId) => {
    if (!window.confirm('Are you sure you want to cancel this request?')) {
      return;
    }

    try {
      const response = await cancelPurchaseRequest(requestId);
      if (response.success) {
        showToast('Request cancelled successfully', 'success');
        fetchPurchaseRequests();
      } else {
        showToast(response.message || 'Error cancelling request', 'error');
      }
    } catch (error) {
      console.error('Error cancelling request:', error);
      showToast(error.response?.data?.message || 'Error cancelling request', 'error');
    }
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handleApprove = (request) => {
    setSelectedRequest(request);
    setShowApproveModal(true);
  };

  const handleReject = (request) => {
    setSelectedRequest(request);
    setShowRejectModal(true);
  };

  const handleUpdateStock = (request) => {
    setSelectedRequest(request);
    setShowUpdateStockModal(true);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.text('Shop Purchase Requests', 14, 15);

    // Metadata
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${dayjs().format('DD-MM-YYYY HH:mm')}`, 14, 22);
    doc.text(`Total Requests: ${filteredRequests.length}`, 14, 28);
    doc.text(`Pending: ${filteredRequests.filter(r => r.status === 'pending_approval').length}`, 14, 34);

    // Table
    const tableColumn = ['Request ID', 'Product', 'Qty', 'Reason', 'Status', 'Date'];
    const tableRows = filteredRequests.map(req => [
      req.requestId,
      req.productName,
      req.requestedQuantity,
      req.reason.substring(0, 30) + (req.reason.length > 30 ? '...' : ''),
      req.status.replace('_', ' ').toUpperCase(),
      dayjs(req.createdAt).format('DD-MM-YYYY')
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
      styles: { fontSize: 9 },
      headStyles: { fillColor: [59, 130, 246] }
    });

    doc.save(`Purchase_Requests_${dayjs().format('YYYY-MM-DD')}.pdf`);
    showToast('PDF exported successfully', 'success');
  };

  // Get balagruha options based on role
  const getFilteredBalagruhas = () => {
    if (userRole === 'admin') {
      return balagruhas;
    }
    return balagruhas.filter(bg => userBalagruhas.includes(bg._id));
  };

  // Get unique purchase managers from requests, optionally filtered by balagruha
  const getAvailablePurchaseManagers = () => {
    let relevantRequests = requests;

    // If a balagruha is selected, only show purchase managers who have requests for that balagruha
    if (filters.balagruha !== 'all') {
      relevantRequests = requests.filter(req => req.balagruhaId?._id === filters.balagruha);
    }

    // Extract unique purchase managers
    const uniqueManagers = new Map();
    relevantRequests.forEach(req => {
      if (req.requestedBy) {
        uniqueManagers.set(req.requestedBy._id, {
          _id: req.requestedBy._id,
          name: req.requestedBy.name,
          email: req.requestedBy.email
        });
      }
    });

    return Array.from(uniqueManagers.values());
  };

  // Reset purchase manager filter when balagruha changes
  const handleBalagruhaChange = (balagruhaId) => {
    setFilters({
      ...filters,
      balagruha: balagruhaId,
      purchaseManager: 'all' // Reset purchase manager when balagruha changes
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading purchase requests...</p>
      </div>
    );
  }

  return (
    <div className="shop-inventory-view">
      {/* Header with Action Buttons */}
      <div className="view-header">
        <h2 className="view-title">🛒 Shop Inventory Purchase Requests</h2>
        <div className="header-actions">
          {userRole === 'purchase-manager' && (
            <button
              className="btn btn-primary"
              onClick={() => setShowCreateModal(true)}
            >
              + New Purchase Request
            </button>
          )}
          <button
            className="btn btn-secondary"
            onClick={exportToPDF}
            disabled={filteredRequests.length === 0}
          >
            📄 Export PDF
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filter-row">
          {/* Date Range Filter */}
          <div className="filter-group">
            <label>Date Range:</label>
            <select
              value={filters.dateRange || 'all'}
              onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="thisWeek">This Week</option>
              <option value="thisMonth">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <>
              <div className="filter-group">
                <label>From:</label>
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                  className="filter-input"
                />
              </div>
              <div className="filter-group">
                <label>To:</label>
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                  className="filter-input"
                />
              </div>
            </>
          )}

          {/* Balagruha Filter */}
          <div className="filter-group">
            <label>Balagruha:</label>
            <select
              value={filters.balagruha}
              onChange={(e) => handleBalagruhaChange(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Balagruhas</option>

              {/* Sprint5-Story-21: STOCK filter option */}
              <option value="STOCK" style={{ fontWeight: 'bold' }}>📦 STOCK (General Inventory)</option>

              {getFilteredBalagruhas().filter(bg => bg._id !== 'STOCK').map(bg => (
                <option key={bg._id} value={bg._id}>{bg.name}</option>
              ))}
            </select>
          </div>

          {/* Purchase Manager Filter (Admin only) */}
          {userRole === 'admin' && (
            <div className="filter-group">
              <label>Purchase Manager:</label>
              <select
                value={filters.purchaseManager}
                onChange={(e) => setFilters({ ...filters, purchaseManager: e.target.value })}
                className="filter-select"
              >
                <option value="all">All Purchase Managers</option>
                {getAvailablePurchaseManagers().map(pm => (
                  <option key={pm._id} value={pm._id}>
                    {pm.name} ({pm.email})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Filter - Sprint5-Story-20 */}
          <div className="filter-group">
            <label>Category:</label>
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="filter-select"
            >
              <option value="All Categories">All Categories</option>
              <option value="New Equipment">New Equipment</option>
              <option value="Consumables (Including medicines)">Consumables (Including medicines)</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="pending_approval">Pending Approval</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Search Filter */}
          <div className="filter-group search-group">
            <label>Search:</label>
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Product, SKU, Reason..."
              className="filter-input search-input"
            />
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Products</th>
              <th>Total Items / Quantity</th>
              <th>Total Cost</th>
              <th>Reason</th>
              {userRole === 'admin' && <th>Requested By</th>}
              <th>Status</th>
              <th>Category</th>
              <th>Requested</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr key={request._id} className={`request-row status-${request.status}`}>
                <td className="request-id-cell">
                  <strong>{request.requestId}</strong>
                  {/* Sprint5-Story-21: STOCK badge styling */}
                  {request.balagruhaId === 'STOCK' ? (
                    <div className="balagruha-tag stock-tag" style={{ backgroundColor: '#e3f2fd', color: '#1976d2', fontWeight: 'bold' }}>
                      📦 STOCK
                    </div>
                  ) : request.balagruhaId && (
                    <div className="balagruha-tag">
                      📍 {request.balagruhaId.name}
                    </div>
                  )}
                </td>
                <td>
                  <div className="product-info">
                    {request.items && request.items.length > 0 ? (
                      <>
                        <div className="product-name">{request.items.length} product{request.items.length > 1 ? 's' : ''}</div>
                        <div className="product-sku">
                          {request.items.slice(0, 2).map((item, idx) => (
                            <span key={idx}>
                              {item.productName}
                              {idx < 1 && idx < request.items.length - 1 && ', '}
                            </span>
                          ))}
                          {request.items.length > 2 && ` +${request.items.length - 2} more`}
                        </div>
                      </>
                    ) : (
                      <div className="product-name">No items</div>
                    )}
                  </div>
                </td>
                <td className="quantity-cell">
                  {request.items ? request.items.length : 0} items / {' '}
                  {request.items ? request.items.reduce((sum, item) => sum + item.requestedQuantity, 0) : 0} units
                </td>
                <td className="cost-cell">
                  ₹{request.totalEstimatedCost ? request.totalEstimatedCost.toLocaleString() : '0'}
                </td>
                <td className="reason-cell">{request.reason}</td>
                {userRole === 'admin' && (
                  <td className="requester-cell">
                    <div className="requester-name">{request.requestedBy?.name || 'Unknown'}</div>
                    <div className="requester-email">{request.requestedBy?.email || ''}</div>
                  </td>
                )}
                <td>{getStatusBadge(request.status)}</td>
                <td className="category-cell">{request.category || 'Not Categorized'}</td>
                <td className="date-cell">
                  <div>{dayjs(request.createdAt).format('DD-MM-YYYY')}</div>
                  <div className="time-ago">{dayjs(request.createdAt).fromNow()}</div>
                </td>
                <td className="actions-cell">
                  <button
                    className="btn-icon"
                    onClick={() => handleViewRequest(request)}
                    title="View Details"
                  >
                    👁️
                  </button>

                  {/* Admin Actions - Story 18 */}
                  {request.status === 'pending_approval' && userRole === 'admin' && (
                    <>
                      <button
                        className="btn-icon btn-approve"
                        onClick={() => handleApprove(request)}
                        title="Approve Request"
                      >
                        ✅
                      </button>
                      <button
                        className="btn-icon btn-reject"
                        onClick={() => handleReject(request)}
                        title="Reject Request"
                      >
                        ❌
                      </button>
                    </>
                  )}

                  {/* Purchase Manager Actions */}
                  {request.status === 'pending_approval' && userRole === 'purchase-manager' && (
                    <button
                      className="btn-icon btn-cancel"
                      onClick={() => handleCancelRequest(request._id)}
                      title="Cancel Request"
                    >
                      ✖️
                    </button>
                  )}

                  {/* Update Stock Button - Story 19 */}
                  {request.status === 'approved' && userRole === 'purchase-manager' && (
                    <button
                      className="btn-icon btn-primary"
                      onClick={() => handleUpdateStock(request)}
                      title="Update Stock"
                    >
                      📦
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan={userRole === 'admin' ? "10" : "9"} className="no-data">
                  {userRole === 'purchase-manager'
                    ? "No purchase requests found. Click '+ New Purchase Request' to create one."
                    : "No purchase requests found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Stats Footer */}
      <div className="stats-footer">
        <div className="stats-item">
          <span className="stats-label">Total Requests:</span>
          <span className="stats-value">{filteredRequests.length}</span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Pending:</span>
          <span className="stats-value pending">
            {filteredRequests.filter(r => r.status === 'pending_approval').length}
          </span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Approved:</span>
          <span className="stats-value approved">
            {filteredRequests.filter(r => r.status === 'approved').length}
          </span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Completed:</span>
          <span className="stats-value completed">
            {filteredRequests.filter(r => r.status === 'completed').length}
          </span>
        </div>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <CreatePurchaseRequestModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={() => {
            setShowCreateModal(false);
            fetchPurchaseRequests();
          }}
          userBalagruhas={userBalagruhas}
          balagruhas={getFilteredBalagruhas()}
        />
      )}

      {showViewModal && selectedRequest && (
        <ViewRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowViewModal(false);
            setSelectedRequest(null);
          }}
          userRole={userRole}
          onRefresh={fetchPurchaseRequests}
        />
      )}

      {/* Admin Approval Modals - Story 18 */}
      {showApproveModal && selectedRequest && (
        <ApproveRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowApproveModal(false);
            setSelectedRequest(null);
          }}
          onSuccess={() => {
            setShowApproveModal(false);
            setSelectedRequest(null);
            fetchPurchaseRequests();
          }}
        />
      )}

      {showRejectModal && selectedRequest && (
        <RejectRequestModal
          request={selectedRequest}
          onClose={() => {
            setShowRejectModal(false);
            setSelectedRequest(null);
          }}
          onSuccess={() => {
            setShowRejectModal(false);
            setSelectedRequest(null);
            fetchPurchaseRequests();
          }}
        />
      )}

      {/* Update Stock Modal - Story 19 */}
      {showUpdateStockModal && selectedRequest && (
        <UpdateStockModal
          request={selectedRequest}
          onClose={() => {
            setShowUpdateStockModal(false);
            setSelectedRequest(null);
          }}
          onRefresh={() => {
            fetchPurchaseRequests();
          }}
        />
      )}
    </div>
  );
}
