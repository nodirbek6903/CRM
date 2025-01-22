const mongoose = require("mongoose");
const Course = require("../models/Course");
const Group = require("../models/Group");

// Kurs yaratish
exports.createCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, direction, topics, type } = req.body;

    if (!name || !direction || !topics || !type) {
      return res.status(400).json({ message: "Barcha maydonlarni to‘ldiring" });
    }

    const newCourse = new Course({ name, direction, topics, type });
    await newCourse.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(newCourse);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Kursni yaratishda xatolik yuz berdi", error: error.message });
  }
};

// Kurslarni olish
exports.getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Kurslarni olishda xatolik yuz berdi", error: error.message });
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
    console.error(error);
    res.status(500).json({ message: "Kursni olishda xatolik yuz berdi", error: error.message });
  }
};

// Kursni tahrirlash
exports.updateCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, direction, topics } = req.body;

    const course = await Course.findById(req.params.id).session(session);

    if (!course) {
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    course.name = name || course.name;
    course.direction = direction || course.direction;
    course.topics = topics || course.topics;

    await course.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(course);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Kursni tahrirlashda xatolik yuz berdi", error: error.message });
  }
};

// Kursni o‘chirish
exports.deleteCourse = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const courseId = req.params.id;

    // Kursni topish
    const course = await Course.findById(courseId).session(session);

    if (!course) {
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    // Agar guruhlar bo'lmasa, kursni o'chirish
    await Course.findByIdAndDelete(courseId).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Kurs muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({ message: "Kursni o‘chirishda xatolik yuz berdi", error: error.message });
  }
};

// Kursga tegishli guruhlarni tekshirish
exports.getGroupsByCourseId = async (req, res) => {
  try {
    const groups = await Group.find({ course: req.params.id });
    res.status(200).json(groups); // Guruhlar mavjudligini qaytarish
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Guruhlarni olishda xatolik yuz berdi", error: error.message });
  }
};
