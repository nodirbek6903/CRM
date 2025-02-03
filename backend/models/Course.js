const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
    name: { type: String, required: true }, // kurs namesi
    fee: { type: Number, required: true }, // kurs narxi
    duration: { type: Number, required: true }, //kurs davomiyligi
    groupCount: { type: Number, required: true, default: 0 }, //guruhlar soni
    studentCount: { type: Number, required: true, default: 0 }, //talabalar soni
});

module.exports = mongoose.model('Course', CourseSchema);
