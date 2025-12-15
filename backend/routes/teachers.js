const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher
} = require("../controllers/teacherController");

router.get("/", auth, allowRoles("Admin"), getAllTeachers);
router.post("/", auth, allowRoles("Admin"), addTeacher);
router.put("/:id", auth, allowRoles("Admin"), updateTeacher);
router.delete("/:id", auth, allowRoles("Admin"), deleteTeacher);

module.exports = router;
