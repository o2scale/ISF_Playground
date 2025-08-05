const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const WtfPin = require("../../../models/wtfPin");
const WtfStudentInteraction = require("../../../models/wtfStudentInteraction");
const WtfSubmission = require("../../../models/wtfSubmission");

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
  await WtfPin.deleteMany({});
  await WtfStudentInteraction.deleteMany({});
  await WtfSubmission.deleteMany({});
});

describe("WtfPin Model Tests", () => {
  describe("Schema Validation", () => {
    test("should create a valid pin", async () => {
      const validPin = new WtfPin({
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "active",
        language: "english",
        tags: ["test", "demo"],
      });

      const savedPin = await validPin.save();
      expect(savedPin._id).toBeDefined();
      expect(savedPin.title).toBe("Test Pin");
      expect(savedPin.status).toBe("active");
      expect(savedPin.createdAt).toBeDefined();
      expect(savedPin.expiresAt).toBeDefined();
    });

    test("should require title", async () => {
      const pinWithoutTitle = new WtfPin({
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      });

      await expect(pinWithoutTitle.save()).rejects.toThrow();
    });

    test("should require content", async () => {
      const pinWithoutContent = new WtfPin({
        title: "Test Pin",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      });

      await expect(pinWithoutContent.save()).rejects.toThrow();
    });

    test("should validate pin type", async () => {
      const invalidTypePin = new WtfPin({
        title: "Test Pin",
        content: "Test content",
        type: "invalid_type",
        author: new mongoose.Types.ObjectId(),
      });

      await expect(invalidTypePin.save()).rejects.toThrow();
    });

    test("should validate status", async () => {
      const invalidStatusPin = new WtfPin({
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "invalid_status",
      });

      await expect(invalidStatusPin.save()).rejects.toThrow();
    });

    test("should validate language", async () => {
      const invalidLanguagePin = new WtfPin({
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        language: "invalid_language",
      });

      await expect(invalidLanguagePin.save()).rejects.toThrow();
    });
  });

  describe("Virtual Fields", () => {
    test("should calculate daysUntilExpiration correctly", async () => {
      const pin = new WtfPin({
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      });

      await pin.save();
      expect(pin.daysUntilExpiration).toBeGreaterThanOrEqual(6);
      expect(pin.daysUntilExpiration).toBeLessThanOrEqual(8);
    });

    test("should calculate isExpired correctly", async () => {
      const expiredPin = new WtfPin({
        title: "Expired Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      });

      await expiredPin.save();
      expect(expiredPin.isExpired).toBe(true);
    });
  });

  describe("Instance Methods", () => {
    test("should update engagement metrics", async () => {
      const pin = new WtfPin({
        title: "Test Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      });

      await pin.save();
      await pin.updateEngagementMetrics({ likes: 5, seen: 10, shares: 2 });

      const updatedPin = await WtfPin.findById(pin._id);
      expect(updatedPin.engagementMetrics.likes).toBe(5);
      expect(updatedPin.engagementMetrics.seen).toBe(10);
      expect(updatedPin.engagementMetrics.shares).toBe(2);
    });

    test("should check if pin is active", async () => {
      const activePin = new WtfPin({
        title: "Active Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "active",
      });

      await activePin.save();
      expect(activePin.isActive()).toBe(true);

      const inactivePin = new WtfPin({
        title: "Inactive Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "unpinned",
      });

      await inactivePin.save();
      expect(inactivePin.isActive()).toBe(false);
    });
  });

  describe("Static Methods", () => {
    test("should find active pins", async () => {
      const activePin = new WtfPin({
        title: "Active Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "active",
      });

      const inactivePin = new WtfPin({
        title: "Inactive Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        status: "unpinned",
      });

      await activePin.save();
      await inactivePin.save();

      const activePins = await WtfPin.findActivePins();
      expect(activePins.length).toBe(1);
      expect(activePins[0].title).toBe("Active Pin");
    });

    test("should find expired pins", async () => {
      const expiredPin = new WtfPin({
        title: "Expired Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
        expiresAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      });

      const activePin = new WtfPin({
        title: "Active Pin",
        content: "Test content",
        type: "text",
        author: new mongoose.Types.ObjectId(),
      });

      await expiredPin.save();
      await activePin.save();

      const expiredPins = await WtfPin.findExpiredPins();
      expect(expiredPins.length).toBe(1);
      expect(expiredPins[0].title).toBe("Expired Pin");
    });
  });
});

describe("WtfStudentInteraction Model Tests", () => {
  describe("Schema Validation", () => {
    test("should create a valid interaction", async () => {
      const validInteraction = new WtfStudentInteraction({
        studentId: new mongoose.Types.ObjectId(),
        pinId: new mongoose.Types.ObjectId(),
        type: "like",
        likeType: "thumbs_up",
      });

      const savedInteraction = await validInteraction.save();
      expect(savedInteraction._id).toBeDefined();
      expect(savedInteraction.type).toBe("like");
      expect(savedInteraction.likeType).toBe("thumbs_up");
    });

    test("should require studentId", async () => {
      const interactionWithoutStudent = new WtfStudentInteraction({
        pinId: new mongoose.Types.ObjectId(),
        type: "like",
      });

      await expect(interactionWithoutStudent.save()).rejects.toThrow();
    });

    test("should require pinId", async () => {
      const interactionWithoutPin = new WtfStudentInteraction({
        studentId: new mongoose.Types.ObjectId(),
        type: "like",
      });

      await expect(interactionWithoutPin.save()).rejects.toThrow();
    });

    test("should validate interaction type", async () => {
      const invalidTypeInteraction = new WtfStudentInteraction({
        studentId: new mongoose.Types.ObjectId(),
        pinId: new mongoose.Types.ObjectId(),
        type: "invalid_type",
      });

      await expect(invalidTypeInteraction.save()).rejects.toThrow();
    });

    test("should validate like type", async () => {
      const invalidLikeTypeInteraction = new WtfStudentInteraction({
        studentId: new mongoose.Types.ObjectId(),
        pinId: new mongoose.Types.ObjectId(),
        type: "like",
        likeType: "invalid_like_type",
      });

      await expect(invalidLikeTypeInteraction.save()).rejects.toThrow();
    });
  });

  describe("Static Methods", () => {
    test("should find interactions by student", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const pinId = new mongoose.Types.ObjectId();

      const interaction1 = new WtfStudentInteraction({
        studentId,
        pinId,
        type: "like",
        likeType: "thumbs_up",
      });

      const interaction2 = new WtfStudentInteraction({
        studentId,
        pinId,
        type: "seen",
      });

      await interaction1.save();
      await interaction2.save();

      const studentInteractions = await WtfStudentInteraction.findByStudent(
        studentId
      );
      expect(studentInteractions.length).toBe(2);
    });

    test("should find interactions by pin", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const pinId = new mongoose.Types.ObjectId();

      const interaction = new WtfStudentInteraction({
        studentId,
        pinId,
        type: "like",
        likeType: "thumbs_up",
      });

      await interaction.save();

      const pinInteractions = await WtfStudentInteraction.findByPin(pinId);
      expect(pinInteractions.length).toBe(1);
      expect(pinInteractions[0].pinId.toString()).toBe(pinId.toString());
    });

    test("should get interaction counts", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const pinId = new mongoose.Types.ObjectId();

      const likeInteraction = new WtfStudentInteraction({
        studentId,
        pinId,
        type: "like",
        likeType: "thumbs_up",
      });

      const seenInteraction = new WtfStudentInteraction({
        studentId,
        pinId,
        type: "seen",
      });

      await likeInteraction.save();
      await seenInteraction.save();

      const counts = await WtfStudentInteraction.getInteractionCounts(pinId);
      expect(counts.likes).toBe(1);
      expect(counts.seen).toBe(1);
    });
  });
});

describe("WtfSubmission Model Tests", () => {
  describe("Schema Validation", () => {
    test("should create a valid submission", async () => {
      const validSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test article content",
        language: "english",
        tags: ["test", "article"],
      });

      const savedSubmission = await validSubmission.save();
      expect(savedSubmission._id).toBeDefined();
      expect(savedSubmission.type).toBe("article");
      expect(savedSubmission.status).toBe("pending");
    });

    test("should require studentId", async () => {
      const submissionWithoutStudent = new WtfSubmission({
        type: "article",
        title: "Test Article",
        content: "Test content",
      });

      await expect(submissionWithoutStudent.save()).rejects.toThrow();
    });

    test("should require title", async () => {
      const submissionWithoutTitle = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        content: "Test content",
      });

      await expect(submissionWithoutTitle.save()).rejects.toThrow();
    });

    test("should validate submission type", async () => {
      const invalidTypeSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "invalid_type",
        title: "Test Article",
        content: "Test content",
      });

      await expect(invalidTypeSubmission.save()).rejects.toThrow();
    });

    test("should validate status", async () => {
      const invalidStatusSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
        status: "invalid_status",
      });

      await expect(invalidStatusSubmission.save()).rejects.toThrow();
    });
  });

  describe("Instance Methods", () => {
    test("should approve submission", async () => {
      const submission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
      });

      await submission.save();
      await submission.approve(new mongoose.Types.ObjectId(), "Great article!");

      const updatedSubmission = await WtfSubmission.findById(submission._id);
      expect(updatedSubmission.status).toBe("approved");
      expect(updatedSubmission.reviewNotes).toBe("Great article!");
    });

    test("should reject submission", async () => {
      const submission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
      });

      await submission.save();
      await submission.reject(
        new mongoose.Types.ObjectId(),
        "Needs improvement"
      );

      const updatedSubmission = await WtfSubmission.findById(submission._id);
      expect(updatedSubmission.status).toBe("rejected");
      expect(updatedSubmission.reviewNotes).toBe("Needs improvement");
    });

    test("should check if submission is pending", async () => {
      const pendingSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
      });

      await pendingSubmission.save();
      expect(pendingSubmission.isPending()).toBe(true);

      const approvedSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Test Article",
        content: "Test content",
        status: "approved",
      });

      await approvedSubmission.save();
      expect(approvedSubmission.isPending()).toBe(false);
    });
  });

  describe("Static Methods", () => {
    test("should find pending submissions", async () => {
      const pendingSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Pending Article",
        content: "Test content",
      });

      const approvedSubmission = new WtfSubmission({
        studentId: new mongoose.Types.ObjectId(),
        type: "article",
        title: "Approved Article",
        content: "Test content",
        status: "approved",
      });

      await pendingSubmission.save();
      await approvedSubmission.save();

      const pendingSubmissions = await WtfSubmission.findPendingSubmissions();
      expect(pendingSubmissions.length).toBe(1);
      expect(pendingSubmissions[0].title).toBe("Pending Article");
    });

    test("should find submissions by student", async () => {
      const studentId = new mongoose.Types.ObjectId();
      const submission = new WtfSubmission({
        studentId,
        type: "article",
        title: "Student Article",
        content: "Test content",
      });

      await submission.save();

      const studentSubmissions = await WtfSubmission.findByStudent(studentId);
      expect(studentSubmissions.length).toBe(1);
      expect(studentSubmissions[0].title).toBe("Student Article");
    });
  });
});
