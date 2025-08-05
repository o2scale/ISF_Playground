const cron = require("node-cron");
const {
  errorLogger,
  logger,
  schedulerLogger,
  lifecycleLogger,
} = require("../config/pino-config");
const WtfService = require("./wtf");
const {
  getExpiredPins,
  getPinsForFifoManagement,
  bulkUpdatePinStatus,
} = require("../data-access/wtfPin");

class SchedulerService {
  constructor() {
    this.jobs = new Map();
    this.isInitialized = false;
  }

  // Initialize all scheduled jobs
  async initialize() {
    if (this.isInitialized) {
      logger.info("Scheduler already initialized");
      return;
    }

    try {
      // Schedule pin expiration job (runs every hour)
      this.schedulePinExpirationJob();

      // Schedule FIFO management job (runs every 30 minutes)
      this.scheduleFifoManagementJob();

      // Schedule weekly cleanup job (runs every Sunday at 2 AM)
      this.scheduleWeeklyCleanupJob();

      // Schedule daily analytics job (runs every day at 6 AM)
      this.scheduleDailyAnalyticsJob();

      this.isInitialized = true;
      schedulerLogger.info("WTF Scheduler initialized successfully");
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error initializing WTF scheduler"
      );
      throw error;
    }
  }

  // Schedule pin expiration job
  schedulePinExpirationJob() {
    const jobName = "wtf-pin-expiration";

    // Run every hour at minute 0
    const job = cron.schedule(
      "0 * * * *",
      async () => {
        try {
          schedulerLogger.info("Starting WTF pin expiration job");

          const startTime = Date.now();
          const result = await this.processExpiredPins();

          const duration = Date.now() - startTime;
          schedulerLogger.info(
            {
              jobName,
              expiredPinsCount: result.expiredPinsCount,
              duration,
            },
            "WTF pin expiration job completed successfully"
          );
        } catch (error) {
          errorLogger.error(
            { jobName, error: error.message },
            "Error in WTF pin expiration job"
          );
        }
      },
      {
        scheduled: false, // Don't start immediately
        timezone: "Asia/Kolkata", // IST timezone
      }
    );

    this.jobs.set(jobName, job);
    job.start();

    logger.info("WTF pin expiration job scheduled (every hour)");
  }

  // Schedule FIFO management job
  scheduleFifoManagementJob() {
    const jobName = "wtf-fifo-management";

    // Run every 30 minutes
    const job = cron.schedule(
      "*/30 * * * *",
      async () => {
        try {
          logger.info("Starting WTF FIFO management job");

          const startTime = Date.now();
          const result = await this.processFifoManagement();

          const duration = Date.now() - startTime;
          logger.info(
            {
              jobName,
              fifoPinsCount: result.fifoPinsCount,
              duration,
            },
            "WTF FIFO management job completed successfully"
          );
        } catch (error) {
          errorLogger.error(
            { jobName, error: error.message },
            "Error in WTF FIFO management job"
          );
        }
      },
      {
        scheduled: false,
        timezone: "Asia/Kolkata",
      }
    );

    this.jobs.set(jobName, job);
    job.start();

    logger.info("WTF FIFO management job scheduled (every 30 minutes)");
  }

  // Schedule weekly cleanup job
  scheduleWeeklyCleanupJob() {
    const jobName = "wtf-weekly-cleanup";

    // Run every Sunday at 2 AM
    const job = cron.schedule(
      "0 2 * * 0",
      async () => {
        try {
          logger.info("Starting WTF weekly cleanup job");

          const startTime = Date.now();
          const result = await this.processWeeklyCleanup();

          const duration = Date.now() - startTime;
          logger.info(
            {
              jobName,
              cleanupStats: result,
              duration,
            },
            "WTF weekly cleanup job completed successfully"
          );
        } catch (error) {
          errorLogger.error(
            { jobName, error: error.message },
            "Error in WTF weekly cleanup job"
          );
        }
      },
      {
        scheduled: false,
        timezone: "Asia/Kolkata",
      }
    );

    this.jobs.set(jobName, job);
    job.start();

    logger.info("WTF weekly cleanup job scheduled (every Sunday at 2 AM)");
  }

  // Schedule daily analytics job
  scheduleDailyAnalyticsJob() {
    const jobName = "wtf-daily-analytics";

    // Run every day at 6 AM
    const job = cron.schedule(
      "0 6 * * *",
      async () => {
        try {
          logger.info("Starting WTF daily analytics job");

          const startTime = Date.now();
          const result = await this.processDailyAnalytics();

          const duration = Date.now() - startTime;
          logger.info(
            {
              jobName,
              analyticsStats: result,
              duration,
            },
            "WTF daily analytics job completed successfully"
          );
        } catch (error) {
          errorLogger.error(
            { jobName, error: error.message },
            "Error in WTF daily analytics job"
          );
        }
      },
      {
        scheduled: false,
        timezone: "Asia/Kolkata",
      }
    );

    this.jobs.set(jobName, job);
    job.start();

    logger.info("WTF daily analytics job scheduled (every day at 6 AM)");
  }

  // Process expired pins
  async processExpiredPins() {
    try {
      // Get expired pins
      const expiredPinsResult = await getExpiredPins();

      if (!expiredPinsResult.success || expiredPinsResult.data.length === 0) {
        logger.info("No expired pins found");
        return { expiredPinsCount: 0 };
      }

      const expiredPinIds = expiredPinsResult.data.map((pin) => pin._id);

      // Update expired pins to "unpinned" status
      const updateResult = await bulkUpdatePinStatus(expiredPinIds, "unpinned");

      if (updateResult.success) {
        logger.info(
          { expiredPinsCount: expiredPinIds.length },
          "Successfully unpinned expired pins"
        );

        // Log detailed information about expired pins
        expiredPinsResult.data.forEach((pin) => {
          logger.info(
            {
              pinId: pin._id,
              title: pin.title,
              author: pin.author,
              createdAt: pin.createdAt,
              expiresAt: pin.expiresAt,
            },
            "Pin expired and unpinned"
          );
        });
      }

      return { expiredPinsCount: expiredPinIds.length };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error processing expired pins"
      );
      throw error;
    }
  }

  // Process FIFO management
  async processFifoManagement() {
    try {
      // Get pins for FIFO management (beyond 20 active pins limit)
      const fifoPinsResult = await getPinsForFifoManagement();

      if (!fifoPinsResult.success || fifoPinsResult.data.length === 0) {
        logger.info("No pins need FIFO management");
        return { fifoPinsCount: 0 };
      }

      const fifoPinIds = fifoPinsResult.data.map((pin) => pin._id);

      // Update FIFO pins to "unpinned" status
      const updateResult = await bulkUpdatePinStatus(fifoPinIds, "unpinned");

      if (updateResult.success) {
        logger.info(
          { fifoPinsCount: fifoPinIds.length },
          "Successfully unpinned FIFO pins"
        );

        // Log detailed information about FIFO pins
        fifoPinsResult.data.forEach((pin) => {
          logger.info(
            {
              pinId: pin._id,
              title: pin.title,
              author: pin.author,
              createdAt: pin.createdAt,
              status: pin.status,
            },
            "Pin removed due to FIFO management"
          );
        });
      }

      return { fifoPinsCount: fifoPinIds.length };
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error processing FIFO management"
      );
      throw error;
    }
  }

  // Process weekly cleanup
  async processWeeklyCleanup() {
    try {
      const cleanupStats = {
        oldInteractionsCleaned: 0,
        oldSubmissionsCleaned: 0,
        analyticsGenerated: 0,
      };

      // Clean up old interactions (older than 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // This would require adding cleanup methods to data access layer
      // For now, we'll just log the cleanup process
      logger.info(
        { cutoffDate: thirtyDaysAgo },
        "Weekly cleanup: Old interactions cleanup process"
      );

      // Generate weekly analytics
      try {
        const analyticsResult = await WtfService.getWtfAnalytics();
        if (analyticsResult.success) {
          cleanupStats.analyticsGenerated = 1;
          logger.info(
            { analyticsData: analyticsResult.data },
            "Weekly analytics generated successfully"
          );
        }
      } catch (analyticsError) {
        errorLogger.error(
          { error: analyticsError.message },
          "Error generating weekly analytics"
        );
      }

      return cleanupStats;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error processing weekly cleanup"
      );
      throw error;
    }
  }

  // Process daily analytics
  async processDailyAnalytics() {
    try {
      const analyticsStats = {
        dailyInteractions: 0,
        dailySubmissions: 0,
        dailyPinsCreated: 0,
        topPerformingPins: [],
      };

      // Get daily interaction analytics
      try {
        const interactionAnalytics = await WtfService.getInteractionAnalytics({
          days: 1,
        });
        if (interactionAnalytics.success) {
          analyticsStats.dailyInteractions =
            interactionAnalytics.data.totalInteractions || 0;
        }
      } catch (error) {
        errorLogger.error(
          { error: error.message },
          "Error getting daily interaction analytics"
        );
      }

      // Get daily submission analytics
      try {
        const submissionAnalytics = await WtfService.getSubmissionAnalytics({
          days: 1,
        });
        if (submissionAnalytics.success) {
          analyticsStats.dailySubmissions =
            submissionAnalytics.data.totalSubmissions || 0;
        }
      } catch (error) {
        errorLogger.error(
          { error: error.message },
          "Error getting daily submission analytics"
        );
      }

      // Get top performing pins for the day
      try {
        const topPinsResult = await WtfService.getTopPerformingPins({
          limit: 5,
          days: 1,
        });
        if (topPinsResult.success) {
          analyticsStats.topPerformingPins = topPinsResult.data.pins || [];
        }
      } catch (error) {
        errorLogger.error(
          { error: error.message },
          "Error getting top performing pins"
        );
      }

      logger.info({ analyticsStats }, "Daily analytics processed successfully");

      return analyticsStats;
    } catch (error) {
      errorLogger.error(
        { error: error.message },
        "Error processing daily analytics"
      );
      throw error;
    }
  }

  // Get job status
  getJobStatus() {
    const status = {};

    for (const [jobName, job] of this.jobs) {
      status[jobName] = {
        running: job.running,
        next: job.nextDate(),
        last: job.lastDate(),
      };
    }

    return status;
  }

  // Stop all jobs
  stopAllJobs() {
    for (const [jobName, job] of this.jobs) {
      job.stop();
      logger.info(`Stopped job: ${jobName}`);
    }

    this.isInitialized = false;
    logger.info("All WTF scheduler jobs stopped");
  }

  // Restart all jobs
  async restartAllJobs() {
    this.stopAllJobs();
    await this.initialize();
  }
}

// Create singleton instance
const schedulerService = new SchedulerService();

module.exports = schedulerService;
