const mongoose = require('mongoose');

const shopItemSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: [true, 'SKU is required'],
      unique: true,
      trim: true,
      uppercase: true,
      index: true
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [100, 'Product name cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['stationery', 'sports', 'books', 'uniforms', 'digital', 'other'],
        message: '{VALUE} is not a valid category'
      },
      index: true
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Price must be a whole number (coins)'
      }
    },
    discountPrice: {
      type: Number,
      default: null,
      min: [0, 'Discount price cannot be negative'],
      validate: {
        validator: function(value) {
          return value === null || Number.isInteger(value);
        },
        message: 'Discount price must be a whole number (coins)'
      }
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
      min: [0, 'Stock cannot be negative'],
      validate: {
        validator: Number.isInteger,
        message: 'Stock must be a whole number'
      }
    },
    lowStockThreshold: {
      type: Number,
      default: 10,
      min: [0, 'Low stock threshold cannot be negative']
    },
    imageUrl: {
      type: String,
      required: false,
      default: null,
      // DEPRECATED: Keep for backward compatibility, use images array instead
    },
    images: [{
      url: {
        type: String,
        required: true
      },
      isPrimary: {
        type: Boolean,
        default: false
      },
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }],
    isActive: {
      type: Boolean,
      default: true,
      index: true
    },
    availableFor: {
      type: [String],
      enum: ['student', 'coach', 'all'],
      default: ['student']
    },
    tags: {
      type: [String],
      default: []
    },
    metadata: {
      type: Map,
      of: String,
      default: {}
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for performance
shopItemSchema.index({ category: 1, isActive: 1 });
shopItemSchema.index({ price: 1 });
shopItemSchema.index({ stock: 1 });
shopItemSchema.index({ name: 'text', description: 'text' }); // Text search
shopItemSchema.index({ createdAt: -1 });

// Virtual: inStock
shopItemSchema.virtual('inStock').get(function() {
  return this.stock > 0;
});

// Virtual: lowStock
shopItemSchema.virtual('lowStock').get(function() {
  return this.stock > 0 && this.stock <= this.lowStockThreshold;
});

// Virtual: currentPrice (returns discountPrice if available, otherwise price)
shopItemSchema.virtual('currentPrice').get(function() {
  return this.discountPrice !== null ? this.discountPrice : this.price;
});

// Virtual: primaryImageUrl (returns primary image or first image or legacy imageUrl)
shopItemSchema.virtual('primaryImageUrl').get(function() {
  if (this.images && this.images.length > 0) {
    const primaryImage = this.images.find(img => img.isPrimary);
    return primaryImage ? primaryImage.url : this.images[0].url;
  }
  return this.imageUrl || '';
});

// Pre-save hook: Validate discount price is less than regular price
shopItemSchema.pre('save', function(next) {
  if (this.discountPrice !== null && this.discountPrice >= this.price) {
    next(new Error('Discount price must be less than regular price'));
  }
  next();
});

// Instance method: Check if product is available for a user role
shopItemSchema.methods.isAvailableFor = function(userRole) {
  return this.availableFor.includes('all') || this.availableFor.includes(userRole);
};

// Static method: Find products by category
shopItemSchema.statics.findByCategory = function(category, options = {}) {
  const query = { category, isActive: true, stock: { $gt: 0 } };
  return this.find(query, null, options);
};

// Static method: Search products
shopItemSchema.statics.search = function(searchTerm, options = {}) {
  const query = {
    $text: { $search: searchTerm },
    isActive: true
  };
  return this.find(query, { score: { $meta: 'textScore' } }, options)
    .sort({ score: { $meta: 'textScore' } });
};

const ShopItem = mongoose.model('ShopItem', shopItemSchema);

module.exports = ShopItem;
