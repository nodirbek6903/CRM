const mongoose = require("mongoose");
const Group = require("../models/Group");
const Course = require("../models/Course");
const Student = require("../models/Student");

// Barcha guruhlarni olish
exports.getGroups = async (req, res) => {
  const { type } = req.query; // Filter orqali turli tiplarni olish (Online/Offline)

  try {
    const groups = await Group.find()
      .populate("course", "name direction type") // Kursni o'z ichiga olgan holda
      .exec();

    // Agar filter (type) bo'lsa, guruhlarni kursning `type`ga qarab filtrlash
    if (type) {
      const filteredGroups = groups.filter(group => 
        group.course.type.toLowerCase() === type.toLowerCase()
      );
      return res.status(200).json(filteredGroups);
    }

    res.status(200).json(groups); // Agar filter bo'lmasa, barcha guruhlarni qaytarish
  } catch (error) {
    res.status(500).json({ message: "Guruhlarni olishda xatolik yuz berdi", error });
  }
};

// ID orqali guruhni olish
exports.getGroupById = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("course", "name direction type");
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Guruhni olishda xatolik yuz berdi", error });
  }
};

// Guruh yaratish
exports.createGroup = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, direction, course, lessonDays, startDate, teacherName, roomNumber } = req.body;

    const selectedCourse = await Course.findById(course).session(session);
    if (!selectedCourse) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Kurs topilmadi" });
    }

    const group = new Group({
      name,
      direction,
      course,
      lessonDays,
      startDate,
      teacherName,
      roomNumber: selectedCourse.type === "Offline" ? roomNumber : null, // faqat offline kurslar uchun
    });

    await group.save({ session });

    // Kursdagi guruhlar sonini yangilash
    selectedCourse.groupCount += 1;
    await selectedCourse.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(group);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Guruhni yaratishda xatolik yuz berdi", error });
  }
};

// Guruhni tahrirlash
exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, direction, lessonDays, startDate, teacherName, roomNumber } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const group = await Group.findById(id).session(session);
    if (!group) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Guruh topilmadi" });
    }

    // Guruhdagi qiymatlarni yangilash
    group.name = name || group.name;
    group.direction = direction || group.direction;
    group.lessonDays = lessonDays || group.lessonDays;
    group.startDate = startDate || group.startDate;
    group.teacherName = teacherName || group.teacherName;

    // Kurs tipi offline bo'lsa, xona raqamini yangilash
    const course = await Course.findById(group.course).session(session);
    if (course && course.type.toLowerCase() === "offline") {
      group.roomNumber = roomNumber || group.roomNumber;
    }

    await group.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(group);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Guruhni tahrirlashda xatolik yuz berdi", error });
  }
};

// Guruhni o‘chirish
exports.deleteGroup = async (req, res) => {
  const { id } = req.params;
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const group = await Group.findById(id).session(session);
    if (!group) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Guruh topilmadi" });
    }

    await Group.deleteOne({ _id: id }, { session });

    // Kursdagi guruhlar sonini yangilash
    const course = await Course.findById(group.course).session(session);
    if (course) {
      course.groupCount = Math.max(0, course.groupCount - 1);
      await course.save({ session });
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Guruh muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: "Guruhni o‘chirishda xatolik yuz berdi", error });
  }
};

// Guruhga tegishli studentlarni tekshirish
exports.getStudentsByCourseId = async (req, res) => {
  try {
    const students = await Student.find({ group: req.params.id });
    res.status(200).json(students); // Studentlar mavjudligini qaytarish
  } catch (error) {
    res.status(500).json({ message: "Studentlarni olishda xatolik yuz berdi", error });
  }
};
