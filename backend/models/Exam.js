const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  title: String,
  date: Date,
  classId: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }
}, { timestamps: true });

module.exports = mongoose.model("Exam", ExamSchema);
