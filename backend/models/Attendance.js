const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    date: { type: Date, default: Date.now },
    students: [{
        studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
        present: { type: Boolean, required: true },
    }],
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
