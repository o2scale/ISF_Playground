import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../api';
import OrderCard from '../components/shop/OrderCard';
import OrdersEmptyState from '../components/shop/OrdersEmptyState';

/**
 * OrderHistory Page - Sprint5-Story-04
 * Displays user's order history with filtering and sorting
 */

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (statusFilter !== 'all') {
        params.status = statusFilter;
      }

      const response = await api.get('/api/v2/shop/orders', { params });
      setOrders(response.data.orders || []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.response?.data?.message || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const getSortedOrders = () => {
    const sorted = [...orders];

    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.placedAt) - new Date(b.placedAt));
      case 'amount-high':
        return sorted.sort((a, b) => b.totalAmount - a.totalAmount);
      case 'amount-low':
        return sorted.sort((a, b) => a.totalAmount - b.totalAmount);
      default:
        return sorted;
    }
  };

  const sortedOrders = getSortedOrders();

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">My Orders</h1>
          <p className="text-slate-600 mt-1">Track all your purchases</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Filter & Sort Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            {/* Status Filter */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="all">All Orders</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-slate-700">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-slate-300 rounded-md bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="amount-high">Amount (High to Low)</option>
                <option value="amount-low">Amount (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-lg p-6 border border-slate-200"
              >
                <div className="h-5 bg-slate-200 rounded w-1/3 mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-1/4 mb-4"></div>
                <div className="flex gap-2 mb-4">
                  <div className="w-12 h-12 bg-slate-200 rounded"></div>
                  <div className="w-12 h-12 bg-slate-200 rounded"></div>
                </div>
                <div className="h-10 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Failed to load orders
            </h3>
            <p className="text-slate-600 mb-6">{error}</p>
            <button
              onClick={fetchOrders}
              className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Order List */}
        {!loading && !error && sortedOrders.length > 0 && (
          <div className="space-y-4">
            {sortedOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && sortedOrders.length === 0 && <OrdersEmptyState />}
      </div>
    </div>
  );
}
