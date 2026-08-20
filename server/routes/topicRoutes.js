const express = require("express");
const router = express.Router();

const {
    createTopic,
    getTopics,
    updateTopic,
    deleteTopic,
    updatePractice
} = require("../controllers/topicController");

const { protect } = require("../middleware/authMiddleware");

// Create Topic
router.post("/", protect, createTopic);

// Get All Topics
router.get("/", protect, getTopics);

// Update Topic
router.put("/:id", protect, updateTopic);

router.delete("/:id",protect,deleteTopic);

router.put("/:id/practice", protect, updatePractice);

module.exports = router;