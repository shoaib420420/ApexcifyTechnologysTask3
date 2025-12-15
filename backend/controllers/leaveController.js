const Leave = require("../models/Leave");

exports.getAllLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find().populate("student").populate("class");
        res.json(leaves);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addLeave = async (req, res) => {
    try {
        const leave = await Leave.create(req.body);
        res.json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateLeave = async (req, res) => {
    try {
        const leave = await Leave.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(leave);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteLeave = async (req, res) => {
    try {
        await Leave.findByIdAndDelete(req.params.id);
        res.json({ message: "Leave deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
