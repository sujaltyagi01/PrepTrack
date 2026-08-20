const Topic = require("../models/Topic");

// Create Topic
exports.createTopic = async (req, res) => {
    try {
        const topic = await Topic.create({
            userId: req.user.id,
            title: req.body.title,
            category: req.body.category,
            status: req.body.status,
            notes: req.body.notes
        });

        res.status(201).json(topic);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Topics
exports.getTopics = async (req, res) => {
    try {
        const topics = await Topic.find({
            userId: req.user.id
        });

        res.status(200).json(topics);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updateTopic = async (req, res) => {
    try {

        const topic = await Topic.findOneAndUpdate(
    {
        _id: req.params.id,
        userId: req.user.id
    },
    req.body,
    {
        new: true
    }
);

if (!topic) {
    return res.status(404).json({
        message: "Topic not found"
    });
}
res.status(200).json(topic);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.deleteTopic = async (req, res) => {
    try {
       const topic = await Topic.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
});

if (!topic){
    return res.status(404).json({
        message: "Topic not found"
    });
}

res.status(200).json({
    message: "Topic deleted successfully"
});


    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

exports.updatePractice = async (req, res) => {
    try {

        const topic = await Topic.findOne({
    _id: req.params.id,
    userId: req.user.id
});


    if (!topic) {
    return res.status(404).json({
        message: "Topic not found"
    });
}

     topic.practiceCount += 1;
     topic.lastPracticed = new Date();
     topic.practiceHistory.push({
    date: new Date(),
    note: req.body.note || ""
});


await topic.save();

        res.status(200).json({
            message: "Practice updated successfully",
            topic
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};