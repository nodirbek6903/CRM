const express = require("express");
const {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} = require("../controllers/groupController");

const router = express.Router();

// Guruhlar marshrutlari
router.get("/", getGroups); // Barcha guruhlarni olish
router.get("/:id", getGroupById); // ID orqali guruhni olish
router.post("/", createGroup); // Guruh yaratish
router.put("/:id", updateGroup); // Guruhni tahrirlash
router.delete("/:id", deleteGroup); // Guruhni o‘chirish

module.exports = router;
