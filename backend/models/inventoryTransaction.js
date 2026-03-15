const mongoose = require('mongoose');

/**
 * InventoryTransaction Model - Sprint5-Story-06
 * Tracks all inventory changes with full audit trail
 */

const inventoryTransactionSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopItem',
      required: true,
      index: true
    },
    transactionType: {
      type: String,
      enum: ['purchase', 'sale', 'adjustment', 'return', 'correction', 'purchase_request'],
      required: true
    },
    quantity: {
      type: Number,
      required: true
      // Can be positive (stock increase) or negative (stock decrease)
    },
    previousStock: {
      type: Number,
      required: true
    },
    newStock: {
      type: Number,
      required: true
    },
    reference: {
      // Reference to related document (e.g., order, purchase order, purchase request)
      type: {
        type: String,
        enum: ['order', 'purchase', 'manual', 'bulk_import', 'purchase_request'],
        default: 'manual'
      },
      id: {
        type: mongoose.Schema.Types.ObjectId
      }
    },
    reason: {
      type: String,
      required: true,
      maxlength: 100
    },
    notes: {
      type: String,
      maxlength: 500
    },
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

// Indexes for efficient querying
inventoryTransactionSchema.index({ productId: 1, createdAt: -1 });
inventoryTransactionSchema.index({ performedBy: 1 });
inventoryTransactionSchema.index({ transactionType: 1 });

// Virtual for formatted quantity display
inventoryTransactionSchema.virtual('quantityFormatted').get(function() {
  return this.quantity >= 0 ? `+${this.quantity}` : `${this.quantity}`;
});

// Ensure virtuals are included in JSON output
inventoryTransactionSchema.set('toJSON', { virtuals: true });
inventoryTransactionSchema.set('toObject', { virtuals: true });

const InventoryTransaction = mongoose.models.InventoryTransaction || mongoose.model("InventoryTransaction", inventoryTransactionSchema);

module.exports = InventoryTransaction;
