const Attendance = require("../models/Attendance");

exports.getAllAttendance = async (req, res) => {
  const attendance = await Attendance.find();
  res.json(attendance);
};

exports.addAttendance = async (req, res) => {
  const attendance = await Attendance.create(req.body);
  res.json(attendance);
};

exports.updateAttendance = async (req, res) => {
  const attendance = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(attendance);
};

exports.deleteAttendance = async (req, res) => {
  await Attendance.findByIdAndDelete(req.params.id);
  res.json({ message: "Attendance deleted" });
};
