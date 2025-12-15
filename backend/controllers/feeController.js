const Fee = require("../models/Fee");

exports.getAllFees = async (req, res) => {
  const fees = await Fee.find();
  res.json(fees);
};

exports.addFee = async (req, res) => {
  const fee = await Fee.create(req.body);
  res.json(fee);
};

exports.updateFee = async (req, res) => {
  const fee = await Fee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(fee);
};

exports.deleteFee = async (req, res) => {
  await Fee.findByIdAndDelete(req.params.id);
  res.json({ message: "Fee deleted" });
};
