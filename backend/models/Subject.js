const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: mongoose.Schema.Types.ObjectId, ref: "Class", required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Subject", SubjectSchema);
