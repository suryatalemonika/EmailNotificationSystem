const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    userId: String,
    message: String,
    type: String,
    priority: String,
    send_time: Date,
    created_at: { type: Date, default: Date.now },
    status: { type: String, enum: ['sent', 'failed', 'retried'], default: 'sent' },
    responseReceived: { type: Boolean, default: false },
});


module.exports = mongoose.model("Notification", NotificationSchema);
