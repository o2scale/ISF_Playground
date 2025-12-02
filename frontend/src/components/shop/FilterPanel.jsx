import React from 'react';
import { X } from 'lucide-react';

/**
 * FilterPanel Component - Story-01
 * Sidebar with category, price, and search filters
 * Design System: WTF Module filter pattern
 */
const FilterPanel = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { value: 'stationery', label: 'Stationery' },
    { value: 'sports', label: 'Sports' },
    { value: 'books', label: 'Books' },
    { value: 'uniforms', label: 'Uniforms' },
    { value: 'digital', label: 'Digital' },
    { value: 'other', label: 'Other' }
  ];

  const handleSearchChange = (e) => {
    onFilterChange({ search: e.target.value });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ category: filters.category === category ? null : category });
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    onFilterChange({ maxPrice: value });
  };

  const handleInStockChange = (e) => {
    onFilterChange({ inStock: e.target.checked });
  };

  return (
    <aside className="w-64 bg-white rounded-lg border border-slate-200 p-4 sticky top-20 h-fit">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
        {(filters.search || filters.category || filters.maxPrice < 500) && (
          <button
            onClick={onClearFilters}
            className="text-xs text-indigo-600 hover:underline flex items-center gap-1"
          >
            <X className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Search Products
        </label>
        <input
          type="text"
          placeholder="Search by name..."
          value={filters.search || ''}
          onChange={handleSearchChange}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm"
        />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-2">Categories</h4>
        <div className="space-y-2">
          {categories.map(cat => (
            <label
              key={cat.value}
              className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded transition-colors"
            >
              <input
                type="radio"
                name="category"
                checked={filters.category === cat.value}
                onChange={() => handleCategoryChange(cat.value)}
                className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
              />
              <span className="text-sm text-slate-700">{cat.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-slate-700 mb-2">
          Price Range (up to {filters.maxPrice || 500} coins)
        </h4>
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={filters.maxPrice || 500}
          onChange={handlePriceChange}
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div className="flex justify-between text-xs text-slate-500 mt-1">
          <span>0 coins</span>
          <span>500 coins</span>
        </div>
      </div>

      {/* In Stock Only */}
      <div className="mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock !== false}
            onChange={handleInStockChange}
            className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm text-slate-700">In stock only</span>
        </label>
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={onClearFilters}
        className="w-full bg-slate-200 text-slate-800 px-4 py-2 rounded-md hover:bg-slate-300 transition-colors text-sm font-medium"
      >
        Clear All Filters
      </button>
    </aside>
  );
};

export default FilterPanel;
