import React, { useState, useEffect, useMemo } from 'react';
import {
  getMyPurchaseRequests,
  getAllPurchaseRequests,
  cancelPurchaseRequest,
  updatePurchaseRequestStatus,
  getUserBalagruhas  // Sprint5-Story-24: Get user's assigned Balagruhas
} from '../../../api';
import showToast from '../../../utils/toast';
import { formatDate, formatDateOnly, formatDateTime, getReadableDate } from '../../../utils/dateFormatter';  // Sprint5-Story-23: Date formatting utilities
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
import { UserTypes, normalizeUserRole } from '../../../constants/userTypes';
import {
  PurchaseRequestStatuses,
  PurchaseRequestStatusFilterOptions,
  getPurchaseRequestStatusMeta
} from '../../../constants/purchaseRequestStatuses';

const CATEGORY_OPTIONS = ['ISF Shop', 'Medicines', 'Consumables', 'Repairs', 'Infra', 'Others'];

const STATUS_BUCKET_OPTIONS = [
  { label: 'Purchase Requests', value: 'pending' },
  { label: 'On Going Order', value: 'ordered' },
  { label: 'Reached ISF Store', value: 'delivered_store' },
  { label: 'Delivered', value: 'delivered_balagruha' }
];

dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const getPriority = (request) => {
  const explicit = (request?.priority || '').toString().toLowerCase();
  if (explicit === 'high') {
    return 'High';
  }
  if (explicit === 'low') {
    return 'Low';
  }
  if (explicit === 'medium') {
    return 'Medium';
  }

  const reason = (request?.reason || '').trim();
  if (reason.toUpperCase().startsWith('[HIGH PRIORITY]')) {
    return 'High';
  }

  const justification = request?.justification || '';
  if (/\bpriority:\s*high\b/i.test(justification)) {
    return 'High';
  }

  return 'Medium';
};

// Story 3.1: PM scorecard (client-side MVP)
export const getCompletedTasksCount = (requests, userId) => {
  if (!userId || !Array.isArray(requests)) {
    return 0;
  }

  return requests.reduce((count, request) => {
    const history = request?.statusHistory;
    if (!Array.isArray(history)) {
      return count;
    }

    const completedByUser = history.some((entry) => {
      if (entry?.status !== PurchaseRequestStatuses.DELIVERED_STORE) {
        return false;
      }

      const changedBy = entry?.changedBy;
      const changedById =
        typeof changedBy === 'string' || typeof changedBy === 'number'
          ? changedBy
          : changedBy?._id ?? changedBy?.id;

      return changedById != null && String(changedById) === String(userId);
    });

    return completedByUser ? count + 1 : count;
  }, 0);
};

/**
 * Sprint5-Story-22: Calculate date range for filter options
 * @param {string} filterValue - Filter option ('today', 'thisWeek', etc.)
 * @returns {Object} Object with startDate and endDate in YYYY-MM-DD format
 */
const getDateRangeFromFilter = (filterValue) => {
  const now = new Date();
  let startDate, endDate;

  switch (filterValue) {
    case 'today':
      startDate = new Date(now);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(now);
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'thisWeek':
      // Week starts on Monday (ISO standard)
      startDate = new Date(now);
      const dayOfWeek = startDate.getDay(); // 0 = Sunday, 1 = Monday, ...
      const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust for Sunday
      startDate.setDate(startDate.getDate() + daysToMonday);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // Add 6 days to get Sunday
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'thisMonth':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of month
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'thisYear':
      startDate = new Date(now.getFullYear(), 0, 1); // January 1st
      startDate.setHours(0, 0, 0, 0);

      endDate = new Date(now.getFullYear(), 11, 31); // December 31st
      endDate.setHours(23, 59, 59, 999);
      break;

    case 'all':
    default:
      return { startDate: null, endDate: null };
  }

  // Format as YYYY-MM-DD for backend
  return {
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate.toISOString().split('T')[0]
  };
};

/**
 * Shop Inventory View - Sprint5-Story-17
 * Displays purchase requests for shop inventory with frontend filtering
 */
export default function ShopInventoryView({ userRole, userId, userBalagruhas }) {
  const normalizedRole = normalizeUserRole(userRole);

  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [balagruhas, setBalagruhas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusUpdating, setStatusUpdating] = useState({});

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
    priority: 'all',
    balagruha: 'all',
    purchaseManager: 'all',
    category: 'All Categories',  // Sprint5-Story-20
    // Story 3.1: PM dashboard should default to active work
    status: normalizedRole === UserTypes.PURCHASE_MANAGER ? 'pending' : 'all',
    search: ''
  });

  // Story 3.4: Tab states for PM
  const [activeCategoryTab, setActiveCategoryTab] = useState('All Categories');
  const [activeStatusTab, setActiveStatusTab] = useState('pending');

  // Sprint5-Story-23: Sorting state for date column
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc' // Default: most recent first
  });

  const completedTasksCount = useMemo(
    () => getCompletedTasksCount(requests, userId),
    [requests, userId]
  );

  useEffect(() => {
    fetchBalagruhas();
    fetchPurchaseRequests();
  }, []);

  // Sprint5-Story-22: Refetch data when date filter changes
  useEffect(() => {
    // Skip if dateRange is null (initial state)
    if (filters.dateRange === null) {
      return;
    }

    // For custom range, only fetch when at least one date is provided
    if (filters.dateRange === 'custom') {
      if (!filters.fromDate && !filters.toDate) {
        // User selected "Custom Range" but hasn't entered dates yet - don't fetch
        return;
      }
    }

    // All other cases: fetch with the current filter values
    fetchPurchaseRequests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.dateRange, filters.fromDate, filters.toDate]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requests, filters, sortConfig, normalizedRole, userId, userBalagruhas]);

  const fetchBalagruhas = async () => {
    try {
      // Sprint5-Story-24: Fetch user's assigned Balagruhas (includes STOCK option)
      const response = await getUserBalagruhas();
      if (response.success) {
        setBalagruhas(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching balagruhas:', error);
      showToast('Failed to load Balagruhas', 'error');
    }
  };

  const fetchPurchaseRequests = async () => {
    try {
      setLoading(true);

      // Sprint5-Story-22: Calculate date range params based on filter
      const params = {};
      if (filters.dateRange && filters.dateRange !== 'all') {
        if (filters.dateRange === 'custom') {
          // Custom date range
          if (filters.fromDate) params.startDate = filters.fromDate;
          if (filters.toDate) params.endDate = filters.toDate;
        } else {
          // Preset date range (today, thisWeek, thisMonth, thisYear)
          const { startDate, endDate } = getDateRangeFromFilter(filters.dateRange);
          if (startDate) params.startDate = startDate;
          if (endDate) params.endDate = endDate;
        }
      }

      // Admin and Purchase Manager use getAllPurchaseRequests (backend filters by balagruha for PM)
      // Other roles use getMyPurchaseRequests (shows only their own requests)
      const response = (normalizedRole === UserTypes.ADMIN || normalizedRole === UserTypes.PURCHASE_MANAGER)
        ? await getAllPurchaseRequests(params)
        : await getMyPurchaseRequests(params);

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

    // Backend already handles role-based filtering:
    // - Admin sees ALL requests
    // - Purchase Manager sees requests from assigned balagruhas + STOCK
    // - Other roles see ONLY their own requests
    // Frontend only applies UI filter selections below

    // Sprint5-Story-22: Date filtering now handled by backend API
    // Removed client-side date filtering - backend handles date range queries with proper timezone support

    // Balagruha filter
    if (filters.balagruha !== 'all') {
      filtered = filtered.filter((request) => {
        const balagruhaId = request.balagruhaId;
        const requestBalagruhaId =
          balagruhaId === 'STOCK' ? 'STOCK' : (balagruhaId?._id ?? balagruhaId);

        return String(requestBalagruhaId) === String(filters.balagruha);
      });
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
    if (filters.status === 'active') {
      // Active work includes requests still in-progress, including those awaiting coach confirmation.
      filtered = filtered.filter(request => [
        PurchaseRequestStatuses.PENDING,
        PurchaseRequestStatuses.ORDERED,
        PurchaseRequestStatuses.DELIVERED_STORE
      ].includes(request.status));
    } else if (filters.status !== 'all') {
      filtered = filtered.filter(request => request.status === filters.status);
    }

    // Priority filter
    if (filters.priority && filters.priority !== 'all') {
      filtered = filtered.filter((request) => {
        const p = (request?.priority || '').toString().toLowerCase();
        return p === filters.priority;
      });
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

    // Story 3.1: Priority sorting runs before date sorting
    filtered.sort((a, b) => {
      const aPriority = getPriority(a);
      const bPriority = getPriority(b);

      if (aPriority !== bPriority) {
        const order = { High: 0, Medium: 1, Low: 2 };
        return (order[aPriority] ?? 9) - (order[bPriority] ?? 9);
      }

      // Sprint5-Story-23: Date sorting (within the same priority)
      if (!sortConfig.direction) {
        return 0;
      }

      const aValue = sortConfig.key === 'createdAt'
        ? new Date(a[sortConfig.key]).getTime()
        : a[sortConfig.key];
      const bValue = sortConfig.key === 'createdAt'
        ? new Date(b[sortConfig.key]).getTime()
        : b[sortConfig.key];

      if (aValue === bValue) {
        return 0;
      }

      if (sortConfig.direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    setFilteredRequests(filtered);
  };

  // C3: PM needs grouping by item, per status bucket
  const groupedByStatus = useMemo(() => {
    const buckets = new Map();

    for (const request of filteredRequests) {
      const status = request?.status || 'unknown';
      if (!buckets.has(status)) {
        buckets.set(status, new Map());
      }

      const byItem = buckets.get(status);
      const items = Array.isArray(request?.items) ? request.items : [];

      for (const item of items) {
        const key = String(item?.productId?._id ?? item?.productId ?? item?.productSKU ?? item?.productName ?? 'unknown');
        const prev = byItem.get(key);
        if (prev) {
          prev.totalRequestedQuantity += Number(item?.requestedQuantity || 0);
          prev.requestCount += 1;
        } else {
          byItem.set(key, {
            key,
            productId: item?.productId?._id ?? item?.productId,
            productName: item?.productName || item?.productId?.name || 'Unknown item',
            productSKU: item?.productSKU || item?.productId?.sku || '',
            totalRequestedQuantity: Number(item?.requestedQuantity || 0),
            requestCount: 1
          });
        }
      }
    }

    const result = [];
    for (const [status, byItem] of buckets.entries()) {
      const rows = Array.from(byItem.values()).sort((a, b) => b.totalRequestedQuantity - a.totalRequestedQuantity);
      result.push({ status, rows });
    }

    // Put active statuses first
    const statusOrder = [
      PurchaseRequestStatuses.PENDING,
      PurchaseRequestStatuses.ORDERED,
      PurchaseRequestStatuses.DELIVERED_STORE,
      PurchaseRequestStatuses.DELIVERED_BALAGRUHA,
      PurchaseRequestStatuses.PENDING_APPROVAL,
      PurchaseRequestStatuses.APPROVED,
      PurchaseRequestStatuses.COMPLETED,
      PurchaseRequestStatuses.CANCELLED,
      PurchaseRequestStatuses.REJECTED,
      PurchaseRequestStatuses.ON_HOLD
    ];
    result.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
    return result;
  }, [filteredRequests]);

  // Sprint5-Story-23: Handle sorting for date column
  const handleSort = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key) {
      // Cycle through: desc → asc → null (remove sort)
      if (sortConfig.direction === 'desc') {
        direction = 'asc';
      } else if (sortConfig.direction === 'asc') {
        direction = null; // Remove sort
      } else {
        direction = 'desc';
      }
    } else {
      direction = 'desc'; // Default for new column
    }

    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status) => {
    const badge = getPurchaseRequestStatusMeta(status);
    return (
      <span
        className={`status-badge ${badge.className}`}
        title={badge.tooltip}
      >
        {badge.icon} {badge.label}
      </span>
    );
  };

  const handleUpdateStatus = async (requestId, nextStatus, notes, successMessage) => {
    setStatusUpdating((prev) => ({ ...prev, [requestId]: true }));

    try {
      const response = await updatePurchaseRequestStatus(requestId, {
        status: nextStatus,
        notes
      });

      if (response.success) {
        showToast(successMessage, 'success');
        fetchPurchaseRequests();
      } else {
        showToast(response.message || 'Error updating request status', 'error');
      }
    } catch (error) {
      console.error('Error updating purchase request status:', error);
      showToast(error.response?.data?.message || 'Error updating request status', 'error');
    } finally {
      setStatusUpdating((prev) => ({ ...prev, [requestId]: false }));
    }
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
    doc.text(`Pending: ${filteredRequests.filter(r => r.status === PurchaseRequestStatuses.PENDING_APPROVAL).length}`, 14, 34);

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
    if (normalizedRole === UserTypes.ADMIN) {
      return balagruhas;
    }
    // Sprint5-Story-21 (S21-BUG-002 FIX): Always include STOCK + user's assigned Balagruhas
    return balagruhas.filter(bg => bg._id === 'STOCK' || userBalagruhas.includes(bg._id));
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

  // Story 3.4: Handle category tab click
  const handleCategoryTabClick = (category) => {
    setActiveCategoryTab(category);
    setFilters({ ...filters, category });
  };

  // Story 3.4: Handle status bucket tab click
  const handleStatusTabClick = (status) => {
    setActiveStatusTab(status);
    setFilters({ ...filters, status });
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
          {/* Sprint5-Story-24: Multi-role access to purchase request creation */}
          {[UserTypes.PURCHASE_MANAGER, UserTypes.COACH, UserTypes.MEDICAL_IN_CHARGE, UserTypes.ADMIN].includes(normalizedRole) && (
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

      {/* Story 3.1: PM Scorecard */}
      {normalizedRole === UserTypes.PURCHASE_MANAGER && (
        <div className="pm-scorecard-row" aria-label="PM Scorecard">
          <div className="pm-scorecard-card">
            <div className="pm-scorecard-label">Completed Tasks</div>
            <div className="pm-scorecard-value" data-testid="pm-completed-tasks-count">
              {completedTasksCount}
            </div>
          </div>
        </div>
      )}

      {/* Story 3.4: Category Tabs (PM only) */}
      {normalizedRole === UserTypes.PURCHASE_MANAGER && (
        <div className="category-tabs-row" style={{ marginBottom: '12px' }}>
          <button
            className={`category-tab ${activeCategoryTab === 'All Categories' ? 'active-tab' : ''}`}
            onClick={() => handleCategoryTabClick('All Categories')}
          >
            All Categories
          </button>
          {CATEGORY_OPTIONS.map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategoryTab === category ? 'active-tab' : ''}`}
              onClick={() => handleCategoryTabClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Story 3.4: Status Bucket Tabs (PM only) */}
      {normalizedRole === UserTypes.PURCHASE_MANAGER && (
        <div className="status-tabs-row" style={{ marginBottom: '12px' }}>
          {STATUS_BUCKET_OPTIONS.map((bucket) => (
            <button
              key={bucket.value}
              className={`status-tab ${activeStatusTab === bucket.value ? 'active-tab' : ''}`}
              onClick={() => handleStatusTabClick(bucket.value)}
            >
              {bucket.label}
            </button>
          ))}
        </div>
      )}

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

          {/* Priority Filter */}
          <div className="filter-group">
            <label>Priority:</label>
            <select
              value={filters.priority || 'all'}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              className="filter-select"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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
          {normalizedRole === UserTypes.ADMIN && (
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

          {/* Category Filter - Sprint5-Story-20 - Hidden for PM (uses tabs) */}
          {normalizedRole !== UserTypes.PURCHASE_MANAGER && (
            <div className="filter-group">
              <label>Category:</label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="filter-select"
              >
                <option value="All Categories">All Categories</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}

          {/* Status Filter - Hidden for PM (uses tabs) */}
          {normalizedRole !== UserTypes.PURCHASE_MANAGER && (
            <div className="filter-group">
              <label>Status:</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="filter-select"
              >
                <option value="all">All Status</option>
                {PurchaseRequestStatusFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}

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

      {/* C3: PM item grouping by status bucket */}
      {normalizedRole === UserTypes.PURCHASE_MANAGER && (
        <div className="requests-table-container" style={{ marginTop: '16px' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Grouped Summary (by Item, per Status)</h3>
          {groupedByStatus.map((bucket) => (
            <div key={bucket.status} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                <div>{getStatusBadge(bucket.status)}</div>
                <div style={{ color: '#555' }}>{bucket.rows.length} item(s)</div>
              </div>
              <table className="requests-table" aria-label={`Grouped summary table (${bucket.status})`}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Total Qty</th>
                    <th># Lines</th>
                  </tr>
                </thead>
                <tbody>
                  {bucket.rows.slice(0, 25).map((row) => (
                    <tr key={row.key}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{row.productName}</div>
                        {row.productSKU ? <div style={{ fontSize: '12px', color: '#666' }}>{row.productSKU}</div> : null}
                      </td>
                      <td>{row.totalRequestedQuantity}</td>
                      <td>{row.requestCount}</td>
                    </tr>
                  ))}
                  {bucket.rows.length === 0 && (
                    <tr>
                      <td colSpan={3} className="no-data">No items</td>
                    </tr>
                  )}
                </tbody>
              </table>
              {bucket.rows.length > 25 && (
                <div style={{ fontSize: '12px', color: '#666', marginTop: '6px' }}>
                  Showing top 25 items by quantity.
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Requests Table */}
      <div className="requests-table-container">
        <table className="requests-table" aria-label="Shop Inventory Purchase Requests Table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Products</th>
              <th>Total Items / Quantity</th>
              <th>Total Cost</th>
              <th>Reason</th>
              {normalizedRole === UserTypes.ADMIN && <th>Requested By</th>}
              <th>Priority</th>
              <th>Status</th>
              <th>Category</th>
              <th>Deadline</th>
              {/* Sprint5-Story-23: Sortable date column */}
              <th
                onClick={() => handleSort('createdAt')}
                style={{ cursor: 'pointer', userSelect: 'none' }}
                title="Click to sort by date"
              >
                Created Date {' '}
                {sortConfig.key === 'createdAt' && (
                  sortConfig.direction === 'desc' ? '▼' :
                  sortConfig.direction === 'asc' ? '▲' : ''
                )}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map(request => (
              <tr
                key={request._id}
                className={`request-row status-${request.status} ${getPriority(request) === 'High' ? 'priority-high' : ''}`}
              >
                <td className="request-id-cell">
                  <strong>{request.requestId}</strong>
                  {getPriority(request) === 'High' && (
                    <span
                      className="priority-badge"
                      aria-label="High Priority"
                      title="High Priority"
                    >
                      HIGH
                    </span>
                  )}
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
                {normalizedRole === UserTypes.ADMIN && (
                  <td className="requester-cell">
                    <div className="requester-name">{request.requestedBy?.name || 'Unknown'}</div>
                    <div className="requester-email">{request.requestedBy?.email || ''}</div>
                  </td>
                )}
                <td className="priority-cell">
                  {(request.priority || '').toLowerCase() === 'high'
                    ? 'High'
                    : (request.priority || '').toLowerCase() === 'low'
                      ? 'Low'
                      : 'Medium'}
                </td>
                <td>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>{getStatusBadge(request.status)}</div>
                    {request.status === PurchaseRequestStatuses.DELIVERED_STORE &&
                      (normalizedRole === UserTypes.ADMIN ||
                        normalizedRole === UserTypes.COACH ||
                        String(request.requestedBy?._id || request.requestedBy) === String(userId)) && (
                        <button
                          className="btn btn-success btn-action"
                          style={{ padding: '6px 10px', fontSize: '12px', alignSelf: 'flex-start' }}
                          onClick={() =>
                            handleUpdateStatus(
                              request._id,
                              PurchaseRequestStatuses.DELIVERED_BALAGRUHA,
                              'Marked Delivered to Balagruha via Purchase Management',
                              'Request marked as delivered to balagruha'
                            )
                          }
                          disabled={statusUpdating[request._id]}
                          title="Mark Delivered to Balagruha"
                        >
                          🏠 Mark Delivered
                        </button>
                      )}
                  </div>
                </td>
                <td className="category-cell">{request.category || 'Not Categorized'}</td>
                <td className="deadline-cell">
                  {request.deadline ? formatDateOnly(request.deadline, 'dd/mm/yy') : '—'}
                </td>
                {/* Sprint5-Story-23: Date column with new format and tooltip */}
                <td
                  className="date-cell"
                  title={`Created on: ${formatDateTime(request.createdAt)}`}
                  aria-label={`Created on ${getReadableDate(request.createdAt)}`}
                >
                  <div>{formatDate(request.createdAt, 'dd/mm/yy')}</div>
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
                  {request.status === PurchaseRequestStatuses.PENDING_APPROVAL && normalizedRole === UserTypes.ADMIN && (
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
                  {request.status === PurchaseRequestStatuses.PENDING_APPROVAL && normalizedRole === UserTypes.PURCHASE_MANAGER && (
                    <button
                      className="btn-icon btn-cancel"
                      onClick={() => handleCancelRequest(request._id)}
                      title="Cancel Request"
                    >
                      ✖️
                    </button>
                  )}

                  {/* Story 2.3: Purchase Manager Fulfillment Actions */}
                  {normalizedRole === UserTypes.PURCHASE_MANAGER && request.status === PurchaseRequestStatuses.PENDING && (
                    <button
                      className="btn btn-primary btn-action"
                      onClick={() =>
                        handleUpdateStatus(
                          request._id,
                          PurchaseRequestStatuses.ORDERED,
                          'Marked Ordered via Purchase Management',
                          'Request marked as ordered'
                        )
                      }
                      disabled={statusUpdating[request._id]}
                      title="Mark Ordered"
                    >
                      🛒 Mark Ordered
                    </button>
                  )}

                  {normalizedRole === UserTypes.PURCHASE_MANAGER && request.status === PurchaseRequestStatuses.ORDERED && (
                    <button
                      className="btn btn-primary btn-action"
                      onClick={() =>
                        handleUpdateStatus(
                          request._id,
                          PurchaseRequestStatuses.DELIVERED_STORE,
                          'Marked Received at Store via Purchase Management',
                          'Request marked as received at store'
                        )
                      }
                      disabled={statusUpdating[request._id]}
                      title="Mark Received at Store"
                    >
                      📦 Mark Received at Store
                    </button>
                  )}

                  {/* Update Stock Button - Story 19 */}
                  {request.status === PurchaseRequestStatuses.APPROVED && normalizedRole === UserTypes.PURCHASE_MANAGER && (
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
                <td colSpan={normalizedRole === UserTypes.ADMIN ? "12" : "11"} className="no-data">
                  {normalizedRole === UserTypes.PURCHASE_MANAGER
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
            {filteredRequests.filter(r => r.status === PurchaseRequestStatuses.PENDING_APPROVAL).length}
          </span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Approved:</span>
          <span className="stats-value approved">
            {filteredRequests.filter(r => r.status === PurchaseRequestStatuses.APPROVED).length}
          </span>
        </div>
        <div className="stats-item">
          <span className="stats-label">Completed:</span>
          <span className="stats-value completed">
            {filteredRequests.filter(r => r.status === PurchaseRequestStatuses.COMPLETED).length}
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
          userRole={userRole}
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
