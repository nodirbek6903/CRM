const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/group/:groupId', attendanceController.getAttendanceByGroup); // Get attendance for a specific group
router.post('/', attendanceController.createAttendance); // Create attendance for a group

module.exports = router;
