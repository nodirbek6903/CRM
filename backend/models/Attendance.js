const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  groupId: { type: mongoose.Schema.Types.ObjectId, ref: "Group", required: true },
  date: { type: String, required: true }, // "YYYY-MM-DD" formatida saqlanadi
  students: [
    {
      studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
      present: { type: Number, enum: [0, 1], default: 0 }, // 0 - kelmadi, 1 - keldi
    },
  ],
});

module.exports = mongoose.model("Attendance", attendanceSchema);
