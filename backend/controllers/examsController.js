// const Exam = require('../models/Exam');

// // Create Exam
// exports.createExam = async (req, res) => {
//     try {
//         const exam = await Exam.create({ ...req.body, teacher: req.user._id });
//         res.status(201).json(exam);
//     } catch (error) { res.status(500).json({ message: error.message }); }
// };

// // Get All Exams
// exports.getExams = async (req, res) => {
//     const exams = await Exam.find().populate('teacher','name email');
//     res.json(exams);
// };

// // Update Exam
// exports.updateExam = async (req, res) => {
//     const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(exam);
// };

// // Delete Exam
// exports.deleteExam = async (req, res) => {
//     await Exam.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Exam deleted' });
// };





const Exam = require('../models/Exam'); // make sure your Exam model exists

// Create exam
exports.createExam = async (req, res) => {
  const { title, date } = req.body;
  const exam = await Exam.create({ title, date });
  res.status(201).json({ message: "Exam created", exam });
};

// Get all exams
exports.getExams = async (req, res) => {
  const exams = await Exam.find();
  res.json(exams);
};

// Update exam
exports.updateExam = async (req, res) => {
  const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Exam updated", exam });
};

// Delete exam
exports.deleteExam = async (req, res) => {
  await Exam.findByIdAndDelete(req.params.id);
  res.json({ message: "Exam deleted" });
};
