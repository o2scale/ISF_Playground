import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { api } from '../api';
import toast from 'react-hot-toast';
import { useRBAC } from '../contexts/RBACContext';
import ProductTable from '../components/shop/ProductTable';
import ProductFormModal from '../components/shop/ProductFormModal';
import DeleteConfirmModal from '../components/shop/DeleteConfirmModal';

/**
 * ProductManagement Page - Sprint5-Story-05
 * Admin page for managing shop products with CRUD operations
 * SECURITY: Requires 'shop' module 'manage' permission
 */

export default function ProductManagement() {
  const navigate = useNavigate();
  const { hasPermission, isLoading: rbacLoading, permissions } = useRBAC();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const ITEMS_PER_PAGE = 20;

  // SECURITY CHECK: Redirect unauthorized users
  useEffect(() => {
    // Wait for RBAC context to finish loading before checking permissions
    if (rbacLoading) {
      console.log('RBAC context still loading, waiting...');
      return;
    }

    // CRITICAL FIX: Also wait if permissions object is empty (not yet populated)
    const permissionsLoaded = Object.keys(permissions).length > 0;
    if (!permissionsLoaded) {
      console.log('Permissions not yet loaded (empty object), waiting...');
      return;
    }

    console.log('RBAC loaded and permissions populated, checking access...');
    console.log('Available permissions:', permissions);
    console.log('Permissions keys:', Object.keys(permissions));
    console.log('Shop Management permission exists:', permissions['Shop Management']);

    const hasPerm = hasPermission('Shop Management', 'Manage');
    console.log('Has Shop Management permission:', hasPerm);

    if (!hasPerm) {
      console.warn('Unauthorized access attempt to Product Management');
      navigate('/access-denied');
    } else {
      console.log('✅ Permission check passed - user has admin access');
    }
  }, [hasPermission, navigate, rbacLoading, permissions]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        sortBy: 'createdAt',
        sortOrder: 'desc'
      };

      if (searchTerm) {
        params.search = searchTerm;
      }

      if (categoryFilter !== 'all') {
        params.category = categoryFilter;
      }

      if (statusFilter !== 'all') {
        params.isActive = statusFilter === 'active' ? 'true' : 'false';
      }

      const response = await api.get('/api/v2/shop/admin/products', { params });

      setProducts(response.data.products || []);
      setTotalPages(response.data.pagination?.pages || 1);
      setTotal(response.data.pagination?.total || 0);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(err.response?.data?.message || 'Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, categoryFilter, statusFilter]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setIsFormModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsFormModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedProduct) {
        // Update existing product
        await api.put(`/api/v2/shop/admin/products/${selectedProduct._id}`, formData);
        toast.success('Product updated successfully');
      } else {
        // Create new product
        await api.post('/api/v2/shop/admin/products', formData);
        toast.success('Product created successfully');
      }

      setIsFormModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error saving product:', err);
      const errorMessage = err.response?.data?.message || 'Failed to save product';
      toast.error(errorMessage);
      throw err; // Re-throw to let modal handle it
    }
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`/api/v2/shop/admin/products/${selectedProduct._id}`);
      toast.success('Product deleted successfully');
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      toast.error(err.response?.data?.message || 'Failed to delete product');
    }
  };

  // Show loading state while RBAC context is loading
  if (rbacLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading permissions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Product Management</h1>
              <p className="text-slate-600 mt-1">Manage shop products and inventory</p>
            </div>
            <button
              onClick={handleCreateProduct}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Product
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by SKU, name, or description..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </form>

            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="stationery">Stationery</option>
              <option value="sports">Sports</option>
              <option value="books">Books</option>
              <option value="uniforms">Uniforms</option>
              <option value="digital">Digital</option>
              <option value="other">Other</option>
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {/* Results Count */}
          <div className="mt-3 text-sm text-slate-600">
            Showing {products.length} of {total} products
          </div>
        </div>

        {/* Product Table */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {loading && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <div className="inline-block w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-slate-600">Loading products...</p>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <p className="text-slate-600 text-lg">No products found</p>
            <p className="text-slate-500 mt-2">Try adjusting your filters or create a new product</p>
            <button
              onClick={handleCreateProduct}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create First Product
            </button>
          </div>
        )}

        {!loading && !error && products.length > 0 && (
          <ProductTable
            products={products}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            <span className="px-4 py-2 text-slate-700">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {isFormModalOpen && (
        <ProductFormModal
          product={selectedProduct}
          onClose={() => {
            setIsFormModalOpen(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleFormSubmit}
        />
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <DeleteConfirmModal
          product={selectedProduct}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
