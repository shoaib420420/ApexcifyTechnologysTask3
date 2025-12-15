const mongoose = require("mongoose");

const FeeSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
  amount: Number,
  status: { type: String, enum: ["Paid", "Pending"], default: "Pending" },
  dueDate: Date
}, { timestamps: true });

module.exports = mongoose.model("Fee", FeeSchema);
