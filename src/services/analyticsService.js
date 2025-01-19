const Notification = require("../models/Notification.js");

async function getDeliveryStats() {
    try {
        const totalNotifications = await Notification.countDocuments();
        const failedNotifications = await Notification.countDocuments({ status: "failed" });
        const retriedNotifications = await Notification.countDocuments({ status: "retried" });

        return {
            totalNotifications,
            failedNotifications,
            retriedNotifications,
        };
    } catch (error) {
        console.error("Error fetching delivery stats:", error);
        return {
            totalNotifications: 0,
            failedNotifications: 0,
            retriedNotifications: 0,
        };
    }
}

async function getUserEngagement() {
    try {
        const avgDeliveryTimeResult = await Notification.aggregate([
            { 
                $match: { 
                    send_time: { $ne: null }, 
                    created_at: { $ne: null }, 
                    $expr: { $gte: ["$send_time", "$created_at"] } 
                } 
            },
            { $project: { deliveryTime: { $subtract: ["$send_time", "$created_at"] } } },
            { $group: { _id: null, avgDeliveryTime: { $avg: "$deliveryTime" } } },
        ]);

        const avgDeliveryTime = avgDeliveryTimeResult[0]?.avgDeliveryTime || 0;

        const totalResponses = await Notification.countDocuments({ responseReceived: true });
        const totalNotifications = await Notification.countDocuments();
        const responseRate = totalNotifications > 0 ? totalResponses / totalNotifications : 0;

        return {
            avgDeliveryTime,
            responseRate,
        };
    } catch (error) {
        console.error("Error fetching user engagement stats:", error);
        return {
            avgDeliveryTime: 0,
            responseRate: 0,
        };
    }
}
module.exports = { getDeliveryStats, getUserEngagement };
