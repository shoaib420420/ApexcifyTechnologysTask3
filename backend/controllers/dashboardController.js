const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const Class = require('../models/Class');
const Fee = require('../models/Fee');

exports.getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalClasses = await Class.countDocuments();

        // Calculate total revenue from paid fees
        const revenueAggregation = await Fee.aggregate([
            { $match: { status: 'Paid' } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);
        const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].total : 0;

        res.json({
            totalStudents,
            totalTeachers,
            totalClasses,
            totalRevenue
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};
