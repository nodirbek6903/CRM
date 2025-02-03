const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/', courseController.getCourses); // Get all courses
router.get('/:id', courseController.getCourse); // Get a single course by ID
router.post('/', courseController.createCourse); // Create a new course
router.put('/:id', courseController.updateCourse); // Update a course by ID
router.delete('/:id', courseController.deleteCourse); // Delete a course by ID

module.exports = router;
