const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const userV1Routes = require("./routes/v1/user");
const balagruhaV1 = require("./routes/v1/balagruha");
const authRoutes = require("./routes/auth");
const machineRoutes = require("./routes/v1/machines");
const roleRoutes = require("./routes/roleRoutes");
const taskRoutes = require("./routes/taskRoutes");
const sportsRoute = require("./routes/v1/sports");
const musicRoute = require("./routes/v1/music");
const purchaseAndRepair = require("./routes/v1/purchaseAndRepair");
const trainingSession = require("./routes/v1/trainingSession");
const moodTracker = require("./routes/studentMoodTrackerRoutes");
const wtfRoutes = require("./routes/v1/wtf");
const coinRoutes = require("./routes/v1/coin");
const schedulerRoutes = require("./routes/v1/scheduler");
const websocketRoutes = require("./routes/v1/websocket");
const wtfWebSocketService = require("./services/wtfWebSocket");
const { swaggerUi, swaggerDocs } = require("./swagger");
// Newly added routes from deployed backend
const scheduleRoutes = require("./routes/scheduleRoutes");
const medicalCheckInsRoutes = require("./routes/medicalCheckInsRoutes");
const medicalRecordsRoutes = require("./routes/medicalRecordsRoutes");
const offlineRequestQueueRoutes = require("./routes/offlineRequestQueue");
const courseRoutes = require("./routes/courseRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const shopRoutes = require("./routes/v2/shop"); // Sprint 5: ISF Shop
const cartRoutes = require("./routes/v2/cart"); // Sprint 5: Shopping Cart
const orderRoutes = require("./routes/v2/orders"); // Sprint 5: Checkout & Orders
const adminProductRoutes = require("./routes/v2/adminProducts"); // Sprint 5: Admin Product CRUD
const inventoryRoutes = require("./routes/v2/inventory"); // Sprint 5: Inventory Management
const analyticsRoutes = require("./routes/v2/analytics"); // Sprint 5: Shop Analytics
const reportsRoutes = require("./routes/v2/reports"); // Sprint 5: Transaction Reports
const coachDeliveryRoutes = require("./routes/v2/coachDelivery"); // Sprint 5: Coach Delivery Management
const { exec } = require("child_process"); // For executing shell commands
const fs = require("fs"); // For file system operations
const path = require("path");
const faceapi = require("face-api.js");

// Import cleanup function
const { cleanupOrphanedFiles } = require("./middleware/upload");

// Import WTF scheduler service for automatic initialization
const schedulerService = require("./services/scheduler");

// if (!process.env.JWT_SECRET) {
//     console.error('JWT_SECRET is not defined in environment variables');
//     process.exit(1);
// }

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/v1/users", userV1Routes);
app.use("/api/v1/balagruha", balagruhaV1);
app.use("/api/auth", authRoutes);
app.use("/api/v1/machines", machineRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/v1/sports", sportsRoute);
app.use("/api/v1/music", musicRoute);
app.use("/api/v1/purchase-repair", purchaseAndRepair);
app.use("/api/v1/training-session", trainingSession);
app.use("/api/v1/mood-tracker", moodTracker);
app.use("/api/v1/wtf", wtfRoutes);
app.use("/api/v1/coin", coinRoutes);
app.use("/api/v1/scheduler", schedulerRoutes);
app.use("/api/v1/websocket", websocketRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Newly added route mounts
app.use("/api/schedules", scheduleRoutes);
app.use("/api/medical-check-ins", medicalCheckInsRoutes);
app.use("/api/medical-records", medicalRecordsRoutes);
app.use("/api/offline-requests", offlineRequestQueueRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/v2/shop", shopRoutes); // Sprint 5: ISF Shop routes
app.use("/api/v2/shop/cart", cartRoutes); // Sprint 5: Shopping Cart routes (requires auth)
app.use("/api/v2/shop/orders", orderRoutes); // Sprint 5: Checkout & Orders routes (requires auth)
app.use("/api/v2/shop/admin", adminProductRoutes); // Sprint 5: Admin Product CRUD routes (requires admin auth)
app.use("/api/v2/shop/admin/inventory", inventoryRoutes); // Sprint 5: Inventory Management routes (requires admin auth)
app.use("/api/v2/shop/admin/analytics", analyticsRoutes); // Sprint 5: Shop Analytics routes (requires admin auth)
app.use("/api/v2/shop/admin/reports", reportsRoutes); // Sprint 5: Transaction Reports routes (requires admin auth)
app.use("/api/v2/shop/coach/deliveries", coachDeliveryRoutes); // Sprint 5: Coach Delivery Management routes (requires coach auth)

const dbConnection =
  process.env.NODE_ENV === "local"
    ? process.env.MONGO_URI_LOCAL
    : process.env.MONGO_URI;

mongoose
  .connect(dbConnection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log(
      `✅ MongoDB connected to ${
        process.env.NODE_ENV === "local" ? "local database" : "remote database"
      }`
    );
    
    // Initialize WTF scheduler automatically after database connection
    try {
      await schedulerService.initialize();
      console.log("✅ WTF Scheduler initialized successfully - Pin expiration will run automatically");
    } catch (error) {
      console.error("❌ Failed to initialize WTF Scheduler:", error.message);
      console.log("⚠️ Pin expiration will not run automatically. Admin must manually initialize scheduler.");
    }
    
    // loadMongoDump();
    // load the database with the dump into the local db if the node_env is local and dbConnection string have the localhost db connection
    if (
      process.env.NODE_ENV === "local" &&
      dbConnection.includes("localhost")
    ) {
      // loadMongoDump();
    }
    // Uncomment the line below to load the MongoDB dump when the server starts
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

const loadMongoDump = () => {
  const dumpPath = path.join(__dirname, "db", "dump");
  const mongoUri = process.env.MONGO_URI;

  if (!fs.existsSync(dumpPath)) {
    console.error("❌ Dump folder not found at:", dumpPath);
    return;
  }

  console.log("ℹ️ Loading MongoDB dump from:", dumpPath);

  const command = `mongorestore --uri="${mongoUri}" --drop ${dumpPath}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error loading MongoDB dump:", error.message);
      return;
    }
    if (stderr) {
      console.error("⚠️ MongoDB restore stderr:", stderr);
    }
    console.log("✅ MongoDB dump loaded successfully:", stdout);
  });
};

app.get("/", (req, res) => {
  res.send(
    "Welcome to the API! Use /api/users for user routes or /api-docs for API documentation."
  );
});

app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Backend URL: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api-docs`);
  console.log(`🔗 Health Check: http://localhost:${PORT}/`);

  // Run initial cleanup of orphaned files
  try {
    cleanupOrphanedFiles();
    console.log("🧹 Initial file cleanup completed");
  } catch (error) {
    console.error("❌ Initial file cleanup failed:", error.message);
  }
});

// Initialize WTF WebSocket server
try {
  wtfWebSocketService.initialize(server);
  console.log("✅ WTF WebSocket server initialized successfully");
} catch (error) {
  console.error("❌ Error initializing WTF WebSocket server:", error);
}

// Load face-api models
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk("./weights");
  await faceapi.nets.faceLandmark68Net.loadFromDisk("./weights");
  await faceapi.nets.faceRecognitionNet.loadFromDisk("./weights");
}
loadModels();
