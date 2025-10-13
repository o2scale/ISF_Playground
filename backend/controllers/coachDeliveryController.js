/**
 * Coach Delivery Controller - Sprint5-Story-13
 * Handles coach delivery management functionality
 *
 * Features:
 * - Get pending deliveries for coach's Balagruha(s)
 * - Mark orders as delivered with authorization check
 * - Get delivery statistics
 * - On-demand confirmation of orders (after 5-minute window)
 */

const Order = require('../models/order');
const User = require('../models/user');
const Balagruha = require('../models/balagruha');
const Notification = require('../models/notification');

/**
 * Get pending deliveries for coach (with on-demand confirmation)
 * GET /api/v2/shop/coach/deliveries
 *
 * Query params:
 * - balagruhaId: Filter by specific Balagruha (optional)
 * - status: Filter by delivery status (default: 'pending_delivery')
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 20)
 */
exports.getCoachDeliveries = async (req, res) => {
  try {
    const coachId = req.user._id;
    const { balagruhaId, status, page = 1, limit = 20 } = req.query;

    // 1. Check and confirm any orders ready for delivery
    await Order.checkAndConfirmOrders();

    // 2. Get coach's balagruhaIds
    const coach = await User.findById(coachId).select('balagruhaIds name');
    if (!coach || !coach.balagruhaIds || coach.balagruhaIds.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No Balagruhas assigned to this coach'
      });
    }

    // 3. Filter by specific Balagruha if provided
    const balagruhaIds = balagruhaId ? [balagruhaId] : coach.balagruhaIds;

    // 4. Find students in these Balagruhas
    const students = await User.find({
      role: 'student',
      balagruhaIds: { $in: balagruhaIds }
    }).select('_id name balagruhaIds');

    const studentIds = students.map(s => s._id);

    if (studentIds.length === 0) {
      return res.json({
        success: true,
        orders: [],
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: 0,
          pages: 0
        }
      });
    }

    // 5. Build query
    const orderQuery = {
      userId: { $in: studentIds },
      status: 'completed',
      deliveryStatus: status || 'pending_delivery'
    };

    // 6. Get orders with pagination
    const skip = (page - 1) * limit;
    const [orders, total] = await Promise.all([
      Order.find(orderQuery)
        .populate('userId', 'name userId balagruhaIds')
        .populate('items.shopItemId', 'name sku imageUrl')
        .sort({ placedAt: 1 })  // Oldest first
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Order.countDocuments(orderQuery)
    ]);

    // 7. Enrich with Balagruha names
    const enrichedOrders = await Promise.all(
      orders.map(async (order) => {
        const student = students.find(s => s._id.toString() === order.userId._id.toString());
        if (!student) {
          return { ...order, balagruhaNames: '' };
        }

        const balagruhas = await Balagruha.find({
          _id: { $in: student.balagruhaIds }
        }).select('name');

        return {
          ...order,
          balagruhaNames: balagruhas.map(b => b.name).join(', ')
        };
      })
    );

    res.json({
      success: true,
      orders: enrichedOrders,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching coach deliveries:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Mark order as delivered
 * PATCH /api/v2/shop/coach/deliveries/:orderId/deliver
 *
 * Body:
 * - deliveryNotes: Optional notes about delivery (max 500 chars)
 */
exports.markOrderDelivered = async (req, res) => {
  try {
    const { orderId } = req.params;
    const coachId = req.user._id;
    const { deliveryNotes } = req.body;

    // Validate deliveryNotes length
    if (deliveryNotes && deliveryNotes.length > 500) {
      return res.status(400).json({
        success: false,
        error: 'Delivery notes must be 500 characters or less'
      });
    }

    // 1. Find order
    const order = await Order.findById(orderId).populate('userId', 'name balagruhaIds');
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found'
      });
    }

    // 2. Validate status
    if (order.deliveryStatus !== 'pending_delivery') {
      return res.status(400).json({
        success: false,
        error: 'Order is not pending delivery',
        currentStatus: order.deliveryStatus
      });
    }

    // 3. Verify coach authorization (must be assigned to student's Balagruha)
    const coach = await User.findById(coachId).select('balagruhaIds name');
    if (!coach) {
      return res.status(404).json({
        success: false,
        error: 'Coach not found'
      });
    }

    const studentBalagruhas = order.userId.balagruhaIds.map(id => id.toString());
    const coachBalagruhas = coach.balagruhaIds.map(id => id.toString());

    const hasAccess = studentBalagruhas.some(sb => coachBalagruhas.includes(sb));

    if (!hasAccess) {
      return res.status(403).json({
        success: false,
        error: 'You are not authorized to deliver orders for this student\'s Balagruha'
      });
    }

    // 4. Update order
    order.deliveryStatus = 'delivered';
    order.deliveredAt = new Date();
    order.deliveredBy = coachId;
    order.deliveryNotes = deliveryNotes || '';

    await order.save();

    // 5. Notify student (async, don't block response)
    Notification.createPersonal(
      order.userId._id,
      'Order Delivered',
      `Your order ${order.orderNumber} has been delivered by Coach ${coach.name}!`,
      'ISF_SHOP_UPDATE',
      {
        orderId: order._id,
        orderNumber: order.orderNumber,
        actionUrl: `/shop/orders/${order._id}`
      }
    ).catch(err => {
      console.error(`Failed to notify student about delivery:`, err);
    });

    res.json({
      success: true,
      message: 'Order marked as delivered successfully',
      order: {
        _id: order._id,
        orderNumber: order.orderNumber,
        deliveryStatus: order.deliveryStatus,
        deliveredAt: order.deliveredAt,
        deliveredBy: coach.name,
        deliveryNotes: order.deliveryNotes
      }
    });

  } catch (error) {
    console.error('Error marking order as delivered:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

/**
 * Get delivery statistics for coach
 * GET /api/v2/shop/coach/deliveries/stats
 *
 * Returns:
 * - pendingCount: Number of pending deliveries
 * - deliveredToday: Number delivered by coach today
 * - deliveredThisWeek: Number delivered by coach this week
 * - totalDelivered: Total delivered by coach all-time
 */
exports.getCoachDeliveryStats = async (req, res) => {
  try {
    const coachId = req.user._id;

    // Check and confirm orders first (updates pending counts)
    await Order.checkAndConfirmOrders();

    // Get coach's balagruhaIds
    const coach = await User.findById(coachId).select('balagruhaIds');
    if (!coach || !coach.balagruhaIds || coach.balagruhaIds.length === 0) {
      return res.json({
        success: true,
        pendingCount: 0,
        deliveredToday: 0,
        deliveredThisWeek: 0,
        totalDelivered: 0
      });
    }

    // Find students in coach's Balagruhas
    const students = await User.find({
      role: 'student',
      balagruhaIds: { $in: coach.balagruhaIds }
    }).select('_id');

    const studentIds = students.map(s => s._id);

    if (studentIds.length === 0) {
      return res.json({
        success: true,
        pendingCount: 0,
        deliveredToday: 0,
        deliveredThisWeek: 0,
        totalDelivered: 0
      });
    }

    // Calculate date ranges
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)

    // Get stats in parallel
    const [pendingCount, deliveredToday, deliveredThisWeek, totalDelivered] = await Promise.all([
      // Pending deliveries
      Order.countDocuments({
        userId: { $in: studentIds },
        status: 'completed',
        deliveryStatus: 'pending_delivery'
      }),
      // Delivered today by this coach
      Order.countDocuments({
        userId: { $in: studentIds },
        deliveryStatus: 'delivered',
        deliveredAt: { $gte: today },
        deliveredBy: coachId
      }),
      // Delivered this week by this coach
      Order.countDocuments({
        userId: { $in: studentIds },
        deliveryStatus: 'delivered',
        deliveredAt: { $gte: weekStart },
        deliveredBy: coachId
      }),
      // Total delivered by this coach (all-time)
      Order.countDocuments({
        userId: { $in: studentIds },
        deliveryStatus: 'delivered',
        deliveredBy: coachId
      })
    ]);

    res.json({
      success: true,
      pendingCount,
      deliveredToday,
      deliveredThisWeek,
      totalDelivered
    });

  } catch (error) {
    console.error('Error fetching delivery stats:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = exports;
