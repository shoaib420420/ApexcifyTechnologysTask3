const mongoose = require('mongoose');
const ResultSchema = new mongoose.Schema({
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  marksObtained: Number,
  grade: String
});
module.exports = mongoose.model('Result', ResultSchema);
