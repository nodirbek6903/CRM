const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getGroupsByCourseId,
} = require("../controllers/courseController"); // Yo'nalish to'g'ri ekanligiga ishonch hosil qiling

// Kurslar uchun marshrutlar
router.post("/", createCourse);
router.get("/", getCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id/groups", getGroupsByCourseId);

module.exports = router;
