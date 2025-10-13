import React from 'react';
import { useNavigate } from 'react-router-dom';

const TransactionItem = ({ transaction, onClick }) => {
  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleClick = () => {
    // If it's a shop transaction with orderId, navigate to order history
    if (transaction.source === 'shop' && transaction.metadata?.orderId) {
      navigate('/shop/orders');
    } else {
      // Otherwise show detail modal
      onClick();
    }
  };

  return (
    <div
      className={`transaction-item ${transaction.type}`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <div className="transaction-item-main">
        <div className="transaction-icon">
          {transaction.type === 'earned' ? (
            <span className="icon-earned">+</span>
          ) : (
            <span className="icon-spent">-</span>
          )}
        </div>

        <div className="transaction-details">
          <div className="transaction-description">{transaction.description}</div>
          <div className="transaction-meta">
            <span className="transaction-source">{transaction.source.toUpperCase()}</span>
            <span className="transaction-date">{formatDate(transaction.createdAt)}</span>
          </div>
        </div>

        <div className={`transaction-amount ${transaction.type}`}>
          {transaction.type === 'earned' ? '+' : '-'}{transaction.amount}
          <span className="coins-label">coins</span>
        </div>
      </div>

      {transaction.source === 'shop' && transaction.metadata?.orderId && (
        <div className="transaction-action">
          <span className="view-order-link">View Order →</span>
        </div>
      )}
    </div>
  );
};

export default TransactionItem;
