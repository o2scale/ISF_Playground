import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import useShopStore from '../../store/shopStore';
import { useAuth } from '../../contexts/AuthContext';

/**
 * ProductCard Component - Story-01, Story-02 AC1
 * Displays individual product with image, name, price, and add-to-cart button
 * Design System: WTF Module pin card pattern
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useShopStore();
  const { user } = useAuth();
  const [isAdding, setIsAdding] = useState(false);

  // Check if user is admin, coach, or purchase-manager - they cannot purchase from shop
  const isAdmin = user?.role?.toLowerCase() === 'admin';
  const isCoach = user?.role?.toLowerCase() === 'coach';
  const isPurchaseManager = user?.role?.toLowerCase() === 'purchase-manager';
  const cannotPurchase = isAdmin || isCoach || isPurchaseManager;

  const handleAddToCart = async () => {
    if (!product.inStock || isAdding || cannotPurchase) return;

    setIsAdding(true);
    try {
      await addToCart(product, 1);
    } catch (error) {
      // Error toast is handled in the store
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden flex flex-col h-full">
      {/* Product Image */}
      <div className="relative aspect-square flex-shrink-0">
        <img
          src={product.primaryImageUrl || product.imageUrl || '/placeholder-product.png'}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Low Stock Badge */}
        {product.lowStock && product.inStock && (
          <div className="absolute top-2 right-2">
            <span className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
              Only {product.stock} left!
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-1">
        {/* Category Badge */}
        <span className="inline-block bg-purple-100 text-purple-800 text-xs font-medium px-2 py-1 rounded-full mb-2">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-semibold text-slate-900 mb-1 truncate">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Spacer to push button to bottom */}
        <div className="flex-1"></div>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          {product.discountPrice ? (
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-emerald-600">
                {product.discountPrice} coins
              </span>
              <span className="text-sm text-slate-400 line-through">
                {product.price} coins
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-slate-900">
              {product.price} coins
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding || cannotPurchase}
          className={`w-full px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors ${
            product.inStock && !isAdding && !cannotPurchase
              ? 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          }`}
          aria-label={`Add ${product.name} to cart`}
          title={cannotPurchase ? 'Admins, coaches, and purchase managers cannot purchase from the shop' : ''}
        >
          {isAdding ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              {cannotPurchase ? 'View Only' : product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
