const Topic = require("../models/Topic");

exports.getDashboard = async (req, res) => {
    try {

        // Get all topics of logged-in user
        const topics = await Topic.find({
            userId: req.user.id
        });

        // Total Topics
        const totalTopics = topics.length;

        // Total Practice Sessions
        const totalPracticeSessions = topics.reduce(
            (total, topic) => total + (topic.practiceCount || 0),
            0
        );

        // Completed Topics
        const completedTopics = topics.filter(
            (topic) => topic.status === "Completed"
        ).length;

        // Completion Percentage
        const completionPercentage =
            totalTopics === 0
                ? 0
                : Math.round((completedTopics / totalTopics) * 100);

        // Recent 5 Updated Topics
        const recentTopics = await Topic.find({
            userId: req.user.id,
        })
            .sort({ updatedAt: -1 })
            .limit(5);

        // Response
        res.status(200).json({
            totalTopics,
            totalPracticeSessions,
            completionPercentage,
            recentTopics,
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};