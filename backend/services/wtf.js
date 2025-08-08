const { errorLogger } = require("../config/pino-config");
const { default: mongoose } = require("mongoose");
const CoinService = require("./coin");
const wtfWebSocketService = require("./wtfWebSocket");

// Import data access methods
const {
  createWtfPin,
  getActivePins,
  getWtfPinById,
  updateWtfPin,
  deleteWtfPin,
  updatePinStatus,
  getPinsByAuthor,
  getExpiredPins,
  getPinsForFifoManagement,
  updateEngagementMetrics,
  getPinAnalytics,
  getWtfAnalytics,
  bulkUpdatePinStatus,
} = require("../data-access/wtfPin");

const { getSubmissionsForReview } = require("../data-access/wtfSubmission");

const {
  createInteraction,
  getInteractionById,
  getStudentPinInteractions,
  hasStudentInteracted,
  getPinInteractionCounts,
  getStudentInteractionHistory,
  getRecentInteractions,
  deleteInteraction,
  updateInteraction,
  getInteractionAnalytics,
  bulkCreateInteractions,
  getTopPerformingPins,
} = require("../data-access/wtfStudentInteraction");

const {
  createWtfSubmission,
  getWtfSubmissionById,
  getPendingSubmissions,
  getStudentSubmissions,
  updateWtfSubmission,
  deleteWtfSubmission,
  approveSubmission,
  rejectSubmission,
  archiveSubmission,
  getSubmissionsByType,
  getSubmissionStats,
  getRecentSubmissions,
  getSubmissionAnalytics,
  bulkUpdateSubmissionStatus,
  getSubmissionsNeedingReview,
} = require("../data-access/wtfSubmission");

class WtfService {
  constructor(obj = {}) {
    this.title = obj.title || "";
    this.content = obj.content || "";
    this.type = obj.type || "";
    this.author = obj.author || null;
    this.status = obj.status || "active";
    this.isOfficial = obj.isOfficial || false;
    this.language = obj.language || "english";
    this.tags = obj.tags || [];
  }

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      type: this.type,
      author: this.author,
      status: this.status,
      isOfficial: this.isOfficial,
      language: this.language,
      tags: this.tags,
    };
  }

  // ==================== PIN MANAGEMENT ====================

  static async createPin(payload) {
    try {
      // Validate required fields
      if (
        !payload.title ||
        !payload.content ||
        !payload.type ||
        !payload.author
      ) {
        return {
          success: false,
          data: null,
          message: "Missing required fields: title, content, type, author",
        };
      }

      // Validate pin type
      const validTypes = ["image", "video", "audio", "text", "link"];
      if (!validTypes.includes(payload.type)) {
        return {
          success: false,
          data: null,
          message:
            "Invalid pin type. Must be one of: image, video, audio, text, link",
        };
      }

      // Set default values
      const pinData = {
        ...payload,
        status: payload.status || "active",
        isOfficial: payload.isOfficial || false,
        language: payload.language || "english",
        expiresAt:
          payload.expiresAt || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      };

      const result = await createWtfPin(pinData);

      if (result.success) {
        // Update engagement metrics for the new pin
        await updateEngagementMetrics(result.data._id, {
          "engagementMetrics.likes": 0,
          "engagementMetrics.seen": 0,
          "engagementMetrics.shares": 0,
        });

        // Award coins for pin creation
        try {
          const isFirstPin = await CoinService.isEligibleForFirstPinBonus(
            payload.author
          );
          const coinResult = await CoinService.awardPinCreationCoins(
            payload.author,
            result.data._id,
            isFirstPin,
            {
              userAgent: payload.userAgent,
              ipAddress: payload.ipAddress,
            }
          );

          // Add coin information to response
          result.data.coinAward = coinResult.data;
        } catch (coinError) {
          errorLogger.error(
            {
              userId: payload.author,
              pinId: result.data._id,
              error: coinError.message,
            },
            "Error awarding coins for pin creation"
          );
          // Don't fail the pin creation if coin awarding fails
        }

        // Trigger real-time event
        try {
          wtfWebSocketService.handlePinCreated(result.data);
        } catch (wsError) {
          errorLogger.error(
            { pinId: result.data._id, error: wsError.message },
            "Error triggering WebSocket pin created event"
          );
        }

        return {
          success: true,
          data: result.data,
          message: "WTF Pin created successfully",
        };
      }

      return result;
    } catch (error) {
      errorLogger.error({ error: error.message }, "Error in createPin service");
      throw error;
    }
  }

  static async getActivePinsForStudents({
    page = 1,
    limit = 20,
    type = null,
    isOfficial = null,
  }) {
    try {
      const result = await getActivePins({ page, limit, type, isOfficial });

      if (result.success) {
        return {
          success: true,
          data: result.data,
          message: "Active pins fetched successfully",
        };
      }

      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getActivePinsForStudents service"
      );
      throw error;
    }
  }

  static async getPinById(pinId) {
    try {
      if (!pinId) {
        return {
          success: false,
          data: null,
          message: "Pin ID is required",
        };
      }

      const result = await getWtfPinById(pinId);
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getPinById service"
      );
      throw error;
    }
  }

  static async updatePin(pinId, updateData) {
    try {
      if (!pinId) {
        return {
          success: false,
          data: null,
          message: "Pin ID is required",
        };
      }

      const result = await updateWtfPin(pinId, updateData);
      return result;
    } catch (error) {
      errorLogger.error({ error: error.message }, "Error in updatePin service");
      throw error;
    }
  }

  static async deletePin(pinId) {
    try {
      if (!pinId) {
        return {
          success: false,
          data: null,
          message: "Pin ID is required",
        };
      }

      const result = await deleteWtfPin(pinId);
      return result;
    } catch (error) {
      errorLogger.error({ error: error.message }, "Error in deletePin service");
      throw error;
    }
  }

  static async changePinStatus(pinId, status) {
    try {
      if (!pinId || !status) {
        return {
          success: false,
          data: null,
          message: "Pin ID and status are required",
        };
      }

      const validStatuses = ["active", "unpinned", "archived"];
      if (!validStatuses.includes(status)) {
        return {
          success: false,
          data: null,
          message: "Invalid status. Must be one of: active, unpinned, archived",
        };
      }

      const result = await updatePinStatus(pinId, status);
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in changePinStatus service"
      );
      throw error;
    }
  }

  // ==================== INTERACTION MANAGEMENT ====================

  static async likePin(studentId, pinId, likeType = "thumbs_up") {
    try {
      if (!studentId || !pinId) {
        return {
          success: false,
          data: null,
          message: "Student ID and Pin ID are required",
        };
      }

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(studentId)) {
        return {
          success: false,
          data: null,
          message: "Invalid student ID format",
        };
      }

      if (!mongoose.Types.ObjectId.isValid(pinId)) {
        return {
          success: false,
          data: null,
          message: "Invalid pin ID format",
        };
      }

      // Check if pin exists and is active
      const pinResult = await getWtfPinById(pinId);
      if (!pinResult.success) {
        return {
          success: false,
          data: null,
          message: "Pin not found or not active",
        };
      }

      // Check if student already liked this pin
      const hasLiked = await hasStudentInteracted(studentId, pinId, "like");
      if (hasLiked.data.hasInteracted) {
        // Unlike: delete the interaction
        const deleteResult = await deleteInteraction(studentId, pinId, "like");
        if (deleteResult.success) {
          // Update engagement metrics
          await updateEngagementMetrics(pinId, {
            "engagementMetrics.likes": -1,
          });
          return {
            success: true,
            data: { action: "unliked", likeType: null },
            message: "Pin unliked successfully",
          };
        }
        return deleteResult;
      }

      // Like: create new interaction
      const interactionData = {
        studentId: new mongoose.Types.ObjectId(studentId),
        pinId: new mongoose.Types.ObjectId(pinId),
        type: "like",
        likeType: likeType,
      };

      const result = await createInteraction(interactionData);
      if (result.success) {
        // Update engagement metrics
        await updateEngagementMetrics(pinId, { "engagementMetrics.likes": 1 });

        // Award coins for interaction (with daily limit)
        try {
          const coinResult = await CoinService.awardInteractionCoins(
            studentId,
            result.data._id,
            {
              pinId: pinId,
              likeType: likeType,
              userAgent: metadata?.userAgent,
              ipAddress: metadata?.ipAddress,
            }
          );

          // Add coin information to response if coins were awarded
          if (coinResult.success) {
            result.data.coinAward = coinResult.data;
          }
        } catch (coinError) {
          errorLogger.error(
            { studentId, pinId, error: coinError.message },
            "Error awarding coins for interaction"
          );
          // Don't fail the interaction if coin awarding fails
        }

        // Trigger real-time event
        try {
          wtfWebSocketService.handlePinLiked(pinId, studentId, {
            likeType,
            interactionId: result.data._id,
          });
        } catch (wsError) {
          errorLogger.error(
            { pinId, studentId, error: wsError.message },
            "Error triggering WebSocket pin liked event"
          );
        }

        return {
          success: true,
          data: { action: "liked", likeType, ...result.data },
          message: "Pin liked successfully",
        };
      }

      return result;
    } catch (error) {
      errorLogger.error({ error: error.message }, "Error in likePin service");
      throw error;
    }
  }

  static async markPinAsSeen(studentId, pinId, viewDuration = 0) {
    try {
      if (!studentId || !pinId) {
        return {
          success: false,
          data: null,
          message: "Student ID and Pin ID are required",
        };
      }

      // Check if pin exists and is active
      const pinResult = await getWtfPinById(pinId);
      if (!pinResult.success) {
        return {
          success: false,
          data: null,
          message: "Pin not found or not active",
        };
      }

      // Check if student already marked this pin as seen
      const hasSeen = await hasStudentInteracted(studentId, pinId, "seen");
      if (hasSeen.data.hasInteracted) {
        // Update existing seen interaction with new duration
        const interactions = await getStudentPinInteractions(studentId, pinId);
        const seenInteraction = interactions.data.find(
          (i) => i.type === "seen"
        );
        if (seenInteraction) {
          const updateResult = await updateInteraction(seenInteraction._id, {
            viewDuration: Math.max(
              seenInteraction.viewDuration || 0,
              viewDuration
            ),
          });
          return {
            success: true,
            data: { action: "updated", viewDuration },
            message: "Pin seen duration updated",
          };
        }
      }

      // Mark as seen: create new interaction
      const interactionData = {
        studentId: new mongoose.Types.ObjectId(studentId),
        pinId: new mongoose.Types.ObjectId(pinId),
        type: "seen",
        viewDuration: viewDuration,
      };

      const result = await createInteraction(interactionData);
      if (result.success) {
        // Update engagement metrics
        await updateEngagementMetrics(pinId, { "engagementMetrics.seen": 1 });
        // Trigger real-time event
        try {
          wtfWebSocketService.handlePinSeen(pinId, studentId, {
            viewDuration,
            interactionId: result.data._id,
          });
        } catch (wsError) {
          errorLogger.error(
            { pinId, studentId, error: wsError.message },
            "Error triggering WebSocket pin seen event"
          );
        }

        return {
          success: true,
          data: { action: "seen", viewDuration },
          message: "Pin marked as seen successfully",
        };
      }

      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in markPinAsSeen service"
      );
      throw error;
    }
  }

  static async getPinInteractions(pinId) {
    try {
      if (!pinId) {
        return {
          success: false,
          data: null,
          message: "Pin ID is required",
        };
      }

      const result = await getPinInteractionCounts(pinId);
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getPinInteractions service"
      );
      throw error;
    }
  }

  // ==================== SUBMISSION MANAGEMENT ====================

  static async submitVoiceNote(studentId, payload) {
    try {
      if (!studentId) {
        return {
          success: false,
          data: null,
          message: "Student ID is required",
        };
      }

      const submissionData = {
        studentId: new mongoose.Types.ObjectId(studentId),
        type: "voice",
        title: payload.title,
        audioUrl: payload.audioUrl,
        audioDuration: payload.audioDuration,
        audioTranscription: payload.audioTranscription,
        tags: payload.tags || [],
        isDraft: payload.isDraft || false,
        metadata: {
          fileSize: payload.fileSize,
          recordingQuality: payload.recordingQuality,
          userAgent: payload.userAgent,
          ipAddress: payload.ipAddress,
        },
      };

      const result = await createWtfSubmission(submissionData);

      // Trigger real-time event
      if (result.success) {
        try {
          wtfWebSocketService.handleSubmissionCreated(result.data);
        } catch (wsError) {
          errorLogger.error(
            { submissionId: result.data._id, error: wsError.message },
            "Error triggering WebSocket submission created event"
          );
        }
      }

      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in submitVoiceNote service"
      );
      throw error;
    }
  }

  static async submitArticle(studentId, payload) {
    try {
      if (!studentId) {
        return {
          success: false,
          data: null,
          message: "Student ID is required",
        };
      }

      const submissionData = {
        studentId: new mongoose.Types.ObjectId(studentId),
        type: "article",
        title: payload.title,
        content: payload.content,
        language: payload.language || "english",
        tags: payload.tags || [],
        isDraft: payload.isDraft || false,
        metadata: {
          userAgent: payload.userAgent,
          ipAddress: payload.ipAddress,
        },
      };

      const result = await createWtfSubmission(submissionData);

      // Trigger real-time event
      if (result.success) {
        try {
          wtfWebSocketService.handleSubmissionCreated(result.data);
        } catch (wsError) {
          errorLogger.error(
            { submissionId: result.data._id, error: wsError.message },
            "Error triggering WebSocket submission created event"
          );
        }
      }

      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in submitArticle service"
      );
      throw error;
    }
  }

  static async getSubmissionsForReview({ page = 1, limit = 20, type = null }) {
    try {
      const result = await getPendingSubmissions({ page, limit, type });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getSubmissionsForReview service"
      );
      throw error;
    }
  }

  static async reviewSubmission(submissionId, reviewerId, action, notes = "") {
    try {
      if (!submissionId || !reviewerId || !action) {
        return {
          success: false,
          data: null,
          message: "Submission ID, reviewer ID, and action are required",
        };
      }

      const validActions = ["approve", "reject"];
      if (!validActions.includes(action)) {
        return {
          success: false,
          data: null,
          message: "Invalid action. Must be 'approve' or 'reject'",
        };
      }

      let result;
      if (action === "approve") {
        result = await approveSubmission(submissionId, reviewerId, notes);

        // Award coins for submission approval
        if (result.success) {
          try {
            const coinResult = await CoinService.awardSubmissionApprovalCoins(
              result.data.studentId,
              submissionId,
              {
                reviewerId: reviewerId,
                notes: notes,
              }
            );

            // Add coin information to response
            result.data.coinAward = coinResult.data;
          } catch (coinError) {
            errorLogger.error(
              { submissionId, reviewerId, error: coinError.message },
              "Error awarding coins for submission approval"
            );
            // Don't fail the approval if coin awarding fails
          }
        }
      } else {
        result = await rejectSubmission(submissionId, reviewerId, notes);
      }

      // Trigger real-time event
      if (result.success) {
        try {
          wtfWebSocketService.handleSubmissionReviewed(submissionId, {
            action,
            reviewerId,
            notes,
            result: result.data,
          });
        } catch (wsError) {
          errorLogger.error(
            { submissionId, error: wsError.message },
            "Error triggering WebSocket submission reviewed event"
          );
        }
      }

      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in reviewSubmission service"
      );
      throw error;
    }
  }

  // ==================== LIFECYCLE MANAGEMENT ====================

  static async managePinLifecycle() {
    try {
      // Get expired pins
      const expiredPins = await getExpiredPins();
      if (expiredPins.success && expiredPins.data.length > 0) {
        const expiredPinIds = expiredPins.data.map((pin) => pin._id);
        await bulkUpdatePinStatus(expiredPinIds, "unpinned");

        errorLogger.info(
          { expiredPinsCount: expiredPins.data.length },
          "Expired pins unpinned successfully"
        );
      }

      // Get pins for FIFO management
      const fifoPins = await getPinsForFifoManagement();
      if (fifoPins.success && fifoPins.data.length > 0) {
        const fifoPinIds = fifoPins.data.map((pin) => pin._id);
        await bulkUpdatePinStatus(fifoPinIds, "unpinned");

        errorLogger.info(
          { fifoPinsCount: fifoPins.data.length },
          "FIFO management completed successfully"
        );
      }

      return {
        success: true,
        data: {
          expiredPinsCount: expiredPins.data.length,
          fifoPinsCount: fifoPins.data.length,
        },
        message: "Pin lifecycle management completed",
      };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in managePinLifecycle service"
      );
      throw error;
    }
  }

  // Get expired pins (for scheduler)
  static async getExpiredPins() {
    try {
      const result = await getExpiredPins();
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getExpiredPins service"
      );
      throw error;
    }
  }

  // Get pins for FIFO management (for scheduler)
  static async getPinsForFifoManagement() {
    try {
      const result = await getPinsForFifoManagement();
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getPinsForFifoManagement service"
      );
      throw error;
    }
  }

  // ==================== ANALYTICS ====================

  static async getWtfAnalytics() {
    try {
      const result = await getWtfAnalytics();
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getWtfAnalytics service"
      );
      throw error;
    }
  }

  static async getInteractionAnalytics({ days = 7, type = null }) {
    try {
      const result = await getInteractionAnalytics({ days, type });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getInteractionAnalytics service"
      );
      throw error;
    }
  }

  static async getSubmissionAnalytics({ days = 30, type = null }) {
    try {
      const result = await getSubmissionAnalytics({ days, type });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getSubmissionAnalytics service"
      );
      throw error;
    }
  }

  static async getTopPerformingPins({ limit = 10, type = null, days = 30 }) {
    try {
      const result = await getTopPerformingPins({ limit, type, days });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getTopPerformingPins service"
      );
      throw error;
    }
  }

  // ==================== STUDENT MANAGEMENT ====================

  static async getStudentSubmissions(
    studentId,
    { page = 1, limit = 20, status = null, type = null }
  ) {
    try {
      if (!studentId) {
        return {
          success: false,
          data: null,
          message: "Student ID is required",
        };
      }

      const result = await getStudentSubmissions(studentId, {
        page,
        limit,
        status,
        type,
      });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getStudentSubmissions service"
      );
      throw error;
    }
  }

  static async getStudentInteractionHistory(
    studentId,
    { page = 1, limit = 50, type = null }
  ) {
    try {
      if (!studentId) {
        return {
          success: false,
          data: null,
          message: "Student ID is required",
        };
      }

      const result = await getStudentInteractionHistory(studentId, {
        page,
        limit,
        type,
      });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getStudentInteractionHistory service"
      );
      throw error;
    }
  }

  // ==================== ADMIN MANAGEMENT ====================

  static async getPinsByAuthor(
    authorId,
    { page = 1, limit = 20, status = null }
  ) {
    try {
      if (!authorId) {
        return {
          success: false,
          data: null,
          message: "Author ID is required",
        };
      }

      const result = await getPinsByAuthor(authorId, { page, limit, status });
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getPinsByAuthor service"
      );
      throw error;
    }
  }

  static async getSubmissionStats() {
    try {
      const result = await getSubmissionStats();
      return result;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getSubmissionStats service"
      );
      throw error;
    }
  }

  // ==================== DASHBOARD METRICS ====================

  static async getWtfDashboardMetrics() {
    try {
      // Get all the metrics needed for dashboard
      const [activePinsCount, submissionStats, analytics] = await Promise.all([
        this.getActivePinsCount(),
        this.getSubmissionStats(),
        this.getWtfAnalytics(),
      ]);

      const dashboardMetrics = {
        activePins: activePinsCount?.data || 0,
        coachSuggestions: submissionStats?.data?.pendingCount || 0,
        studentSubmissions: submissionStats?.data?.newCount || 0,
        totalEngagement:
          analytics?.data?.totalViews || analytics?.data?.totalSeen || 0,
        pendingSuggestions: submissionStats?.data?.pendingCount || 0,
        newSubmissions: submissionStats?.data?.newCount || 0,
        reviewQueueCount: submissionStats?.data?.pendingCount || 0,
      };

      return {
        success: true,
        data: dashboardMetrics,
        message: "Dashboard metrics fetched successfully",
      };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getWtfDashboardMetrics service"
      );
      throw error;
    }
  }

  static async getActivePinsCount() {
    try {
      const result = await getActivePins({ page: 1, limit: 1 });
      return {
        success: true,
        data: result?.pagination?.total || 0,
        message: "Active pins count fetched successfully",
      };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getActivePinsCount service"
      );
      throw error;
    }
  }

  static async getWtfTotalEngagement() {
    try {
      const result = await this.getWtfAnalytics();
      const totalEngagement =
        result?.data?.totalViews || result?.data?.totalSeen || 0;

      return {
        success: true,
        data: { totalViews: totalEngagement },
        message: "Total engagement fetched successfully",
      };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getWtfTotalEngagement service"
      );
      throw error;
    }
  }

  static async getCoachSuggestionsCount() {
    try {
      const result = await this.getSubmissionStats();
      const pendingCount = result?.data?.pendingCount || 0;

      return {
        success: true,
        data: { pendingCount },
        message: "Coach suggestions count fetched successfully",
      };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getCoachSuggestionsCount service"
      );
      throw error;
    }
  }

  static async getCoachSuggestions({ page = 1, limit = 20, status = null }) {
    try {
      // For now, we'll use the submissions data as coach suggestions
      // In a real implementation, you might have a separate coach suggestions table
      const result = await getSubmissionsForReview({ page, limit, type: null });

      if (!result.success) {
        return {
          success: false,
          data: null,
          message: "Failed to fetch coach suggestions",
        };
      }

      // Transform submissions to coach suggestions format
      const coachSuggestions = result.data.map((submission) => ({
        id: submission._id,
        studentName: submission.studentName || "Unknown Student",
        coachName: submission.suggestedBy || "Coach",
        workType: submission.type === "voice" ? "Voice Note" : "Article",
        title: submission.title,
        content: submission.content || submission.audioUrl,
        suggestedDate: submission.createdAt,
        status: submission.status === "NEW" ? "PENDING" : submission.status,
        balagruha: submission.balagruha || "Unknown House",
      }));

      return {
        success: true,
        data: coachSuggestions,
        pagination: result.pagination,
        message: "Coach suggestions fetched successfully",
      };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error in getCoachSuggestions service"
      );
      throw error;
    }
  }
}

module.exports = WtfService;
