const Timetable = require("../models/Timetable");

exports.getAllTimetables = async (req, res) => {
  const timetables = await Timetable.find();
  res.json(timetables);
};

exports.addTimetable = async (req, res) => {
  const timetable = await Timetable.create(req.body);
  res.json(timetable);
};

exports.updateTimetable = async (req, res) => {
  const timetable = await Timetable.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(timetable);
};

exports.deleteTimetable = async (req, res) => {
  await Timetable.findByIdAndDelete(req.params.id);
  res.json({ message: "Timetable deleted" });
};
