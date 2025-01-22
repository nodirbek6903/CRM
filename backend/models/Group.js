const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    direction: { type: String, required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Kursga referensiya
      required: true,
    },
    lessonDays: { type: [String], required: true }, //
    startDate: { type: Date, required: true },
    createdDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["active", "No Active"],
      default: "No Active",
    },
    studentCount: { type: Number, default: 0 },
    teacherName: { type: String, required: true },
    roomNumber: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
