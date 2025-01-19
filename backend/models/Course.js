// models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    direction: { type: String, required: true },
    classDays: { type: [String], required: true },
    topics: { type: [String], required: true },
    studentCount: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    groupCount: { type: Number, default: 0 },
    type: { type: String, enum: ['Online', 'Offline'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
