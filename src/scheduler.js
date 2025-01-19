const schedule = require("node-schedule");
const Notification = require("./models/Notification.js");
const { processNotification } = require("./services/deliveryService.js");

schedule.scheduleJob("*/1 * * * *", async () => {
    try {
        const now = new Date();
        const pendingNotifications = await Notification.find({ send_time: { $lte: now } });
        for (const notification of pendingNotifications) {
            await processNotification(notification);
            await Notification.deleteOne({ _id: notification._id }); // Replace remove with deleteOne
        }
    } catch (error) {
        console.error("Error processing notifications:", error);
    }
});
