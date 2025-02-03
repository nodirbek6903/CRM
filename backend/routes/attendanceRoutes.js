const express = require("express");
const router = express.Router();
const { getAttendance, createOrUpdateAttendance } = require("../controllers/attendanceController");

router.get("/:groupId", getAttendance);
router.post("/", createOrUpdateAttendance);

module.exports = router;
