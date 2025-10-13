import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from './StatusBadge';

/**
 * OrderCard Component - Sprint5-Story-04
 * Individual order card in order history list
 * Uses WTF pin card pattern for consistency
 *
 * @param {Object} order - Order object with all details
 */

export default function OrderCard({ order }) {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      onClick={() => navigate(`/shop/orders/${order.orderNumber}`)}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Order #{order.orderNumber}
          </h3>
          <p className="text-sm text-slate-500">
            {formatDate(order.placedAt)}
          </p>
        </div>
        <StatusBadge status={order.status} />
      </div>

      {/* Order Summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-slate-600">
          {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
        </p>
        <p className="text-lg font-bold text-slate-900">
          {order.totalAmount} coins
        </p>
      </div>

      {/* Items Preview (First 2) */}
      <div className="flex items-center gap-2 mb-4">
        {order.items?.slice(0, 2).map((item, index) => (
          <img
            key={item._id || index}
            src={item.product?.imageUrl || item.imageUrl || 'https://via.placeholder.com/50'}
            alt={item.product?.name || item.name || 'Product'}
            className="w-12 h-12 rounded border border-slate-200 object-cover"
          />
        ))}
        {(order.items?.length || 0) > 2 && (
          <div className="w-12 h-12 rounded border border-slate-200 bg-slate-100 flex items-center justify-center text-xs text-slate-600 font-semibold">
            +{order.items.length - 2}
          </div>
        )}
      </div>

      {/* View Details Button */}
      <button className="w-full bg-slate-100 text-slate-700 px-4 py-2 rounded-md hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 font-medium">
        <span>View Details</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
