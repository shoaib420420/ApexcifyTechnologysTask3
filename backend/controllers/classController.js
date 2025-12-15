const Class = require("../models/Class");

exports.getAllClasses = async (req, res) => {
  const classes = await Class.find();
  res.json(classes);
};

exports.addClass = async (req, res) => {
  const newClass = await Class.create(req.body);
  res.json(newClass);
};

exports.updateClass = async (req, res) => {
  const updatedClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedClass);
};

exports.deleteClass = async (req, res) => {
  await Class.findByIdAndDelete(req.params.id);
  res.json({ message: "Class deleted" });
};
