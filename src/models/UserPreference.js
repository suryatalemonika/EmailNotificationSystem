const mongoose = require("mongoose");

const UserPreferenceSchema = new mongoose.Schema({
    userId: String,
    channels: [String],
    quietHours: { start: Number, end: Number },
    maxNotificationsPerHour: Number,
});

module.exports = mongoose.model("UserPreference", UserPreferenceSchema);
