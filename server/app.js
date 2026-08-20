const express = require("express");
const cors = require("cors");
const dns = require("dns");

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
]);

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const topicRoutes = require("./routes/topicRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("PrepTrack Backend Running");
});

module.exports = app;