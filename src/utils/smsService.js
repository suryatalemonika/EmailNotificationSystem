const axios = require("axios");
const config = require("../config/config");

async function sendSMS(userId, message) {
    try {
        await axios.post(config.smsApi, { userId, message });
        console.log(`SMS sent to ${userId}`);
    } catch (error) {
        console.error(`Failed to send SMS to ${userId}: ${error.message}`);
        throw error;
    }
}

module.exports = { sendSMS };
