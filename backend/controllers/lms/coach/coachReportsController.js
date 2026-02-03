const User = require('../../../models/user');
const StudentProgress = require('../../../models/StudentProgress');
const Coin = require('../../../models/coin');
const mongoose = require('mongoose');

/**
 * Coach Reports Controller - Epic 03 Story 04
 * Handles analytics and reporting for coaches
 */

/**
 * @desc Get overview stats for coach dashboard
 * @route GET /api/v2/lms/coach/reports/overview
 * @access Private (Coach)
 */
exports.getOverviewStats = async (req, res) => {
    try {
        // Assuming coach has associated Balagruha or Students.
        // For MVP, we might fetch ALL students or filtering by Coach's Balagruha.
        // Let's assume req.user.balagruhaId exists or we query all users where role='student'.

        const studentsCount = await User.countDocuments({ role: 'student' });

        // Calculate total coins distributed by this coach
        const coachId = req.user._id;
        const coinsDistributedAgg = await Coin.aggregate([
            { $unwind: "$transactions" },
            { $match: { "transactions.metadata.awardedBy": coachId } },
            { $group: { _id: null, total: { $sum: "$transactions.amount" } } }
        ]);
        const totalCoinsDistributed = coinsDistributedAgg[0]?.total || 0;

        // Active Courses Count (Assignments)
        // const Assignment = require('../../models/Assignment');
        // const activeAssignments = await Assignment.countDocuments({ assignedBy: coachId, status: 'active' });

        // Basic engagement metrics from StudentProgress
        const completions = await StudentProgress.aggregate([
            { $unwind: "$completedItems" },
            { $count: "totalCompletions" }
        ]);
        const totalActivitiesCompleted = completions[0]?.totalCompletions || 0;

        res.json({
            success: true,
            stats: {
                totalStudents: studentsCount,
                totalCoinsAwarded: totalCoinsDistributed,
                // activeAssignments,
                totalActivitiesCompleted
            }
        });

    } catch (error) {
        console.error('Coach Overview Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching stats',
            error: error.message
        });
    }
};

/**
 * @desc Get Student Leaderboard
 * @route GET /api/v2/lms/coach/reports/leaderboard
 * @access Private (Coach)
 */
exports.getLeaderboard = async (req, res) => {
    try {
        const { limit = 10, period = 'weekly' } = req.query;

        // Leverage Coin model's method
        const leaderboard = await Coin.getTopEarners(parseInt(limit), period);

        res.json({
            success: true,
            period,
            leaderboard
        });

    } catch (error) {
        console.error('Leaderboard Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error fetching leaderboard',
            error: error.message
        });
    }
};
