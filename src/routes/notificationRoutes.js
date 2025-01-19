const express = require("express");
const { producer } = require("../services/kafkaService");
const { getDeliveryStats, getUserEngagement } = require("../services/analyticsService");

const router = express.Router();

router.post("/notify", (req, res) => {
    const { userId, message, type, priority, send_time } = req.body;

    if (!userId || !message || !priority) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    const payload = [
        {
            topic: "notifications",
            messages: JSON.stringify({ userId, message, type, priority, send_time }),
        },
    ];

    producer.send(payload, (err) => {
        console.log(err);
        if (err) return res.status(500).json({ error: "Failed to publish" });
        res.json({ message: "Notification published" });
    });
});

router.get("/analytics", async (req, res) => {
    try {
        const deliveryStats = await getDeliveryStats();
        const userEngagement = await getUserEngagement();
        
        res.json({
            deliveryStats,
            userEngagement,
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
});

module.exports = router;
