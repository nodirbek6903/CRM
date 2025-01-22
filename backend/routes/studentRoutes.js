const express = require("express");
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/studentController"); // Yo'nalish to'g'ri ekanligiga ishonch hosil qiling

// Talabalar uchun marshrutlar
router.get("/", getStudents); // Barcha talabalarni olish
router.get("/:id", getStudentById); // ID orqali talabani olish
router.post("/", createStudent); // Talaba yaratish
router.put("/:id", updateStudent); // Talabani tahrirlash
router.delete("/:id", deleteStudent); // Talabani o‘chirish

module.exports = router;
