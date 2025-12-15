const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  title: String,
  message: String,
  sentTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  type: { type: String, enum: ["Email", "SMS", "App"], default: "App" }
}, { timestamps: true });

module.exports = mongoose.model("Notification", NotificationSchema);
