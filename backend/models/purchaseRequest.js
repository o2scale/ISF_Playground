const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      required: true,
      // Auto-generated: "PR-" + counter (e.g., PR-001, PR-002)
    },

    // Product Information (snapshot at request time)
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShopItem',
      required: true,
      index: true
    },
    productName: {
      type: String,
      required: true
    },
    productSKU: {
      type: String,
      required: true
    },
    balagruhaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Balagruha',
      required: true,
      index: true
      // Derived from product's balagruhaId
    },

    // Request Details
    requestedQuantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity must be at least 1']
    },
    currentStock: {
      type: Number,
      required: true
      // Snapshot of stock at request time
    },
    lowStockThreshold: {
      type: Number,
      required: true
      // Snapshot of threshold at request time
    },
    reason: {
      type: String,
      required: [true, 'Reason is required'],
      maxlength: [200, 'Reason cannot exceed 200 characters'],
      trim: true
    },
    justification: {
      type: String,
      maxlength: [500, 'Justification cannot exceed 500 characters'],
      trim: true
    },

    // Request Metadata
    requestedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },

    // Status Management
    status: {
      type: String,
      enum: ['pending_approval', 'approved', 'rejected', 'completed', 'cancelled'],
      default: 'pending_approval',
      index: true
    },

    // Approval/Rejection
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reviewedAt: {
      type: Date
    },
    reviewNotes: {
      type: String,
      maxlength: [500, 'Review notes cannot exceed 500 characters']
    },

    // Purchase Details (filled after approval during stock update)
    supplierName: {
      type: String,
      trim: true
    },
    invoiceNumber: {
      type: String,
      trim: true
    },
    purchaseDate: {
      type: Date
    },
    actualCost: {
      type: Number,
      min: [0, 'Cost cannot be negative']
    },
    receivedQuantity: {
      type: Number,
      min: [0, 'Received quantity cannot be negative']
    },

    // Completion
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: {
      type: Date
    },
    inventoryTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryTransaction'
      // Linked after stock update
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
purchaseRequestSchema.index({ requestedBy: 1, status: 1 });
purchaseRequestSchema.index({ balagruhaId: 1, status: 1 });
purchaseRequestSchema.index({ createdAt: -1 });

// Auto-generate requestId
purchaseRequestSchema.pre('save', async function(next) {
  if (this.isNew && !this.requestId) {
    const count = await mongoose.model('PurchaseRequest').countDocuments();
    this.requestId = `PR-${String(count + 1).padStart(3, '0')}`;
  }
  next();
});

// Virtual: requestAge (in hours)
purchaseRequestSchema.virtual('requestAge').get(function() {
  const now = new Date();
  const diffMs = now - this.createdAt;
  return Math.floor(diffMs / (1000 * 60 * 60));  // hours
});

const PurchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema);

module.exports = PurchaseRequest;
