const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  name: String,
  subjects: [String]
}, { timestamps: true });

module.exports = mongoose.model("Class", ClassSchema);
