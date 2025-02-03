const Attendance = require("../models/Attendance");
const Group = require("../models/Group");
const Student = require("../models/Student");
const dayjs = require("dayjs");

// Guruhning lessonDays bo‘yicha sanalarni hisoblash
const generateAttendanceDates = (startDate, lessonDays) => {
  const dates = [];
  let currentDate = dayjs(startDate);
  let monthEnd = currentDate.add(1, "month").endOf("month");

  while (currentDate.isBefore(monthEnd)) {
    if (lessonDays.includes(currentDate.format("dddd").toLowerCase())) {
      dates.push(currentDate.format("YYYY-MM-DD"));
    }
    currentDate = currentDate.add(1, "day");
  }
  return dates;
};

// Guruh bo‘yicha davomatni olish
exports.getAttendance = async (req, res) => {
  try {
    const { groupId } = req.params;
    const attendance = await Attendance.find({ groupId }).populate("students.studentId");
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Serverda xatolik", error });
  }
};

// Yangi davomat qo‘shish yoki mavjudini yangilash
exports.createOrUpdateAttendance = async (req, res) => {
  try {
    const { groupId, date, students } = req.body;

    console.log("Received Data:", req.body); // 📌 Ma'lumotlar qanday kelayotganini tekshiramiz

    // Guruhni topamiz
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });

    // Guruhning studentlarini olamiz
    const studentList = await Student.find({ groupId });
    if (studentList.length === 0) return res.status(404).json({ message: "Guruhda studentlar yo‘q" });

    // Sana bo‘yicha attendance mavjud bo‘lsa, yangilaymiz
    let attendance = await Attendance.findOne({ groupId, date });

    if (attendance) {
      console.log("Old Attendance Topildi:", attendance); // 📌 Oldingi attendance borligini tekshiramiz

      // Eski attendance yangilanmoqda
      attendance.students = students.map((s) => ({
        studentId: s.studentId,
        present: s.present,
      }));

      await attendance.save();
      console.log("Updated Attendance:", attendance); // 📌 Yangi saqlangan attendance

      return res.status(200).json(attendance);
    } else {
      console.log("Yangi Attendance Yaratilmoqda...");

      // Yangi attendance yaratamiz
      const newAttendance = new Attendance({
        groupId,
        date,
        students: studentList.map((s) => ({
          studentId: s._id,
          present: 0, // Barcha studentlar boshlang‘ich holatda kelmagan deb saqlanadi
        })),
      });

      await newAttendance.save();
      console.log("New Attendance Saved:", newAttendance); // 📌 Yangi attendance saqlandi

      return res.status(201).json(newAttendance);
    }
  } catch (error) {
    console.error("Attendance Save Error: ", error); // 📌 Xatolik tafsilotlarini chiqarish
    res.status(500).json({ message: "Serverda xatolik", error: error.message });
  }
};

