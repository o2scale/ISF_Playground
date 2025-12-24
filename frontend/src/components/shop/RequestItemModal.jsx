import React, { useState } from "react";
import { X, AlertCircle, Package } from "lucide-react";
import useShopStore from "../../store/shopStore";
import { useAuth } from "../../contexts/AuthContext";
import toast from "react-hot-toast";

/**
 * RequestItemModal Component - Sprint5-Story-2.2
 * Modal for Staff to request items from the catalog
 */
export default function RequestItemModal({ product, onClose }) {
  const { user } = useAuth();
  const { createPurchaseRequest, assignFromStock } = useShopStore();
  const [submitting, setSubmitting] = useState(false);
  
  // Default to "STOCK" if PM, otherwise first assigned Balagruha
  const isPM = user?.role?.toLowerCase() === "purchase-manager";
  const defaultBalagruha = isPM ? "STOCK" : (user?.balagruhaIds?.[0] || "");

  const [formData, setFormData] = useState({
    quantity: 1,
    priority: "Normal",
    reason: "",
    balagruhaId: defaultBalagruha,
    assignShortcut: false // PM Only shortcut
  });

  const [error, setError] = useState(null);

  // Balagruha Options
  const balagruhaOptions = user?.balagruhaIds || [];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (formData.quantity < 1) {
      setError("Quantity must be at least 1");
      return;
    }
    if (!formData.balagruhaId) {
      setError("Please select a Balagruha (or STOCK)");
      return;
    }

    // PM Shortcut Validation
    if (formData.assignShortcut && product.stock < formData.quantity) {
      setError(`Cannot assign from stock. Requested ${formData.quantity} but only ${product.stock} available.`);
      return;
    }

    setSubmitting(true);

    try {
      // 1. Prepare Data
      const baseReason = formData.reason.trim() || `Requesting ${product.name}`;
      const reasonWithPriority = formData.priority === "High" 
        ? `[HIGH PRIORITY] ${baseReason}`
        : baseReason;

      const estimatedUnitCost = Number(product?.maxPrice ?? product?.price ?? 0);

      const requestData = {
        balagruhaId: formData.balagruhaId,
        category: "Others",
        reason: reasonWithPriority,
        justification: `Requested via Shop Catalog. Priority: ${formData.priority}`,
        items: JSON.stringify([{
          productId: product._id,
          requestedQuantity: formData.quantity,
          estimatedUnitCost
        }])
      };

      // 2. Create Purchase Request
      const response = await createPurchaseRequest(requestData);
      const newRequestId = response?.data?.purchaseRequest?._id;

      // 3. (PM Only) Assign from Stock Shortcut
      if (isPM && formData.assignShortcut && newRequestId) {
        await assignFromStock(newRequestId, "Auto-assigned via Shop Shortcut");
        toast.success("Stock assigned automatically!");
      }

      onClose();
    } catch (err) {
      console.error("Request failed:", err);
      setError(err.response?.data?.message || "Failed to submit request");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-600" />
            Request Item
          </h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="p-4 bg-slate-50 flex gap-3 border-b border-slate-200">
          <div className="w-16 h-16 bg-white rounded border border-slate-200 flex-shrink-0 overflow-hidden">
            <img 
              src={product.primaryImageUrl || product.imageUrl || "/placeholder-product.png"} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-medium text-slate-900">{product.name}</h3>
            <p className="text-sm text-slate-500">{product.sku}</p>
            <p className="text-sm text-slate-500">Stock: {product.stock}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              For Balagruha <span className="text-red-500">*</span>
            </label>
            <select
              name="balagruhaId"
              value={formData.balagruhaId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select Balagruha...</option>
              {isPM && <option value="STOCK">General Stock (Inventory)</option>}
              {balagruhaOptions.map((bgId, index) => (
                <option key={index} value={bgId}>
                  Balagruha {bgId.substring(0, 6)}...
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                min="1"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Reason
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={3}
              placeholder="Why is this needed? (Optional)"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {isPM && product.stock > 0 && (
            <div className="bg-blue-50 p-3 rounded-md border border-blue-100">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="assignShortcut"
                  checked={formData.assignShortcut}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 text-purple-600 border-slate-300 rounded focus:ring-purple-500"
                />
                <div>
                  <span className="font-medium text-slate-900 text-sm">Assign from Stock Immediately</span>
                  <p className="text-xs text-slate-600">
                    If checked, item will be marked "Delivered to Store" and stock deducted immediately.
                  </p>
                </div>
              </label>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-md transition-colors disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}