const mongoose = require("mongoose");

const MaterialSchema = new mongoose.Schema({
  title: String,
  description: String,
  fileUrl: String,
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }
}, { timestamps: true });

module.exports = mongoose.model("Material", MaterialSchema);
