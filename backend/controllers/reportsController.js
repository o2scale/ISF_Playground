// Sprint5-Story-12: Transaction Reports Controller
// HTTP handlers for transaction reports and leaderboards

const AnalyticsService = require('../services/analytics');

/**
 * Get transaction log with filters and pagination
 * GET /api/v2/shop/admin/reports/transactions
 * Query params: ?startDate&endDate&studentId&status&page&limit
 */
exports.getTransactionLog = async (req, res) => {
  try {
    const { startDate, endDate, studentId, status, page = 1, limit = 20 } = req.query;

    // Validate pagination params
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum < 1) {
      return res.status(400).json({
        success: false,
        message: 'Invalid page parameter'
      });
    }

    if (isNaN(limitNum) || limitNum < 1 || limitNum > 100) {
      return res.status(400).json({
        success: false,
        message: 'Invalid limit parameter (must be 1-100)'
      });
    }

    // Build filters
    const filters = {};
    if (startDate) filters.startDate = startDate;
    if (endDate) filters.endDate = endDate;
    if (studentId) filters.studentId = studentId;
    if (status) filters.status = status;

    const result = await AnalyticsService.getTransactionLog(filters, pageNum, limitNum);

    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Error fetching transaction log:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch transaction log',
      error: error.message
    });
  }
};

/**
 * Get student leaderboard (top earners or top spenders)
 * GET /api/v2/shop/admin/reports/leaderboard
 * Query params: ?type=earners|spenders&limit=10
 */
exports.getStudentLeaderboard = async (req, res) => {
  try {
    const { type = 'earners', limit = 10 } = req.query;

    // Validate type
    if (!['earners', 'spenders'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid type parameter. Must be "earners" or "spenders"'
      });
    }

    // Validate limit
    const limitNum = parseInt(limit, 10);
    if (isNaN(limitNum) || limitNum < 1 || limitNum > 50) {
      return res.status(400).json({
        success: false,
        message: 'Invalid limit parameter (must be 1-50)'
      });
    }

    const leaderboard = await AnalyticsService.getStudentLeaderboard(type, limitNum);

    res.status(200).json({
      success: true,
      data: {
        type,
        leaderboard
      }
    });
  } catch (error) {
    console.error('Error fetching student leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student leaderboard',
      error: error.message
    });
  }
};

/**
 * Get students with zero purchases
 * GET /api/v2/shop/admin/reports/zero-purchases
 */
exports.getZeroPurchaseStudents = async (req, res) => {
  try {
    const students = await AnalyticsService.getZeroPurchaseStudents();

    res.status(200).json({
      success: true,
      data: {
        students,
        count: students.length
      }
    });
  } catch (error) {
    console.error('Error fetching zero-purchase students:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch zero-purchase students',
      error: error.message
    });
  }
};

/**
 * Get coin economy health metrics
 * GET /api/v2/shop/admin/reports/coin-economy
 */
exports.getCoinEconomyHealth = async (req, res) => {
  try {
    const economyHealth = await AnalyticsService.getCoinEconomyHealth();

    res.status(200).json({
      success: true,
      data: economyHealth
    });
  } catch (error) {
    console.error('Error fetching coin economy health:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch coin economy health',
      error: error.message
    });
  }
};

/**
 * Get student participation details
 * GET /api/v2/shop/admin/reports/participation-details
 * Query params: ?startDate&endDate
 */
exports.getParticipationDetails = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    // Validate dates
    if (start && isNaN(start.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid startDate format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    if (end && isNaN(end.getTime())) {
      return res.status(400).json({
        success: false,
        message: 'Invalid endDate format. Use ISO 8601 format (YYYY-MM-DD)'
      });
    }

    const participationDetails = await AnalyticsService.getStudentParticipationDetails(start, end);

    res.status(200).json({
      success: true,
      data: participationDetails
    });
  } catch (error) {
    console.error('Error fetching participation details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch participation details',
      error: error.message
    });
  }
};

/**
 * Export report as CSV
 * GET /api/v2/shop/admin/reports/export
 * Query params: ?type=transactions|leaderboard|zero-purchases&format=csv&...filters
 */
exports.exportReport = async (req, res) => {
  try {
    const { type, format = 'csv', ...filters } = req.query;

    if (!type) {
      return res.status(400).json({
        success: false,
        message: 'Report type is required'
      });
    }

    if (!['transactions', 'leaderboard', 'zero-purchases', 'participation'].includes(type)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report type'
      });
    }

    if (format !== 'csv') {
      return res.status(400).json({
        success: false,
        message: 'Only CSV format is supported currently'
      });
    }

    let data;
    let filename;
    let headers = [];
    let rows = [];

    // Generate report data based on type
    switch (type) {
      case 'transactions': {
        const result = await AnalyticsService.getTransactionLog(filters, 1, 10000); // Export up to 10k records
        data = result.transactions;
        filename = `transaction-report-${new Date().toISOString().split('T')[0]}.csv`;
        headers = ['Order Number', 'Student Name', 'Student Email', 'Date', 'Total Amount (coins)', 'Item Count', 'Status'];
        rows = data.map(t => [
          t.orderNumber,
          t.studentName,
          t.studentEmail,
          new Date(t.date).toISOString().split('T')[0],
          t.totalAmount,
          t.itemCount,
          t.status
        ]);
        break;
      }

      case 'leaderboard': {
        const leaderboardType = filters.leaderboardType || 'spenders';
        const result = await AnalyticsService.getStudentLeaderboard(leaderboardType, 50);
        data = result;
        filename = `${leaderboardType}-leaderboard-${new Date().toISOString().split('T')[0]}.csv`;
        headers = ['Rank', 'Student Name', 'Email', 'Total Earned', 'Total Spent', 'Current Balance', 'Purchase Count', 'Avg Order Value'];
        rows = data.map(s => [
          s.rank,
          s.studentName,
          s.email,
          s.totalEarned,
          s.totalSpent,
          s.currentBalance,
          s.purchaseCount,
          s.avgOrderValue
        ]);
        break;
      }

      case 'zero-purchases': {
        const result = await AnalyticsService.getZeroPurchaseStudents();
        data = result;
        filename = `zero-purchases-report-${new Date().toISOString().split('T')[0]}.csv`;
        headers = ['Student Name', 'Email', 'Balance', 'Last Activity', 'Balagruha', 'Coach'];
        rows = data.map(s => [
          s.name,
          s.email,
          s.balance,
          s.lastActivity ? new Date(s.lastActivity).toISOString().split('T')[0] : 'N/A',
          s.balagruha || 'N/A',
          s.coach || 'N/A'
        ]);
        break;
      }

      case 'participation': {
        const start = filters.startDate ? new Date(filters.startDate) : null;
        const end = filters.endDate ? new Date(filters.endDate) : null;
        const result = await AnalyticsService.getStudentParticipationDetails(start, end);
        data = result.students;
        filename = `participation-report-${new Date().toISOString().split('T')[0]}.csv`;
        headers = ['Student Name', 'Email', 'Has Purchased', 'Purchase Count', 'Total Spent', 'Balance', 'Last Purchase'];
        rows = data.map(s => [
          s.name,
          s.email,
          s.hasPurchased ? 'Yes' : 'No',
          s.purchaseCount,
          s.totalSpent,
          s.balance,
          s.lastPurchase ? new Date(s.lastPurchase).toISOString().split('T')[0] : 'Never'
        ]);
        break;
      }
    }

    // Generate CSV content
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Set response headers for file download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.status(200).send(csvContent);

  } catch (error) {
    console.error('Error exporting report:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export report',
      error: error.message
    });
  }
};
