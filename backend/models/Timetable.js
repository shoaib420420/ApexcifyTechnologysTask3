const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema({
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  day: String,
  subject: String,
  startTime: String,
  endTime: String
}, { timestamps: true });

module.exports = mongoose.model("Timetable", TimetableSchema);
