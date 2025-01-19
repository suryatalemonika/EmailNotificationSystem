const { sendEmail } = require("../utils/emailService");
const { sendSMS } = require("../utils/smsService");
const { sendPushNotification } = require("../utils/pushService");
const UserPreference = require("../models/UserPreference");

async function processNotification(notification) {
    try {
        const { userId, message } = notification;

        const userPreference = await UserPreference.findOne({ userId });
        console.log(userPreference);
        const preferences = userPreference || {
            channels: ["email"],
        };
        console.log(preferences);
        if (preferences.channels.includes("email")) {
            await sendEmail(userId, message);
        }

        if (preferences.channels.includes("sms")) {
            await sendSMS(userId, message);
        }

        if (preferences.channels.includes("push")) {
            await sendPushNotification(userId, message);
        }

        console.log(`Notification delivered successfully for user: ${userId}`);
    } catch (error) {
        console.error("Error in processNotification:", error);
    }
}


module.exports = { processNotification };

