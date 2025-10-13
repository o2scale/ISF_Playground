import React, { useState } from 'react';

const TransactionFilters = ({ filters, onFilterChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);
  const [dateError, setDateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters(prev => ({ ...prev, [name]: value }));
    // Clear error when user modifies dates
    if (name === 'startDate' || name === 'endDate') {
      setDateError('');
    }
  };

  const handleApplyFilters = () => {
    // Validate date range
    if (localFilters.startDate && localFilters.endDate) {
      const startDate = new Date(localFilters.startDate);
      const endDate = new Date(localFilters.endDate);

      if (endDate < startDate) {
        setDateError('End date cannot be before start date');
        return;
      }
    }

    setDateError('');
    onFilterChange(localFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      type: '',
      source: '',
      startDate: '',
      endDate: ''
    };
    setLocalFilters(clearedFilters);
    setDateError('');
    onFilterChange(clearedFilters);
  };

  return (
    <div className="transaction-filters">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="type">Type</label>
          <select
            id="type"
            name="type"
            value={localFilters.type}
            onChange={handleInputChange}
          >
            <option value="">All Types</option>
            <option value="earned">Earned</option>
            <option value="spent">Spent</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="source">Source</label>
          <select
            id="source"
            name="source"
            value={localFilters.source}
            onChange={handleInputChange}
          >
            <option value="">All Sources</option>
            <option value="shop">Shop</option>
            <option value="wtf">WTF</option>
            <option value="attendance">Attendance</option>
            <option value="task">Task</option>
            <option value="medical">Medical</option>
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="startDate">Start Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={localFilters.startDate}
            onChange={handleInputChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={localFilters.endDate}
            onChange={handleInputChange}
          />
        </div>
      </div>

      {dateError && (
        <div className="date-error-message" style={{ color: '#ef4444', fontSize: '14px', marginTop: '8px', marginBottom: '8px' }}>
          ⚠️ {dateError}
        </div>
      )}

      <div className="filter-actions">
        <button className="apply-btn" onClick={handleApplyFilters}>
          Apply Filters
        </button>
        <button className="clear-btn" onClick={handleClearFilters}>
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default TransactionFilters;
