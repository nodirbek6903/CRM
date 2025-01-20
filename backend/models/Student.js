const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true }, // Tug'ilgan sana
    direction: { type: String, required: true },
    type: { type: String, enum: ["Online", "Offline"], required: true },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
    teacherName: { type: String, required: true},
    createdDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
