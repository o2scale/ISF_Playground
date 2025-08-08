const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const WtfService = require("../../../services/wtf");
const CoinService = require("../../../services/coin");

// Mock the data access layer
jest.mock("../../../data-access/wtfPin");
jest.mock("../../../data-access/wtfStudentInteraction");
jest.mock("../../../data-access/wtfSubmission");
jest.mock("../../../services/coin");

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
} = require("../../../data-access/wtfPin");

const {
  getSubmissionsForReview,
} = require("../../../data-access/wtfSubmission");

// Mock the data access functions
jest.mock("../../../data-access/wtfSubmission", () => ({
  getSubmissionsForReview: jest.fn(),
  getSubmissionStats: jest.fn(),
}));

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
} = require("../../../data-access/wtfStudentInteraction");

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
} = require("../../../data-access/wtfSubmission");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  jest.clearAllMocks();
});

describe("WTF Service Tests", () => {
  describe("Pin Management", () => {
    test("should create pin successfully", async () => {
      const pinData = {
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        language: "english",
        tags: ["test"],
      };

      const mockCreatedPin = {
        _id: new mongoose.Types.ObjectId(),
        ...pinData,
        status: "active",
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      };

      createWtfPin.mockResolvedValue({
        success: true,
        data: mockCreatedPin,
        message: "Pin created successfully",
      });

      CoinService.awardPinCreationCoins.mockResolvedValue({
        success: true,
        data: { coinsAwarded: 10 },
      });

      const result = await WtfService.createPin(pinData);

      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Test Pin");
      expect(createWtfPin).toHaveBeenCalledWith({
        ...pinData,
        status: "active",
        isOfficial: false,
        expiresAt: expect.any(Date),
      });
      expect(CoinService.awardPinCreationCoins).toHaveBeenCalled();
    });

    test("should handle pin creation failure", async () => {
      const pinData = {
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      };

      createWtfPin.mockResolvedValue({
        success: false,
        data: null,
        message: "Failed to create pin",
      });

      const result = await WtfService.createPin(pinData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Failed to create pin");
    });

    test("should get active pins for students", async () => {
      const mockPins = [
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Pin 1",
          content: "Content 1",
          type: "text",
          author: new mongoose.Types.ObjectId(),
          status: "active",
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Pin 2",
          content: "Content 2",
          type: "text",
          author: new mongoose.Types.ObjectId(),
          status: "active",
        },
      ];

      getActivePins.mockResolvedValue({
        success: true,
        data: mockPins,
        pagination: { page: 1, limit: 20, total: 2 },
      });

      const result = await WtfService.getActivePinsForStudents({
        page: 1,
        limit: 20,
      });

      expect(result.success).toBe(true);
      expect(result.data.length).toBe(2);
      expect(getActivePins).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        type: null,
        isOfficial: null,
      });
    });

    test("should get pin by ID", async () => {
      const pinId = new mongoose.Types.ObjectId();
      const mockPin = {
        _id: pinId,
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "active",
      };

      getWtfPinById.mockResolvedValue({
        success: true,
        data: mockPin,
      });

      const result = await WtfService.getPinById(pinId.toString());

      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Test Pin");
      expect(getWtfPinById).toHaveBeenCalledWith(pinId.toString());
    });

    test("should update pin", async () => {
      const pinId = new mongoose.Types.ObjectId();
      const updateData = { title: "Updated Title" };
      const mockUpdatedPin = {
        _id: pinId,
        title: "Updated Title",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "active",
      };

      updateWtfPin.mockResolvedValue({
        success: true,
        data: mockUpdatedPin,
      });

      const result = await WtfService.updatePin(pinId.toString(), updateData);

      expect(result.success).toBe(true);
      expect(result.data.title).toBe("Updated Title");
      expect(updateWtfPin).toHaveBeenCalledWith(pinId.toString(), updateData);
    });

    test("should delete pin", async () => {
      const pinId = new mongoose.Types.ObjectId();

      deleteWtfPin.mockResolvedValue({
        success: true,
        message: "Pin deleted successfully",
      });

      const result = await WtfService.deletePin(pinId.toString());

      expect(result.success).toBe(true);
      expect(deleteWtfPin).toHaveBeenCalledWith(pinId.toString());
    });
  });

  describe("Interaction Management", () => {
    test("should like pin successfully", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const pinId = new mongoose.Types.ObjectId();
      const likeType = "thumbs_up";

      const mockInteraction = {
        _id: new mongoose.Types.ObjectId(),
        studentId,
        pinId,
        type: "like",
        likeType,
      };

      createInteraction.mockResolvedValue({
        success: true,
        data: mockInteraction,
      });

      updateEngagementMetrics.mockResolvedValue({
        success: true,
      });

      CoinService.awardInteractionCoins.mockResolvedValue({
        success: true,
        data: { coinsAwarded: 5 },
      });

      // Mock getWtfPinById to return a valid pin
      getWtfPinById.mockResolvedValue({
        success: true,
        data: {
          _id: pinId,
          title: "Test Pin",
          status: "active",
        },
      });

      // Mock hasStudentInteracted to return false (not liked yet)
      hasStudentInteracted.mockResolvedValue({
        success: true,
        data: { hasInteracted: false },
      });

      const result = await WtfService.likePin(
        studentId.toString(),
        pinId.toString(),
        likeType
      );

      expect(result.success).toBe(true);
      expect(result.data.action).toBe("liked");
      expect(result.data.likeType).toBe(likeType);
      expect(createInteraction).toHaveBeenCalledWith({
        studentId,
        pinId,
        type: "like",
        likeType,
      });
      expect(updateEngagementMetrics).toHaveBeenCalledWith(pinId.toString(), {
        "engagementMetrics.likes": 1,
      });
    });

    test("should mark pin as seen", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const pinId = new mongoose.Types.ObjectId();
      const viewDuration = 30;

      const mockInteraction = {
        _id: new mongoose.Types.ObjectId(),
        studentId,
        pinId,
        type: "seen",
        viewDuration,
      };

      createInteraction.mockResolvedValue({
        success: true,
        data: mockInteraction,
      });

      updateEngagementMetrics.mockResolvedValue({
        success: true,
      });

      // Mock getWtfPinById to return a valid pin
      getWtfPinById.mockResolvedValue({
        success: true,
        data: {
          _id: pinId,
          title: "Test Pin",
          status: "active",
        },
      });

      // Mock hasStudentInteracted to return false (not seen yet)
      hasStudentInteracted.mockResolvedValue({
        success: true,
        data: { hasInteracted: false },
      });

      const result = await WtfService.markPinAsSeen(
        studentId.toString(),
        pinId.toString(),
        viewDuration
      );

      expect(result.success).toBe(true);
      expect(result.data.action).toBe("seen");
      expect(result.data.viewDuration).toBe(viewDuration);
      expect(createInteraction).toHaveBeenCalledWith({
        studentId,
        pinId,
        type: "seen",
        viewDuration,
      });
    });

    test("should get pin interactions", async () => {
      const pinId = new mongoose.Types.ObjectId();
      const mockInteractions = [
        {
          _id: new mongoose.Types.ObjectId(),
          studentId: new mongoose.Types.ObjectId(),
          pinId,
          type: "like",
          likeType: "thumbs_up",
        },
        {
          _id: new mongoose.Types.ObjectId(),
          studentId: new mongoose.Types.ObjectId(),
          pinId,
          type: "seen",
        },
      ];

      getStudentPinInteractions.mockResolvedValue({
        success: true,
        data: mockInteractions,
      });

      // Mock getPinInteractionCounts to return interactions
      getPinInteractionCounts.mockResolvedValue({
        success: true,
        data: mockInteractions,
      });

      const result = await WtfService.getPinInteractions(pinId.toString());

      expect(result.success).toBe(true);
      expect(result.data.length).toBe(2);
      expect(getPinInteractionCounts).toHaveBeenCalledWith(pinId.toString());
    });
  });

  describe("Submission Management", () => {
    test("should submit voice note", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const submissionData = {
        title: "Voice Note",
        audioUrl: "https://example.com/audio.mp3",
        audioDuration: 60,
        audioTranscription: "This is a test voice note",
        language: "english",
        tags: ["voice"],
      };

      const mockSubmission = {
        _id: new mongoose.Types.ObjectId(),
        studentId,
        type: "voice",
        ...submissionData,
        status: "pending",
      };

      createWtfSubmission.mockResolvedValue({
        success: true,
        data: mockSubmission,
      });

      const result = await WtfService.submitVoiceNote(
        studentId.toString(),
        submissionData
      );

      expect(result.success).toBe(true);
      expect(result.data.type).toBe("voice");
      expect(createWtfSubmission).toHaveBeenCalledWith({
        studentId,
        type: "voice",
        title: submissionData.title,
        audioUrl: submissionData.audioUrl,
        audioDuration: submissionData.audioDuration,
        audioTranscription: submissionData.audioTranscription,
        tags: submissionData.tags,
        isDraft: false,
        metadata: {
          fileSize: undefined,
          recordingQuality: undefined,
          userAgent: undefined,
          ipAddress: undefined,
        },
      });
    });

    test("should submit article", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const submissionData = {
        title: "Test Article",
        content: "This is a test article content",
        language: "english",
        tags: ["article"],
      };

      const mockSubmission = {
        _id: new mongoose.Types.ObjectId(),
        studentId,
        type: "article",
        ...submissionData,
        status: "pending",
      };

      createWtfSubmission.mockResolvedValue({
        success: true,
        data: mockSubmission,
      });

      const result = await WtfService.submitArticle(
        studentId.toString(),
        submissionData
      );

      expect(result.success).toBe(true);
      expect(result.data.type).toBe("article");
      expect(createWtfSubmission).toHaveBeenCalledWith({
        studentId,
        type: "article",
        title: submissionData.title,
        content: submissionData.content,
        language: submissionData.language,
        tags: submissionData.tags,
        isDraft: false,
        metadata: {
          userAgent: undefined,
          ipAddress: undefined,
        },
      });
    });

    test("should get submissions for review", async () => {
      const mockSubmissions = [
        {
          _id: new mongoose.Types.ObjectId(),
          studentId: new mongoose.Types.ObjectId(),
          type: "article",
          title: "Pending Article",
          content: "Test content",
          status: "pending",
        },
      ];

      getPendingSubmissions.mockResolvedValue({
        success: true,
        data: mockSubmissions,
        pagination: { page: 1, limit: 20, total: 1 },
      });

      const result = await WtfService.getSubmissionsForReview({
        page: 1,
        limit: 20,
      });

      expect(result.success).toBe(true);
      expect(result.data.length).toBe(1);
      expect(getPendingSubmissions).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        type: null,
      });
    });

    test("should review submission - approve", async () => {
      const submissionId = new mongoose.Types.ObjectId();
      const reviewerId = new mongoose.Types.ObjectId();
      const action = "approve";
      const notes = "Great article!";

      const mockApprovedSubmission = {
        _id: submissionId,
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
        status: "approved",
        reviewNotes: notes,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
      };

      approveSubmission.mockResolvedValue({
        success: true,
        data: mockApprovedSubmission,
      });

      CoinService.awardSubmissionApprovalCoins.mockResolvedValue({
        success: true,
        data: { coinsAwarded: 20 },
      });

      const result = await WtfService.reviewSubmission(
        submissionId.toString(),
        reviewerId.toString(),
        action,
        notes
      );

      expect(result.success).toBe(true);
      expect(result.data.status).toBe("approved");
      expect(approveSubmission).toHaveBeenCalledWith(
        submissionId.toString(),
        reviewerId.toString(),
        notes
      );
      expect(CoinService.awardSubmissionApprovalCoins).toHaveBeenCalled();
    });

    test("should review submission - reject", async () => {
      const submissionId = new mongoose.Types.ObjectId();
      const reviewerId = new mongoose.Types.ObjectId();
      const action = "reject";
      const notes = "Needs improvement";

      const mockRejectedSubmission = {
        _id: submissionId,
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
        status: "rejected",
        reviewNotes: notes,
        reviewedBy: reviewerId,
        reviewedAt: new Date(),
      };

      rejectSubmission.mockResolvedValue({
        success: true,
        data: mockRejectedSubmission,
      });

      const result = await WtfService.reviewSubmission(
        submissionId.toString(),
        reviewerId.toString(),
        action,
        notes
      );

      expect(result.success).toBe(true);
      expect(result.data.status).toBe("rejected");
      expect(rejectSubmission).toHaveBeenCalledWith(
        submissionId.toString(),
        reviewerId.toString(),
        notes
      );
    });
  });

  describe("Analytics", () => {
    test("should get WTF analytics", async () => {
      const mockAnalytics = {
        totalPins: 100,
        activePins: 80,
        totalInteractions: 500,
        totalSubmissions: 50,
        pendingSubmissions: 10,
        approvedSubmissions: 35,
        rejectedSubmissions: 5,
      };

      getWtfAnalytics.mockResolvedValue({
        success: true,
        data: mockAnalytics,
      });

      const result = await WtfService.getWtfAnalytics();

      expect(result.success).toBe(true);
      expect(result.data.totalPins).toBe(100);
      expect(getWtfAnalytics).toHaveBeenCalled();
    });

    test("should get interaction analytics", async () => {
      const mockInteractionAnalytics = {
        totalInteractions: 500,
        likes: 300,
        seen: 200,
        topPerformingPins: [],
      };

      getInteractionAnalytics.mockResolvedValue({
        success: true,
        data: mockInteractionAnalytics,
      });

      const result = await WtfService.getInteractionAnalytics({ days: 7 });

      expect(result.success).toBe(true);
      expect(result.data.totalInteractions).toBe(500);
      expect(getInteractionAnalytics).toHaveBeenCalledWith({
        days: 7,
        type: null,
      });
    });

    test("should get submission analytics", async () => {
      const mockSubmissionAnalytics = {
        totalSubmissions: 50,
        pendingSubmissions: 10,
        approvedSubmissions: 35,
        rejectedSubmissions: 5,
        submissionsByType: {
          article: 30,
          voice: 20,
        },
      };

      getSubmissionAnalytics.mockResolvedValue({
        success: true,
        data: mockSubmissionAnalytics,
      });

      const result = await WtfService.getSubmissionAnalytics({ days: 30 });

      expect(result.success).toBe(true);
      expect(result.data.totalSubmissions).toBe(50);
      expect(getSubmissionAnalytics).toHaveBeenCalledWith({
        days: 30,
        type: null,
      });
    });
  });

  describe("Dashboard Metrics", () => {
    test("should get WTF dashboard metrics", async () => {
      // Mock the individual service calls
      getActivePins.mockResolvedValue({
        pagination: { total: 25 },
        data: [],
      });

      getSubmissionStats.mockResolvedValue({
        success: true,
        data: {
          pendingCount: 8,
          newCount: 12,
          approvedCount: 30,
          rejectedCount: 5,
        },
      });

      getWtfAnalytics.mockResolvedValue({
        success: true,
        data: {
          totalViews: 1500,
          totalSeen: 1200,
          totalLikes: 300,
        },
      });

      const result = await WtfService.getWtfDashboardMetrics();

      expect(result.success).toBe(true);
      expect(result.data.activePins).toBe(25);
      expect(result.data.coachSuggestions).toBe(8);
      expect(result.data.studentSubmissions).toBe(12);
      expect(result.data.totalEngagement).toBe(1500);
      expect(result.data.pendingSuggestions).toBe(8);
      expect(result.data.newSubmissions).toBe(12);
      expect(result.data.reviewQueueCount).toBe(8);
    });

    test("should get active pins count", async () => {
      getActivePins.mockResolvedValue({
        pagination: { total: 15 },
        data: [],
      });

      const result = await WtfService.getActivePinsCount();

      expect(result.success).toBe(true);
      expect(result.data).toBe(15);
      expect(getActivePins).toHaveBeenCalledWith({ page: 1, limit: 1 });
    });

    test("should get total engagement", async () => {
      getWtfAnalytics.mockResolvedValue({
        success: true,
        data: {
          totalViews: 2000,
          totalSeen: 1800,
          totalLikes: 450,
        },
      });

      const result = await WtfService.getWtfTotalEngagement();

      expect(result.success).toBe(true);
      expect(result.data.totalViews).toBe(2000);
    });

    test("should get coach suggestions count", async () => {
      getSubmissionStats.mockResolvedValue({
        success: true,
        data: {
          pendingCount: 10,
          newCount: 15,
          approvedCount: 40,
          rejectedCount: 8,
        },
      });

      const result = await WtfService.getCoachSuggestionsCount();

      expect(result.success).toBe(true);
      expect(result.data.pendingCount).toBe(10);
    });

    test("should handle errors in dashboard metrics", async () => {
      getActivePins.mockRejectedValue(new Error("Database error"));

      await expect(WtfService.getWtfDashboardMetrics()).rejects.toThrow(
        "Database error"
      );
    });

    test("should handle missing data in dashboard metrics", async () => {
      getActivePins.mockResolvedValue({
        pagination: { total: 0 },
        data: [],
      });

      getSubmissionStats.mockResolvedValue({
        success: true,
        data: null,
      });

      getWtfAnalytics.mockResolvedValue({
        success: true,
        data: null,
      });

      const result = await WtfService.getWtfDashboardMetrics();

      expect(result.success).toBe(true);
      expect(result.data.activePins).toBe(0);
      expect(result.data.coachSuggestions).toBe(0);
      expect(result.data.studentSubmissions).toBe(0);
      expect(result.data.totalEngagement).toBe(0);
    });

    test("should get coach suggestions", async () => {
      const mockSubmissions = [
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Beautiful Nature Painting",
          content:
            "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500",
          type: "voice",
          status: "NEW",
          studentName: "Arjun Sharma",
          suggestedBy: "Ms. Priya",
          balagruha: "Wisdom House",
          createdAt: new Date(),
        },
        {
          _id: new mongoose.Types.ObjectId(),
          title: "My Favorite Book Review",
          content: "video-content-url",
          type: "article",
          status: "APPROVED",
          studentName: "Kavya Patel",
          suggestedBy: "Mr. Rohit",
          balagruha: "Knowledge House",
          createdAt: new Date(),
        },
      ];

      getSubmissionsForReview.mockResolvedValue({
        success: true,
        data: mockSubmissions,
        pagination: { total: 2, page: 1, limit: 20 },
      });

      const result = await WtfService.getCoachSuggestions({
        page: 1,
        limit: 20,
        status: null,
      });

      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(2);
      expect(result.data[0].studentName).toBe("Arjun Sharma");
      expect(result.data[0].workType).toBe("Voice Note");
      expect(result.data[0].status).toBe("PENDING");
      expect(result.data[1].workType).toBe("Article");
      expect(result.data[1].status).toBe("APPROVED");
      expect(getSubmissionsForReview).toHaveBeenCalledWith({
        page: 1,
        limit: 20,
        type: null,
      });
    });

    test("should handle coach suggestions service failure", async () => {
      getSubmissionsForReview.mockResolvedValue({
        success: false,
        data: null,
        message: "Failed to fetch submissions",
      });

      const result = await WtfService.getCoachSuggestions({
        page: 1,
        limit: 20,
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("Failed to fetch coach suggestions");
    });

    test("should handle coach suggestions service error", async () => {
      getSubmissionsForReview.mockRejectedValue(new Error("Database error"));

      await expect(
        WtfService.getCoachSuggestions({ page: 1, limit: 20 })
      ).rejects.toThrow("Database error");
    });

    test("should transform coach suggestions correctly", async () => {
      const mockSubmissions = [
        {
          _id: new mongoose.Types.ObjectId(),
          title: "Test Submission",
          content: "Test content",
          type: "voice",
          status: "NEW",
          studentName: "Test Student",
          suggestedBy: "Test Coach",
          balagruha: "Test House",
          createdAt: new Date(),
        },
      ];

      getSubmissionsForReview.mockResolvedValue({
        success: true,
        data: mockSubmissions,
        pagination: { total: 1, page: 1, limit: 20 },
      });

      const result = await WtfService.getCoachSuggestions({
        page: 1,
        limit: 20,
      });

      expect(result.success).toBe(true);
      expect(result.data[0]).toMatchObject({
        studentName: "Test Student",
        coachName: "Test Coach",
        workType: "Voice Note",
        title: "Test Submission",
        content: "Test content",
        status: "PENDING",
        balagruha: "Test House",
      });
    });
  });

  describe("Error Handling", () => {
    test("should handle missing required fields", async () => {
      const result = await WtfService.createPin({});

      expect(result.success).toBe(false);
      expect(result.message).toContain("required");
    });

    test("should handle invalid student ID", async () => {
      // Mock getWtfPinById to return a valid pin
      getWtfPinById.mockResolvedValue({
        success: true,
        data: {
          _id: new mongoose.Types.ObjectId(),
          title: "Test Pin",
          status: "active",
        },
      });

      // Mock hasStudentInteracted to return false
      hasStudentInteracted.mockResolvedValue({
        success: true,
        data: { hasInteracted: false },
      });

      const result = await WtfService.likePin(
        "invalid-id",
        new mongoose.Types.ObjectId().toString()
      );

      expect(result.success).toBe(false);
      expect(result.message).toContain("valid");
    });

    test("should handle invalid pin ID", async () => {
      // Mock getWtfPinById to return error for invalid ID
      getWtfPinById.mockResolvedValue({
        success: false,
        data: null,
        message: "Invalid pin ID format",
      });

      const result = await WtfService.getPinById("invalid-id");

      expect(result.success).toBe(false);
      expect(result.message).toContain("valid");
    });

    test("should handle database errors", async () => {
      createWtfPin.mockRejectedValue(new Error("Database connection failed"));

      const pinData = {
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      };

      await expect(WtfService.createPin(pinData)).rejects.toThrow(
        "Database connection failed"
      );
    });
  });
});
