const mongoose = require('mongoose');

const purchaseRequestSchema = new mongoose.Schema(
  {
    requestId: {
      type: String,
      unique: true,
      required: false,  // Auto-generated in pre-save hook
      // Auto-generated: "PR-" + counter (e.g., PR-001, PR-002)
    },

    // Balagruha (optional for shop-wide requests)
    balagruhaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Balagruha',
      required: false,  // Optional for shop-wide products
      index: true
    },

    // Category Classification
    category: {
      type: String,
      required: true,
      enum: ['New Equipment', 'Consumables (Including medicines)', 'Others'],
      trim: true,
      index: true
    },

    // Multi-Product Items Array
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ShopItem',
          required: true
        },
        productName: {
          type: String,
          required: true
        },
        productSKU: {
          type: String,
          required: true
        },
        requestedQuantity: {
          type: Number,
          required: true,
          min: [1, 'Quantity must be at least 1']
        },
        currentStock: {
          type: Number,
          required: true
        },
        lowStockThreshold: {
          type: Number,
          required: true
        },
        estimatedUnitCost: {
          type: Number,
          required: true,
          min: [0, 'Cost cannot be negative']
        },
        estimatedTotalCost: {
          type: Number,
          required: true
        },
        // Per-Product Purchase Details (filled during stock update)
        receivedQuantity: {
          type: Number,
          min: [0, 'Received quantity cannot be negative']
        },
        actualUnitCost: {
          type: Number,
          min: [0, 'Cost cannot be negative']
        },
        actualTotalCost: {
          type: Number,
          min: [0, 'Cost cannot be negative']
        }
      }
    ],

    // File Attachments
    attachments: [
      {
        filename: {
          type: String,
          required: true
        },
        fileUrl: {
          type: String,
          required: true
        },
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    // Request Details
    totalEstimatedCost: {
      type: Number,
      default: 0
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

    // Purchase Details (filled after approval during stock update - request-level)
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
    actualTotalCost: {
      type: Number,
      min: [0, 'Cost cannot be negative']
    },

    // Completion (multi-product tracking)
    completedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    completedAt: {
      type: Date
    },
    inventoryTransactionIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'InventoryTransaction'
      // Array of transaction IDs (one per product)
    }]
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

// Auto-generate requestId and calculate totalEstimatedCost
purchaseRequestSchema.pre('save', async function(next) {
  // Generate requestId for new documents
  if (this.isNew && !this.requestId) {
    const count = await mongoose.model('PurchaseRequest').countDocuments();
    this.requestId = `PR-${String(count + 1).padStart(3, '0')}`;
  }

  // Calculate totalEstimatedCost from items
  if (this.items && this.items.length > 0) {
    this.totalEstimatedCost = this.items.reduce((sum, item) => sum + item.estimatedTotalCost, 0);
  }

  next();
});

// Virtual: requestAge (in hours)
purchaseRequestSchema.virtual('requestAge').get(function() {
  const now = new Date();
  const diffMs = now - this.createdAt;
  return Math.floor(diffMs / (1000 * 60 * 60));  // hours
});

// Virtual: totalItems
purchaseRequestSchema.virtual('totalItems').get(function() {
  return this.items ? this.items.length : 0;
});

// Virtual: totalQuantity
purchaseRequestSchema.virtual('totalQuantity').get(function() {
  return this.items ? this.items.reduce((sum, item) => sum + item.requestedQuantity, 0) : 0;
});

const PurchaseRequest = mongoose.model('PurchaseRequest', purchaseRequestSchema);

module.exports = PurchaseRequest;
