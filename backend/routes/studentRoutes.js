const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.get('/', studentController.getStudents); // Get all students
router.get('/:id', studentController.getStudent); // Get a single student by ID
router.post('/', studentController.createStudent); // Create a new student
router.put('/:id', studentController.updateStudent); // Update a student by ID
router.delete('/:id', studentController.deleteStudent); // Delete a student by ID

module.exports = router;
