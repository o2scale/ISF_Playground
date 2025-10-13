import React from 'react';
import TransactionItem from './TransactionItem';

const TransactionList = ({ transactions, loading, pagination, onPageChange, onTransactionClick }) => {
  if (loading) {
    return (
      <div className="transaction-list-loading">
        <div className="spinner"></div>
        <p>Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="transaction-list-empty">
        <p>No transactions found</p>
      </div>
    );
  }

  return (
    <div className="transaction-list-container">
      <div className="transaction-list">
        {transactions.map((transaction, index) => (
          <TransactionItem
            key={transaction._id || index}
            transaction={transaction}
            onClick={() => onTransactionClick(transaction)}
          />
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="pagination">
          <button
            className="pagination-btn"
            disabled={pagination.page === 1}
            onClick={() => onPageChange(pagination.page - 1)}
          >
            Previous
          </button>

          <span className="pagination-info">
            Page {pagination.page} of {pagination.pages}
            <span className="pagination-total">
              ({pagination.total} transactions)
            </span>
          </span>

          <button
            className="pagination-btn"
            disabled={pagination.page === pagination.pages}
            onClick={() => onPageChange(pagination.page + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
