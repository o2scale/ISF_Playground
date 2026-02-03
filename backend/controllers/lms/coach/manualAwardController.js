const Coin = require('../../../models/coin');
const User = require('../../../models/user');

/**
 * Manual Award Controller - Epic 03 Story 03
 * Handles manual coin awards by coaches/admins
 */

/**
 * @desc Award coins to student(s) manually
 * @route POST /api/v2/lms/coach/awards
 * @access Private (Coach/Admin)
 */
exports.awardCoins = async (req, res) => {
    try {
        const { studentIds, amount, reason, category } = req.body;
        const coachId = req.user._id;

        if (!studentIds || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).json({ success: false, message: 'Student IDs array is required' });
        }
        if (!amount || amount <= 0) {
            return res.status(400).json({ success: false, message: 'Valid positive amount is required' });
        }
        if (!reason) {
            return res.status(400).json({ success: false, message: 'Reason for award is required' });
        }

        const results = [];
        const errors = [];

        // Process awards in parallel promises (or sequential if consistency is critical, parallel is fine here)
        await Promise.all(studentIds.map(async (studentId) => {
            try {
                const student = await User.findById(studentId);
                if (!student) {
                    errors.push({ studentId, message: 'Student not found' });
                    return;
                }

                // Use Coin model static method or instance method
                const coinRecord = await Coin.findOrCreateForUser(studentId);

                const metadata = {
                    awardedBy: coachId,
                    awardType: 'manual',
                    reason: reason
                };

                // Source = 'general' (or specific category if supported)
                // Description = reason
                await coinRecord.addCoins(
                    amount,
                    'earned',
                    reason,
                    category || 'general',
                    metadata
                );

                results.push({ studentId, name: student.name, amount });
            } catch (err) {
                console.error(`Error awarding coins to ${studentId}:`, err);
                errors.push({ studentId, message: err.message });
            }
        }));

        res.json({
            success: true,
            message: `Coins awarded to ${results.length} students.`,
            results,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (error) {
        console.error('Manual Award Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while awarding coins',
            error: error.message
        });
    }
};

/**
 * @desc Get award history for the logged-in coach
 * @route GET /api/v2/lms/coach/awards/history
 * @access Private (Coach)
 */
exports.getAwardHistory = async (req, res) => {
    try {
        const coachId = req.user._id;

        // We need to query Coins collections where transactions have metadata.awardedBy == coachId
        // Since Transactions are embedded, we use aggregate or simple find.
        // Aggregate is best to unwind.

        const history = await Coin.aggregate([
            { $match: { "transactions.metadata.awardedBy": coachId } },
            { $unwind: "$transactions" },
            { $match: { "transactions.metadata.awardedBy": coachId } },
            { $sort: { "transactions.createdAt": -1 } },
            { $limit: 100 }, // Recent 100 awards
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "student"
                }
            },
            { $unwind: "$student" },
            {
                $project: {
                    _id: 0,
                    transactionId: "$transactions._id",
                    studentId: "$student._id",
                    studentName: "$student.name",
                    amount: "$transactions.amount",
                    reason: "$transactions.description",
                    category: "$transactions.source",
                    awardedAt: "$transactions.createdAt"
                }
            }
        ]);

        res.json({
            success: true,
            count: history.length,
            history
        });

    } catch (error) {
        console.error('Get Award History Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching award history',
            error: error.message
        });
    }
};
