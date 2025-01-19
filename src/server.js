require('dotenv').config();
const express = require("express");
const config = require("./config/config");
const mongoose = require("mongoose");
const { consumer } = require("./services/kafkaService");
const { processMessage } = require("./services/notificationProcessor");
const notificationRoutes = require("./routes/notificationRoutes.js");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(config.mongoURI);
require("./scheduler.js")
consumer.on("message", processMessage);
app.use("/api", notificationRoutes);
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
