const Subject = require('../models/Subject');

exports.getSubjects = async (req,res) => {
  const subjects = await Subject.find().populate('class','name').populate('teacher','name email');
  res.json(subjects);
};

exports.createSubject = async (req,res) => {
  const { name, classId, teacherId } = req.body;
  const newSubject = new Subject({ name, class: classId, teacher: teacherId });
  await newSubject.save();
  res.json(newSubject);
};

exports.updateSubject = async (req,res) => {
  const updated = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

exports.deleteSubject = async (req,res) => {
  await Subject.findByIdAndDelete(req.params.id);
  res.json({ message: "Subject deleted" });
};
