const axios = require("axios");
const config = require("../config/config");

async function sendPushNotification(userId, message) {
    try {
        await axios.post(config.pushApi, { userId, message });
        console.log(`Push notification sent to ${userId}`);
    } catch (error) {
        console.error(`Failed to send push notification to ${userId}: ${error.message}`);
        throw error;
    }
}

module.exports = { sendPushNotification };
