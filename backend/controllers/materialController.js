const Material = require("../models/Material");

exports.getAllMaterials = async (req, res) => {
  const materials = await Material.find();
  res.json(materials);
};

exports.addMaterial = async (req, res) => {
  const material = await Material.create(req.body);
  res.json(material);
};

exports.updateMaterial = async (req, res) => {
  const material = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(material);
};

exports.deleteMaterial = async (req, res) => {
  await Material.findByIdAndDelete(req.params.id);
  res.json({ message: "Material deleted" });
};
