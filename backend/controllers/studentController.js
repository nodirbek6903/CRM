const Student = require("../models/Student");
const Course = require("../models/Course");
const Group = require("../models/Group");

// Barcha talabalarni olish
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("course", "name direction type")
      .populate("group", "name direction");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Talabalarni olishda xatolik yuz berdi", error });
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
    res.status(500).json({ message: "Talabani olishda xatolik yuz berdi", error });
  }
};

// Talaba yaratish
exports.createStudent = async (req, res) => {
  const { name, phone, dob, direction, type, course, group } = req.body;

  try {
    // Kurs va guruh mavjudligini tekshirish
    const selectedCourse = await Course.findById(course);
    if (!selectedCourse) return res.status(404).json({ message: "Kurs topilmadi" });

    const selectedGroup = await Group.findById(group);
    if (!selectedGroup) return res.status(404).json({ message: "Guruh topilmadi" });

    // Kurs va guruh turlarining mosligini tekshirish
    if (selectedCourse.type !== type || selectedGroup.type !== type) {
      return res.status(400).json({
        message: `Tanlangan kurs turi (${selectedCourse.type}) va guruh turi (${selectedGroup.type}) mos emas.`,
      });
    }

    // Talabani yaratish
    const student = new Student({
      name,
      phone,
      dob,
      direction,
      type,
      course,
      group,
    });

    await student.save();

    // Kurs va guruhdagi studentlar sonini yangilash
    selectedCourse.studentCount += 1;
    await selectedCourse.save();

    selectedGroup.studentCount += 1;
    if (selectedGroup.studentCount >= 10 && selectedGroup.status === "noActive") {
      selectedGroup.status = "active";
    }
    await selectedGroup.save();

    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: "Talabani yaratishda xatolik yuz berdi", error });
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
    res.status(500).json({ message: "Talabani tahrirlashda xatolik yuz berdi", error });
  }
};

// Talabani o‘chirish
exports.deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ message: "Talaba topilmadi" });

    await Student.deleteOne({ _id: id });

    // Kurs va guruhdagi studentlar sonini yangilash
    const course = await Course.findById(student.course);
    if (course) {
      course.studentCount = Math.max(0, course.studentCount - 1);
      await course.save();
    }

    const group = await Group.findById(student.group);
    if (group) {
      group.studentCount = Math.max(0, group.studentCount - 1);
      if (group.studentCount < 10 && group.status === "active") {
        group.status = "noActive";
      }
      await group.save();
    }

    res.status(200).json({ message: "Talaba muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Talabani o‘chirishda xatolik yuz berdi", error });
  }
};
