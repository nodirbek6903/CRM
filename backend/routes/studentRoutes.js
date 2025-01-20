const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController");

const router = express.Router();

// Talabalar marshrutlari
router.get("/", getStudents); // Barcha talabalarni olish
router.get("/:id", getStudentById); // ID orqali talabani olish
router.post("/", createStudent); // Talaba yaratish
router.put("/:id", updateStudent); // Talabani tahrirlash
router.delete("/:id", deleteStudent); // Talabani o‘chirish

module.exports = router;
