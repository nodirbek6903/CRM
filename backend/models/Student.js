const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true,
    },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    phone: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\d{9,15}$/,
            'Please enter a valid phone number',
        ],
    },
    birthday: { type: Date, required: true },
});
module.exports = mongoose.model('Student', StudentSchema);
