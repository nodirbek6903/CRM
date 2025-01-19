const express = require("express")

const { getAllCourses, createCourse, updateCourse, deleteCourse} = require("../controllers/courseControllers")

const router = express.Router()

router.get("/", getAllCourses)
router.post("", createCourse)
router.put("/:id", updateCourse)
router.delete("/:id", deleteCourse)

module.exports = router