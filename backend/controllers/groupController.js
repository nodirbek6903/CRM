const Group = require('../models/Group');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Get all groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find().populate('courseId');
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single group
exports.getGroup = async (req, res) => {
    try {
        const group = await Group.findById(req.params.id).populate('courseId');
        if (!group) return res.status(404).json({ message: 'Group not found' });
        res.status(200).json(group);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a group
exports.createGroup = async (req, res) => {
  try {
    const {name, courseId} = req.body
      const course = await Course.findById(courseId);
      if (!course) return res.status(404).json({ message: 'Course not found' });

      // guruh mavjudligini oldindan tekshiramiz
        const existingGroup = await Group.findOne({ name });
        if (existingGroup) {
            return res.status(400).json({ message: 'Bunday guruh mavjud' });
        }

      const group = new Group(req.body);
      await group.save();

      const validationError = group.validateSync(); // Validationni tekshirish
      if (validationError) {
          return res.status(400).json({ error: validationError.message });
      }

      // Update groupCount in the course
      course.groupCount = Math.max(course.groupCount, 0) + 1;
      await course.save();

      res.status(201).json(group);
  } catch (err) {
      res.status(400).json({ error: err.message });
  }
};

// Update a group
exports.updateGroup = async (req, res) => {
    try {
        const group = await Group.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!group) return res.status(404).json({ message: 'Group not found' });

        const validationError = group.validateSync();
        if (validationError) {
            return res.status(400).json({ error: validationError.message });
        }

        res.status(200).json(group);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a group
exports.deleteGroup = async (req, res) => {
  try {
      const group = await Group.findById(req.params.id);
      if (!group) return res.status(404).json({ message: 'Group not found' });

      // studentni tekshirish
      const studentsInGroup = await Student.find({ groupId: req.params.id });
      if (studentsInGroup.length > 0) {
          return res.status(400).json({ message: 'Bu guruhga tegishli studentlar mavjud' });
      }

      await Group.findByIdAndDelete(req.params.id);

      // Update groupCount in the course
      const course = await Course.findById(group.courseId);
      if (course) {
        course.groupCount = Math.max(0, course.groupCount - 1);
          await course.save();
      }

      res.status(200).json({ message: 'Group deleted successfully' });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};

exports.fetchGroupsByCourse = async (req, res) => {
    try {
        const groups = await Group.find({ courseId: req.params.courseId });
        
        if (!groups.length) {
            return res.status(404).json({ message: "Ushbu kursga tegishli guruhlar topilmadi" });
        }

        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

