const Course = require("../models/Course");
const Group = require("../models/Group")

// Kurs yaratish
exports.createCourse = async (req, res) => {
  try {
    const { name, direction, topics, type } = req.body;

    if (!name || !direction || !topics || !type) {
      return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring" });
    }

    const newCourse = new Course({ name, direction, topics, type });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Kursni yaratishda xatolik yuz berdi", error });
  }
};

// Kurslarni olish
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Kurslarni olishda xatolik yuz berdi", error });
  }
};

// Kursni ID orqali olish
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Kursni olishda xatolik yuz berdi", error });
  }
};

// Kursni tahrirlash
exports.updateCourse = async (req, res) => {
  try {
    const { name, direction, topics } = req.body;

    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    course.name = name || course.name;
    course.direction = direction || course.direction;
    course.topics = topics || course.topics;

    await course.save();
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Kursni tahrirlashda xatolik yuz berdi", error });
  }
};

// Kursni o‘chirish
exports.deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    
    // Kursni topish
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    // Kursga tegishli guruhlarni tekshirish
    const groups = await Group.find({ course: courseId });

    if (groups.length > 0) {
      return res.status(400).json({
        message: "Bu kursga tegishli guruhlar mavjud. Oldin shu guruhlarni o'chirib tashlang.",
      });
    }

    // Agar guruhlar bo'lmasa, kursni o'chirish
    await Course.findByIdAndDelete(courseId);

    res.status(200).json({ message: "Kurs muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Kursni o‘chirishda xatolik yuz berdi", error });
  }
};

// Kursga tegishli guruhlarni tekshirish
exports.getGroupsByCourseId = async (req, res) => {
  try {
    const groups = await Group.find({ course: req.params.id });
    res.status(200).json(groups); // Guruhlar mavjudligini qaytarish
  } catch (error) {
    res.status(500).json({ message: "Guruhlarni olishda xatolik yuz berdi", error });
  }
};

