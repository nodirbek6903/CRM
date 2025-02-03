const Student = require("../models/Student");
const Group = require("../models/Group");
const Course = require("../models/Course");

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find().populate("courseId").populate("groupId");
        res.status(200).json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single student
exports.getStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate("courseId").populate("groupId");
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a student
exports.createStudent = async (req, res) => {
    try {
        const { name, phone, birthday, groupId, courseId, courseName, groupName, type } = req.body;

        if (!groupId) {
            return res.status(400).json({ message: "Group ID is required!" });
        }

        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ message: "Group not found!" });
        }

        // Telefon raqami oldindan mavjudligini tekshiramiz
        const existingStudent = await Student.findOne({ phone });
        if (existingStudent) {
            return res.status(400).json({ message: "Bu telefon raqami allaqachon mavjud!" });
        }

        const student = new Student({ name, phone, birthday, groupId, courseId, courseName, groupName, type });
        await student.save();

        group.studentCount = Math.max(group.studentCount, 0) + 1;
        await group.save();

        const course = await Course.findById(courseId)
        course.studentCount = Math.max(course.studentCount, 0) + 1;
        await course.save()

        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


// Update a student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: "Student not found" });
        res.status(200).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: "Student not found" });

        const group = await Group.findById(student.groupId);
        if (group) {
            group.studentCount = Math.max(0, group.studentCount - 1);

            // courseName mavjud emasligi sababli xatolik chiqmoqda, shu sababli uni kursdan olish kerak
            if (!group.courseName && group.courseId) {
                const course = await Course.findById(group.courseId);
                if (course) {
                    group.courseName = course.name;  // courseName maydoniga to‘g‘ri qiymat berish
                }
            }
            await group.save();

            if (group.courseId) {
                const course = await Course.findById(group.courseId);
                if (course) {
                    course.studentCount = Math.max(0, course.studentCount - 1);
                    await course.save();
                }
            }
        }

        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Student deleted successfully", studentId: student._id });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


