const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport(config.emailService);

async function sendEmail(userId, message) {
    try {
        await transporter.sendMail({
            from: 'suryatalemonika@gmail.com', // From email address
            to: `${userId}@gmail.com`, // User's email address (you might have to fetch the real email from your database)
            subject: "Notification",
            text: message, // Message content
        });
        console.log(`Email sent to ${userId}`);
    } catch (error) {
        console.error(`Failed to send email to ${userId}: ${error.message}`);
        throw error;
    }
}

module.exports = { sendEmail };
