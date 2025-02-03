const Attendance = require('../models/Attendance');
const Group = require('../models/Group');

// Get attendance for a specific group
exports.getAttendanceByGroup = async (req, res) => {
    try {
        const attendance = await Attendance.find({ groupId: req.params.groupId })
            .populate('groupId')
            .populate('students.studentId');
        res.status(200).json(attendance);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create attendance for a group
exports.createAttendance = async (req, res) => {
    try {
        const group = await Group.findById(req.body.groupId);
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const attendance = new Attendance(req.body);
        await attendance.save();
        res.status(201).json(attendance);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
