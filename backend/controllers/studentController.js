const Student = require("../models/Student");
const Course = require("../models/Course");
const Group = require("../models/Group");
const mongoose = require("mongoose");

// Barcha talabalarni olish
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("course", "name direction type")
      .populate("group", "name direction");
    res.status(200).json(students);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Talabalarni olishda xatolik yuz berdi", error });
  }
};

// ID orqali talabani olish
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate("course", "name direction type")
      .populate("group", "name direction");
    if (!student) return res.status(404).json({ message: "Talaba topilmadi" });
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Talabani olishda xatolik yuz berdi", error });
  }
};

// Talaba yaratish
exports.createStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, phone, dob, direction, type, course, group } = req.body;

    const selectedCourse = await Course.findById(course).session(session);
    if (!selectedCourse) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    const selectedGroup = await Group.findById(group).session(session);
    if (!selectedGroup) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Guruh topilmadi" });
    }

    const teacher = selectedGroup.teacherName;
    if (!teacher) {
      await session.abortTransaction();
      session.endSession();
      return res.status(400).json({ message: "Guruhda o'qituvchi nomi yo'q" });
    }

    const student = new Student({
      name,
      phone,
      dob,
      direction,
      type,
      course,
      group,
      teacherName: teacher,
    });

    await student.save({ session });

    selectedCourse.studentCount += 1;
    await selectedCourse.save({ session });

    selectedGroup.studentCount += 1;
    if (
      selectedGroup.studentCount >= 10 &&
      selectedGroup.status === "noActive"
    ) {
      selectedGroup.status = "active";
    }
    await selectedGroup.save({ session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json(student);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Talabani yaratishda xatolik:", error);
    res
      .status(500)
      .json({ message: "Talabani yaratishda xatolik yuz berdi", error });
  }
};

// Talabani tahrirlash
exports.updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, phone, dob } = req.body;

  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Talaba topilmadi" });

    student.name = name || student.name;
    student.phone = phone || student.phone;
    student.dob = dob || student.dob;

    await student.save();
    res.status(200).json(student);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Talabani tahrirlashda xatolik yuz berdi", error });
  }
};

// Talabani o‘chirish
// Talabani o‘chirish
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Studentni topish
    const student = await Student.findById(id).session(session);
    if (!student) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Talaba topilmadi" });
    }

    // Course va Group bilan bog'liq malumotlarni yangilash
    if (student.course) {
      const course = await Course.findById(student.course).session(session);
      if (course) {
        course.studentCount = Math.max(0, course.studentCount - 1);
        await course.save({ session });
      }
    }

    if (student.group) {
      const group = await Group.findById(student.group).session(session);
      if (group) {
        group.studentCount = Math.max(0, group.studentCount - 1);
        if (group.studentCount < 10) {
          group.status = "No Active";
        }
        await group.save({ session });
      }
    }

    // Talabani o'chirish
    await Student.deleteOne({ _id: id }, { session });

    // Transactionni yakunlash
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Talaba muvaffaqiyatli o'chirildi" });
  } catch (error) {
    // Xatolik bo'lsa, transaksiyani bekor qilish
    await session.abortTransaction();
    session.endSession();

    console.error("Talabani o'chirishda xatolik:", error);
    res.status(500).json({ message: "Talabani o'chirishda xatolik yuz berdi", error });
  }
};

