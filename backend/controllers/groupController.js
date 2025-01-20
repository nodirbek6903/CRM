const Group = require("../models/Group");
const Course = require("../models/Course");

// Barcha guruhlarni olish
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
  const { name, direction, course, lessonDays, startDate, teacherName, roomNumber } = req.body;

  try {
    const selectedCourse = await Course.findById(course);
    if (!selectedCourse) return res.status(404).json({ message: "Kurs topilmadi" });

    const group = new Group({
      name,
      direction,
      course,
      lessonDays,
      startDate,
      teacherName,
      roomNumber: selectedCourse.type === "Offline" ? roomNumber : null, // faqat offline kurslar uchun
    });

    await group.save();

    // Kursdagi guruhlar sonini yangilash
    selectedCourse.groupCount += 1;
    await selectedCourse.save();

    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: "Guruhni yaratishda xatolik yuz berdi", error });
  }
};

// Guruhni tahrirlash
exports.updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, direction, lessonDays, startDate, teacherName, roomNumber } = req.body;

  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });

    // Guruhdagi qiymatlarni yangilash
    group.name = name || group.name;
    group.direction = direction || group.direction;
    group.lessonDays = lessonDays || group.lessonDays;
    group.startDate = startDate || group.startDate;
    group.teacherName = teacherName || group.teacherName;
    if (group.course.type === "offline") group.roomNumber = roomNumber;

    await group.save();
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: "Guruhni tahrirlashda xatolik yuz berdi", error });
  }
};

// Guruhni o‘chirish
exports.deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const group = await Group.findById(id);
    if (!group) return res.status(404).json({ message: "Guruh topilmadi" });

    await Group.deleteOne({ _id: id });

    // Kursdagi guruhlar sonini yangilash
    const course = await Course.findById(group.course);
    if (course) {
      course.groupCount = Math.max(0, course.groupCount - 1);
      await course.save();
    }

    res.status(200).json({ message: "Guruh muvaffaqiyatli o‘chirildi" });
  } catch (error) {
    res.status(500).json({ message: "Guruhni o‘chirishda xatolik yuz berdi", error });
  }
};
