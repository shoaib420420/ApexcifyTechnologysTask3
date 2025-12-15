const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class" },
  date: Date,
  status: { type: String, enum: ["Present", "Absent"], default: "Present" }
}, { timestamps: true });

module.exports = mongoose.model("Attendance", AttendanceSchema);
