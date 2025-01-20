const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    direction: { type: String, required: true },
    topics: [{ type: String, required: true }], // Kursdagi mavzular
    studentCount: { type: Number, default: 0 }, // Kursdagi talabalar soni
    groupCount: { type: Number, default: 0 },   // Kursdagi guruhlar soni
    createdAt: { type: Date, default: Date.now }, // Qo‘shilgan sana
    type: { type: String, enum: ["Online", "Offline"], required: true }, // Kurs turi
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
