const express = require("express");
const router = express.Router();
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
  getStudentsByCourseId,
} = require("../controllers/groupController"); // Yo'nalish to'g'ri ekanligiga ishonch hosil qiling

// Guruhlar uchun marshrutlar
router.get("/", getGroups); // Barcha guruhlarni olish
router.get("/:id", getGroupById); // ID orqali guruhni olish
router.post("/", createGroup); // Guruh yaratish
router.put("/:id", updateGroup); // Guruhni tahrirlash
router.delete("/:id", deleteGroup); // Guruhni o‘chirish
router.get("/:id/students", getStudentsByCourseId);

module.exports = router;
