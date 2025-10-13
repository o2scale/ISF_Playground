// Sprint5-Story-12: Transaction Reports Page
// Main container for all transaction reports and coin economy metrics

import React, { useState, useEffect } from 'react';
import { FileText, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import TransactionLogTable from '../components/shop/TransactionLogTable';
import StudentLeaderboard from '../components/shop/StudentLeaderboard';
import ZeroPurchasesReport from '../components/shop/ZeroPurchasesReport';
import CoinEconomyHealth from '../components/shop/CoinEconomyHealth';
import {
  getTransactionLog,
  getStudentLeaderboard,
  getZeroPurchaseStudents,
  getCoinEconomyHealth,
  exportReport
} from '../api';

const TransactionReports = () => {
  const navigate = useNavigate();

  // Loading states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Data states
  const [transactionLog, setTransactionLog] = useState({ transactions: [], pagination: {} });
  const [earnersLeaderboard, setEarnersLeaderboard] = useState([]);
  const [spendersLeaderboard, setSpendersLeaderboard] = useState([]);
  const [zeroPurchases, setZeroPurchases] = useState([]);
  const [economyHealth, setEconomyHealth] = useState(null);

  // Filter states
  const [transactionFilters, setTransactionFilters] = useState({
    startDate: '',
    endDate: '',
    status: null,
    searchTerm: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch transaction log when filters or page change
  useEffect(() => {
    fetchTransactionLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionFilters, currentPage]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [earnersRes, spendersRes, zeroPurchasesRes, economyRes] = await Promise.all([
        getStudentLeaderboard('earners', 10),
        getStudentLeaderboard('spenders', 10),
        getZeroPurchaseStudents(),
        getCoinEconomyHealth()
      ]);

      if (earnersRes.success) {
        setEarnersLeaderboard(earnersRes.data.leaderboard);
      }

      if (spendersRes.success) {
        setSpendersLeaderboard(spendersRes.data.leaderboard);
      }

      if (zeroPurchasesRes.success) {
        setZeroPurchases(zeroPurchasesRes.data.students);
      }

      if (economyRes.success) {
        setEconomyHealth(economyRes.data);
      }

    } catch (err) {
      console.error('Error fetching reports data:', err);
      setError(err.response?.data?.message || err.message || 'Failed to load reports');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionLog = async () => {
    try {
      const params = {
        page: currentPage,
        limit: 20,
        ...transactionFilters
      };

      // Remove empty filters
      Object.keys(params).forEach(key => {
        if (params[key] === '' || params[key] === null) {
          delete params[key];
        }
      });

      const response = await getTransactionLog(params);
      if (response.success) {
        setTransactionLog(response.data);
      }
    } catch (err) {
      console.error('Error fetching transaction log:', err);
    }
  };

  const handleFilterChange = (newFilters) => {
    setTransactionFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleViewOrder = (orderId) => {
    // Navigate to order details page
    navigate(`/shop/orders/${orderId}`);
  };

  const handleExportLeaderboard = async (type) => {
    try {
      const response = await exportReport('leaderboard', { leaderboardType: type });
      // Download will be triggered by backend
      console.log('Export successful:', response);
    } catch (err) {
      console.error('Error exporting leaderboard:', err);
      alert('Failed to export leaderboard. Please try again.');
    }
  };

  const handleExportZeroPurchases = async () => {
    try {
      const response = await exportReport('zero-purchases', {});
      console.log('Export successful:', response);
    } catch (err) {
      console.error('Error exporting zero purchases:', err);
      alert('Failed to export report. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">Loading transaction reports...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <FileText className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900">Error loading reports</p>
          <p className="text-sm text-gray-600 mt-2">{error}</p>
          <button
            onClick={fetchAllData}
            className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-600" />
            Transaction Reports & Analytics
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Comprehensive reports on shop transactions, student engagement, and coin economy health
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Coin Economy Health Dashboard */}
        <CoinEconomyHealth economyData={economyHealth} />

        {/* Student Leaderboard */}
        <StudentLeaderboard
          earnersData={earnersLeaderboard}
          spendersData={spendersLeaderboard}
          onExport={handleExportLeaderboard}
        />

        {/* Zero Purchases Report */}
        <ZeroPurchasesReport
          students={zeroPurchases}
          onExport={handleExportZeroPurchases}
        />

        {/* Transaction Log */}
        <TransactionLogTable
          transactions={transactionLog.transactions}
          pagination={transactionLog.pagination}
          filters={transactionFilters}
          onFilterChange={handleFilterChange}
          onPageChange={handlePageChange}
          onViewOrder={handleViewOrder}
        />
      </div>
    </div>
  );
};

export default TransactionReports;
