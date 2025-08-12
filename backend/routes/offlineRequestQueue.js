const express = require("express");
const router = express.Router();
const offlineRequestQueueController = require("../controllers/offlineRequestQueue");

router.post("/", offlineRequestQueueController.createOfflineRequest);

router.get("/:requestId", offlineRequestQueueController.getOfflineRequestById);

// API for handling sync the offline request to main server
router.post("/sync", offlineRequestQueueController.syncOfflineRequestToServer);

// API for sync with the remote db
router.post(
  "/sync/db/remote",
  offlineRequestQueueController.syncRemoteDBToLocalDB
);

module.exports = router;
