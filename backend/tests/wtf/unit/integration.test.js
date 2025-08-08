const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");

// Mock authentication middleware
const mockAuth = (req, res, next) => {
  req.user = { id: new mongoose.Types.ObjectId().toString() };
  next();
};

const mockAuthorize = (permission, action) => (req, res, next) => {
  next();
};

// Mock the service layer
jest.mock("../../../services/wtf");
const WtfService = require("../../../services/wtf");

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri);

  // Create Express app for testing
  app = express();
  app.use(bodyParser.json());

  // Mock routes for testing
  app.get(
    "/api/v1/wtf/dashboard/metrics",
    mockAuth,
    mockAuthorize(),
    (req, res) => {
      WtfService.getWtfDashboardMetrics()
        .then((result) => {
          if (result.success) {
            res.status(200).json(result);
          } else {
            res.status(400).json(result);
          }
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: error.message });
        });
    }
  );

  app.get(
    "/api/v1/wtf/pins/active/count",
    mockAuth,
    mockAuthorize(),
    (req, res) => {
      WtfService.getActivePinsCount()
        .then((result) => {
          if (result.success) {
            res.status(200).json(result);
          } else {
            res.status(400).json(result);
          }
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: error.message });
        });
    }
  );

  app.get(
    "/api/v1/wtf/analytics/engagement",
    mockAuth,
    mockAuthorize(),
    (req, res) => {
      WtfService.getWtfTotalEngagement()
        .then((result) => {
          if (result.success) {
            res.status(200).json(result);
          } else {
            res.status(400).json(result);
          }
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: error.message });
        });
    }
  );

  app.get(
    "/api/v1/wtf/coach-suggestions/count",
    mockAuth,
    mockAuthorize(),
    (req, res) => {
      WtfService.getCoachSuggestionsCount()
        .then((result) => {
          if (result.success) {
            res.status(200).json(result);
          } else {
            res.status(400).json(result);
          }
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: error.message });
        });
    }
  );

  app.get(
    "/api/v1/wtf/coach-suggestions",
    mockAuth,
    mockAuthorize(),
    (req, res) => {
      WtfService.getCoachSuggestions(req.query)
        .then((result) => {
          if (result.success) {
            res.status(200).json(result);
          } else {
            res.status(400).json(result);
          }
        })
        .catch((error) => {
          res.status(500).json({ success: false, message: error.message });
        });
    }
  );
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  jest.clearAllMocks();
});

describe("WTF Dashboard Metrics Integration Tests", () => {
  test("should get dashboard metrics successfully", async () => {
    const mockDashboardMetrics = {
      activePins: 25,
      coachSuggestions: 8,
      studentSubmissions: 12,
      totalEngagement: 1500,
      pendingSuggestions: 8,
      newSubmissions: 12,
      reviewQueueCount: 8,
    };

    WtfService.getWtfDashboardMetrics.mockResolvedValue({
      success: true,
      data: mockDashboardMetrics,
      message: "Dashboard metrics fetched successfully",
    });

    const response = await request(app)
      .get("/api/v1/wtf/dashboard/metrics")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockDashboardMetrics);
    expect(WtfService.getWtfDashboardMetrics).toHaveBeenCalled();
  });

  test("should get active pins count successfully", async () => {
    WtfService.getActivePinsCount.mockResolvedValue({
      success: true,
      data: 15,
      message: "Active pins count fetched successfully",
    });

    const response = await request(app)
      .get("/api/v1/wtf/pins/active/count")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toBe(15);
    expect(WtfService.getActivePinsCount).toHaveBeenCalled();
  });

  test("should get total engagement successfully", async () => {
    WtfService.getWtfTotalEngagement.mockResolvedValue({
      success: true,
      data: { totalViews: 2000 },
      message: "Total engagement fetched successfully",
    });

    const response = await request(app)
      .get("/api/v1/wtf/analytics/engagement")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.totalViews).toBe(2000);
    expect(WtfService.getWtfTotalEngagement).toHaveBeenCalled();
  });

  test("should get coach suggestions count successfully", async () => {
    WtfService.getCoachSuggestionsCount.mockResolvedValue({
      success: true,
      data: { pendingCount: 10 },
      message: "Coach suggestions count fetched successfully",
    });

    const response = await request(app)
      .get("/api/v1/wtf/coach-suggestions/count")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data.pendingCount).toBe(10);
    expect(WtfService.getCoachSuggestionsCount).toHaveBeenCalled();
  });

  test("should get coach suggestions successfully", async () => {
    const mockCoachSuggestions = [
      {
        id: "1",
        studentName: "Arjun Sharma",
        coachName: "Ms. Priya",
        workType: "Voice Note",
        title: "Beautiful Nature Painting",
        content:
          "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=500",
        suggestedDate: "2025-01-05T00:00:00.000Z",
        status: "PENDING",
        balagruha: "Wisdom House",
      },
    ];

    WtfService.getCoachSuggestions.mockResolvedValue({
      success: true,
      data: mockCoachSuggestions,
      pagination: { total: 1, page: 1, limit: 20 },
      message: "Coach suggestions fetched successfully",
    });

    const response = await request(app)
      .get("/api/v1/wtf/coach-suggestions")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockCoachSuggestions);
    expect(WtfService.getCoachSuggestions).toHaveBeenCalledWith({});
  });

  test("should get coach suggestions with pagination", async () => {
    const mockCoachSuggestions = [
      {
        id: "1",
        studentName: "Test Student",
        coachName: "Test Coach",
        workType: "Article",
        title: "Test Article",
        content: "Test content",
        suggestedDate: "2025-01-04T00:00:00.000Z",
        status: "PENDING",
        balagruha: "Test House",
      },
    ];

    WtfService.getCoachSuggestions.mockResolvedValue({
      success: true,
      data: mockCoachSuggestions,
      pagination: { total: 1, page: 2, limit: 10 },
      message: "Coach suggestions fetched successfully",
    });

    const response = await request(app)
      .get("/api/v1/wtf/coach-suggestions?page=2&limit=10")
      .expect(200);

    expect(response.body.success).toBe(true);
    expect(response.body.data).toEqual(mockCoachSuggestions);
    expect(WtfService.getCoachSuggestions).toHaveBeenCalledWith({
      page: "2",
      limit: "10",
    });
  });

  test("should handle coach suggestions service errors", async () => {
    WtfService.getCoachSuggestions.mockRejectedValue(
      new Error("Service error")
    );

    const response = await request(app)
      .get("/api/v1/wtf/coach-suggestions")
      .expect(500);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Service error");
  });

  test("should handle coach suggestions service failures", async () => {
    WtfService.getCoachSuggestions.mockResolvedValue({
      success: false,
      data: null,
      message: "Failed to fetch coach suggestions",
    });

    const response = await request(app)
      .get("/api/v1/wtf/coach-suggestions")
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to fetch coach suggestions");
  });

  test("should handle service errors gracefully", async () => {
    WtfService.getWtfDashboardMetrics.mockRejectedValue(
      new Error("Service error")
    );

    const response = await request(app)
      .get("/api/v1/wtf/dashboard/metrics")
      .expect(500);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Service error");
  });

  test("should handle service failures", async () => {
    WtfService.getWtfDashboardMetrics.mockResolvedValue({
      success: false,
      data: null,
      message: "Failed to fetch metrics",
    });

    const response = await request(app)
      .get("/api/v1/wtf/dashboard/metrics")
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Failed to fetch metrics");
  });
});
