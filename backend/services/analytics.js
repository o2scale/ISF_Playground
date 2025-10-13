// Sprint5-Story-11 & Story-12: Shop Analytics Service
// Aggregation queries for shop performance metrics, leaderboards, and reports

const Order = require('../models/order');
const User = require('../models/user');
const ShopItem = require('../models/shopItem');
const Coin = require('../models/coin');

class AnalyticsService {
  /**
   * Get comprehensive shop analytics for a date range
   * @param {Date} startDate - Start of date range
   * @param {Date} endDate - End of date range
   * @returns {Object} Analytics data including overview, top products, categories, trends
   */
  static async getShopAnalytics(startDate, endDate) {
    // Default to last 30 days if not provided
    const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const defaultEnd = new Date();

    const start = startDate || defaultStart;
    const end = endDate || defaultEnd;

    // Date filter for completed orders only
    const dateFilter = {
      placedAt: { $gte: start, $lte: end },
      status: 'completed'
    };

    // Execute all aggregations in parallel for performance
    const [
      totalOrders,
      revenueData,
      topProductsByVolume,
      topProductsByRevenue,
      categoryPerformance,
      revenueTrend,
      studentParticipation,
      stockTurnover
    ] = await Promise.all([
      this.getTotalOrders(dateFilter),
      this.getTotalRevenue(dateFilter),
      this.getTopProductsByVolume(dateFilter, 10),
      this.getTopProductsByRevenue(dateFilter, 10),
      this.getCategoryPerformance(dateFilter),
      this.getRevenueTrend(start, end),
      this.getStudentParticipation(start, end),
      this.getStockTurnover(dateFilter)
    ]);

    // Calculate average order value
    const avgOrderValue = totalOrders > 0 ? revenueData.totalRevenue / totalOrders : 0;

    return {
      overview: {
        totalOrders,
        totalRevenue: revenueData.totalRevenue,
        avgOrderValue: Math.round(avgOrderValue * 100) / 100,
        studentParticipation
      },
      topProducts: {
        byVolume: topProductsByVolume,
        byRevenue: topProductsByRevenue
      },
      categoryPerformance,
      revenueTrend,
      stockTurnover
    };
  }

  /**
   * Get total number of completed orders
   */
  static async getTotalOrders(dateFilter) {
    return await Order.countDocuments(dateFilter);
  }

  /**
   * Get total revenue from completed orders
   */
  static async getTotalRevenue(dateFilter) {
    const result = await Order.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalAmount' }
        }
      }
    ]);

    return {
      totalRevenue: result[0]?.totalRevenue || 0
    };
  }

  /**
   * Get top products by units sold
   */
  static async getTopProductsByVolume(dateFilter, limit = 10) {
    return await Order.aggregate([
      { $match: dateFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.shopItemId',
          name: { $first: '$items.name' },
          sku: { $first: '$items.sku' },
          unitsSold: { $sum: '$items.quantity' },
          revenue: { $sum: '$items.subtotal' }
        }
      },
      { $sort: { unitsSold: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          sku: 1,
          unitsSold: 1,
          revenue: 1
        }
      }
    ]);
  }

  /**
   * Get top products by revenue generated
   */
  static async getTopProductsByRevenue(dateFilter, limit = 10) {
    return await Order.aggregate([
      { $match: dateFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.shopItemId',
          name: { $first: '$items.name' },
          sku: { $first: '$items.sku' },
          revenue: { $sum: '$items.subtotal' },
          unitsSold: { $sum: '$items.quantity' }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 1,
          name: 1,
          sku: 1,
          revenue: 1,
          unitsSold: 1
        }
      }
    ]);
  }

  /**
   * Get category performance breakdown
   */
  static async getCategoryPerformance(dateFilter) {
    const results = await Order.aggregate([
      { $match: dateFilter },
      { $unwind: '$items' },
      {
        $lookup: {
          from: 'shopitems',
          localField: 'items.shopItemId',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
      {
        $group: {
          _id: { $ifNull: ['$product.category', 'unknown'] },
          orders: { $sum: 1 },
          revenue: { $sum: '$items.subtotal' },
          unitsSold: { $sum: '$items.quantity' }
        }
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          orders: 1,
          revenue: 1,
          unitsSold: 1,
          avgOrderValue: {
            $cond: [
              { $gt: ['$orders', 0] },
              { $divide: ['$revenue', '$orders'] },
              0
            ]
          }
        }
      },
      { $sort: { revenue: -1 } }
    ]);

    // Calculate total for percentage calculations
    const totalRevenue = results.reduce((sum, cat) => sum + cat.revenue, 0);

    return results.map(cat => ({
      ...cat,
      percentage: totalRevenue > 0 ? Math.round((cat.revenue / totalRevenue) * 100 * 10) / 10 : 0
    }));
  }

  /**
   * Get daily revenue trend for the date range
   */
  static async getRevenueTrend(startDate, endDate) {
    const results = await Order.aggregate([
      {
        $match: {
          placedAt: { $gte: startDate, $lte: endDate },
          status: 'completed'
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$placedAt' }
          },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      {
        $project: {
          _id: 0,
          date: '$_id',
          revenue: 1,
          orders: 1
        }
      }
    ]);

    return results;
  }

  /**
   * Get student participation metrics
   */
  static async getStudentParticipation(startDate, endDate) {
    const results = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $lookup: {
          from: 'orders',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] },
                placedAt: { $gte: startDate, $lte: endDate },
                status: 'completed'
              }
            }
          ],
          as: 'orders'
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          purchased: {
            $sum: {
              $cond: [{ $gt: [{ $size: '$orders' }, 0] }, 1, 0]
            }
          }
        }
      }
    ]);

    const data = results[0] || { total: 0, purchased: 0 };
    const percentage = data.total > 0 ? Math.round((data.purchased / data.total) * 100 * 10) / 10 : 0;

    return {
      total: data.total,
      purchased: data.purchased,
      neverPurchased: data.total - data.purchased,
      percentage
    };
  }

  /**
   * Get stock turnover rate metrics
   */
  static async getStockTurnover(dateFilter) {
    // Get products with their sales velocity
    const productSales = await Order.aggregate([
      { $match: dateFilter },
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.shopItemId',
          totalSold: { $sum: '$items.quantity' },
          orders: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'shopitems',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          productId: '$_id',
          name: '$product.name',
          currentStock: { $ifNull: ['$product.stock', 0] },
          totalSold: 1,
          orders: 1,
          velocity: {
            $cond: [
              { $gt: ['$totalSold', 0] },
              { $divide: ['$totalSold', '$orders'] },
              0
            ]
          }
        }
      },
      { $sort: { velocity: -1 } }
    ]);

    // Calculate average days to sell out (estimation)
    const avgVelocity = productSales.length > 0
      ? productSales.reduce((sum, p) => sum + p.velocity, 0) / productSales.length
      : 0;

    const avgDaysToSellOut = avgVelocity > 0 ? Math.round(30 / avgVelocity) : 0;

    // Identify fast and slow moving products
    const fastMoving = productSales
      .filter(p => p.velocity > avgVelocity * 1.5)
      .slice(0, 5)
      .map(p => ({ productId: p.productId, name: p.name, velocity: Math.round(p.velocity * 10) / 10 }));

    const slowMoving = productSales
      .filter(p => p.velocity < avgVelocity * 0.5 && p.velocity > 0)
      .slice(-5)
      .map(p => ({ productId: p.productId, name: p.name, velocity: Math.round(p.velocity * 10) / 10 }));

    return {
      avgDaysToSellOut,
      avgVelocity: Math.round(avgVelocity * 10) / 10,
      fastMoving,
      slowMoving
    };
  }

  // ============================================================================
  // Sprint5-Story-12: Transaction Reports & Leaderboards
  // ============================================================================

  /**
   * Get student leaderboard (top earners or top spenders)
   * @param {String} type - 'earners' or 'spenders'
   * @param {Number} limit - Number of students to return (default 10)
   * @returns {Array} Leaderboard with rankings
   */
  static async getStudentLeaderboard(type = 'earners', limit = 10) {
    const sortField = type === 'earners' ? 'totalEarned' : 'totalSpent';

    const leaderboard = await Coin.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      { $unwind: '$user' },
      {
        $match: {
          'user.role': 'student' // Only students
        }
      },
      {
        $addFields: {
          // Calculate total earned from transactions
          totalEarned: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$transactions',
                    as: 'txn',
                    cond: { $eq: ['$$txn.type', 'earned'] }
                  }
                },
                as: 'earnedTxn',
                in: '$$earnedTxn.amount'
              }
            }
          },
          // Calculate total spent from transactions
          totalSpent: {
            $sum: {
              $map: {
                input: {
                  $filter: {
                    input: '$transactions',
                    as: 'txn',
                    cond: { $eq: ['$$txn.type', 'spent'] }
                  }
                },
                as: 'spentTxn',
                in: '$$spentTxn.amount'
              }
            }
          },
          // Get last activity date
          lastActivity: {
            $max: '$transactions.createdAt'
          }
        }
      },
      {
        $lookup: {
          from: 'orders',
          localField: 'userId',
          foreignField: 'userId',
          as: 'orders'
        }
      },
      {
        $addFields: {
          purchaseCount: {
            $size: {
              $filter: {
                input: '$orders',
                as: 'order',
                cond: { $eq: ['$$order.status', 'completed'] }
              }
            }
          }
        }
      },
      { $sort: { [sortField]: -1 } },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          userId: '$userId',
          studentName: '$user.name',
          email: '$user.email',
          totalEarned: 1,
          totalSpent: 1,
          currentBalance: '$balance',
          purchaseCount: 1,
          avgOrderValue: {
            $cond: [
              { $gt: ['$purchaseCount', 0] },
              { $divide: ['$totalSpent', '$purchaseCount'] },
              0
            ]
          },
          lastActivity: {
            $ifNull: ['$lastActivity', '$user.createdAt']
          }
        }
      }
    ]);

    // Add rank to each entry
    return leaderboard.map((entry, index) => ({
      rank: index + 1,
      ...entry,
      totalEarned: Math.round(entry.totalEarned * 100) / 100,
      totalSpent: Math.round(entry.totalSpent * 100) / 100,
      currentBalance: Math.round(entry.currentBalance * 100) / 100,
      avgOrderValue: Math.round(entry.avgOrderValue * 100) / 100
    }));
  }

  /**
   * Get students who have never made a purchase
   * @returns {Array} List of students with zero purchases
   */
  static async getZeroPurchaseStudents() {
    const students = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $lookup: {
          from: 'orders',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] },
                status: 'completed'
              }
            }
          ],
          as: 'orders'
        }
      },
      {
        $match: {
          'orders.0': { $exists: false } // No completed orders
        }
      },
      {
        $lookup: {
          from: 'coins',
          localField: '_id',
          foreignField: 'userId',
          as: 'coinData'
        }
      },
      {
        $project: {
          userId: '$_id',
          name: 1,
          email: 1,
          balance: {
            $ifNull: [{ $arrayElemAt: ['$coinData.balance', 0] }, 0]
          },
          lastActivity: {
            $ifNull: [
              { $max: { $arrayElemAt: ['$coinData.transactions.createdAt', 0] } },
              '$createdAt'
            ]
          },
          balagruha: '$additionalInfo.balagruha',
          coach: '$additionalInfo.coach'
        }
      },
      { $sort: { balance: -1 } } // Students with high balances first
    ]);

    return students.map(student => ({
      ...student,
      balance: Math.round(student.balance * 100) / 100
    }));
  }

  /**
   * Get coin economy health metrics
   * @returns {Object} Coin circulation, ratio, warnings
   */
  static async getCoinEconomyHealth() {
    // Get aggregated coin stats
    const coinStats = await Coin.aggregate([
      {
        $group: {
          _id: null,
          totalInCirculation: { $sum: '$balance' },
          totalAccounts: { $sum: 1 }
        }
      }
    ]);

    const stats = coinStats[0] || { totalInCirculation: 0, totalAccounts: 0 };

    // Calculate total earned and spent from all transactions
    const transactionStats = await Coin.aggregate([
      { $unwind: '$transactions' },
      {
        $group: {
          _id: '$transactions.type',
          total: { $sum: '$transactions.amount' }
        }
      }
    ]);

    const earnedData = transactionStats.find(t => t._id === 'earned') || { total: 0 };
    const spentData = transactionStats.find(t => t._id === 'spent') || { total: 0 };

    const totalEarned = earnedData.total;
    const totalSpent = spentData.total;
    const earnedVsSpentRatio = totalSpent > 0 ? totalEarned / totalSpent : 0;
    const avgBalance = stats.totalAccounts > 0 ? stats.totalInCirculation / stats.totalAccounts : 0;

    // Generate warnings based on economy health
    const warnings = [];
    if (earnedVsSpentRatio > 1.5) {
      warnings.push('Earned/Spent ratio is high - consider adding more attractive products or reducing prices');
    }
    if (earnedVsSpentRatio < 0.8) {
      warnings.push('Coins are being spent faster than earned - consider increasing coin rewards');
    }
    if (avgBalance > 500) {
      warnings.push('Average balance is high - students may be hoarding coins');
    }
    if (avgBalance < 50 && stats.totalAccounts > 10) {
      warnings.push('Average balance is low - students may need more earning opportunities');
    }

    // Get circulation trend (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const circulationTrend = await Coin.aggregate([
      { $unwind: '$transactions' },
      {
        $match: {
          'transactions.createdAt': { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: {
              $dateToString: { format: '%Y-%m-%d', date: '$transactions.createdAt' }
            },
            type: '$transactions.type'
          },
          amount: { $sum: '$transactions.amount' }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    // Format circulation trend
    const trendMap = {};
    circulationTrend.forEach(item => {
      if (!trendMap[item._id.date]) {
        trendMap[item._id.date] = { date: item._id.date, earned: 0, spent: 0 };
      }
      if (item._id.type === 'earned') {
        trendMap[item._id.date].earned = item.amount;
      } else if (item._id.type === 'spent') {
        trendMap[item._id.date].spent = item.amount;
      }
    });

    const circulationTrendArray = Object.values(trendMap);

    return {
      totalInCirculation: Math.round(stats.totalInCirculation * 100) / 100,
      totalEarned: Math.round(totalEarned * 100) / 100,
      totalSpent: Math.round(totalSpent * 100) / 100,
      earnedVsSpentRatio: Math.round(earnedVsSpentRatio * 100) / 100,
      avgBalance: Math.round(avgBalance * 100) / 100,
      totalAccounts: stats.totalAccounts,
      warnings,
      circulationTrend: circulationTrendArray
    };
  }

  /**
   * Get detailed transaction log with filters and pagination
   * @param {Object} filters - { startDate, endDate, studentId, status }
   * @param {Number} page - Page number
   * @param {Number} limit - Items per page
   * @returns {Object} Transactions with pagination
   */
  static async getTransactionLog(filters = {}, page = 1, limit = 20) {
    const skip = (page - 1) * limit;

    // Build query
    const query = {};

    if (filters.startDate || filters.endDate) {
      query.placedAt = {};
      if (filters.startDate) query.placedAt.$gte = new Date(filters.startDate);
      if (filters.endDate) query.placedAt.$lte = new Date(filters.endDate);
    }

    if (filters.studentId) {
      query.userId = filters.studentId;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    const [transactions, total] = await Promise.all([
      Order.find(query)
        .populate('userId', 'name email userId')
        .sort({ placedAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Order.countDocuments(query)
    ]);

    return {
      transactions: transactions.map(t => ({
        orderNumber: t.orderNumber,
        orderId: t._id,
        studentName: t.userId?.name || 'Unknown',
        studentEmail: t.userId?.email || '',
        studentId: t.userId?._id || t.userId,
        date: t.placedAt,
        totalAmount: Math.round(t.totalAmount * 100) / 100,
        itemCount: t.items.reduce((sum, item) => sum + item.quantity, 0),
        status: t.status
      })),
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  /**
   * Get student participation details for export
   * @param {Date} startDate - Start date
   * @param {Date} endDate - End date
   * @returns {Object} Detailed student participation data
   */
  static async getStudentParticipationDetails(startDate, endDate) {
    const defaultStart = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const defaultEnd = new Date();

    const start = startDate || defaultStart;
    const end = endDate || defaultEnd;

    const students = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $lookup: {
          from: 'orders',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$userId', '$$userId'] },
                placedAt: { $gte: start, $lte: end },
                status: 'completed'
              }
            }
          ],
          as: 'orders'
        }
      },
      {
        $lookup: {
          from: 'coins',
          localField: '_id',
          foreignField: 'userId',
          as: 'coinData'
        }
      },
      {
        $project: {
          userId: '$_id',
          name: 1,
          email: 1,
          hasPurchased: { $gt: [{ $size: '$orders' }, 0] },
          purchaseCount: { $size: '$orders' },
          totalSpent: { $sum: '$orders.totalAmount' },
          balance: {
            $ifNull: [{ $arrayElemAt: ['$coinData.balance', 0] }, 0]
          },
          lastPurchase: { $max: '$orders.placedAt' }
        }
      },
      { $sort: { totalSpent: -1 } }
    ]);

    return {
      students: students.map(s => ({
        ...s,
        totalSpent: Math.round(s.totalSpent * 100) / 100,
        balance: Math.round(s.balance * 100) / 100
      })),
      summary: {
        total: students.length,
        purchased: students.filter(s => s.hasPurchased).length,
        neverPurchased: students.filter(s => !s.hasPurchased).length,
        participationRate: students.length > 0
          ? Math.round((students.filter(s => s.hasPurchased).length / students.length) * 100 * 10) / 10
          : 0
      }
    };
  }
}

module.exports = AnalyticsService;
