const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    courseName: {type:String, required: true},
    teacher: { type: String, required: true },
    studentCount: { type: Number, default: 0 },
    startDate: { type: Date, required: true },
    type: {
        type: String,
        enum: ['Online', 'Offline'],
        required: true,
    },
    lessonDays: {
        type: [String],
        required: true,
    },
    roomNumber: {
        type: String,
        required: function () {
            return this.type === 'Offline';
        },
        validate: {
            validator: function(value) {
                // Agar roomNumber mavjud bo'lsa, bu to'g'ri qiymat bo'lishi kerak (string)
                if (this.type === 'Offline' && !value) {
                    return false;  // roomNumber bo'lishi kerak
                }
                return true;
            },
            message: 'Room number is required for Offline groups',
        },
    }
}, { timestamps: true });

module.exports = mongoose.model('Group', GroupSchema);
