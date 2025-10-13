import React, { useState, useEffect } from 'react';
import { getUserTransactionHistory } from '../api';
import config from '../config';
import TransactionFilters from '../components/shop/TransactionFilters';
import TransactionList from '../components/shop/TransactionList';
import TransactionDetailModal from '../components/shop/TransactionDetailModal';
import '../styles/TransactionHistory.css';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0
  });
  const [summary, setSummary] = useState({
    totalEarned: 0,
    totalSpent: 0,
    currentBalance: 0
  });
  const [filters, setFilters] = useState(() => {
    // Load saved filters from localStorage on component mount
    const savedFilters = localStorage.getItem('transactionFilters');
    if (savedFilters) {
      try {
        return JSON.parse(savedFilters);
      } catch (error) {
        console.error('Error parsing saved filters:', error);
      }
    }
    return {
      type: '',
      source: '',
      startDate: '',
      endDate: ''
    };
  });
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, [filters, pagination.page]);

  // Save filters to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('transactionFilters', JSON.stringify(filters));
  }, [filters]);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      });

      if (filters.type) params.append('type', filters.type);
      if (filters.source) params.append('source', filters.source);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const response = await getUserTransactionHistory(params);

      if (response.success) {
        setTransactions(response.data.transactions);
        setPagination(response.data.pagination);
        setSummary(response.data.summary);
      } else {
        setError(response.message || 'Failed to fetch transaction history');
      }
    } catch (err) {
      console.error('Error fetching transaction history:', err);
      setError('An error occurred while fetching transaction history');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 })); // Reset to first page
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setSelectedTransaction(null);
  };

  const handleExport = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append('type', filters.type);
      if (filters.source) params.append('source', filters.source);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);

      const token = localStorage.getItem('token');
      const response = await fetch(
        `${config.API_BASE_URL}/api/v1/coin/transactions/export?${params.toString()}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `transaction-history-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error exporting transaction history:', err);
      setError('Failed to export transaction history');
    }
  };

  return (
    <div className="transaction-history-page">
      <div className="transaction-history-header">
        <h1>Transaction History</h1>
        <button
          className="export-btn"
          onClick={handleExport}
          disabled={loading || transactions.length === 0}
        >
          Export CSV
        </button>
      </div>

      <div className="transaction-summary">
        <div className="summary-card">
          <span className="summary-label">Current Balance</span>
          <span className="summary-value balance">{summary.currentBalance} coins</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Earned</span>
          <span className="summary-value earned">+{summary.totalEarned} coins</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Total Spent</span>
          <span className="summary-value spent">-{summary.totalSpent} coins</span>
        </div>
      </div>

      <TransactionFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <TransactionList
        transactions={transactions}
        loading={loading}
        pagination={pagination}
        onPageChange={handlePageChange}
        onTransactionClick={handleTransactionClick}
      />

      {showDetailModal && selectedTransaction && (
        <TransactionDetailModal
          transaction={selectedTransaction}
          onClose={handleCloseDetailModal}
        />
      )}
    </div>
  );
};

export default TransactionHistory;
