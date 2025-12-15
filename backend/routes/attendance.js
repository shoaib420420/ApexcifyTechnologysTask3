const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllAttendance,
  addAttendance,
  updateAttendance,
  deleteAttendance
} = require("../controllers/attendanceController");

router.get("/", auth, allowRoles("Admin", "Teacher"), getAllAttendance);
router.post("/", auth, allowRoles("Teacher"), addAttendance);
router.put("/:id", auth, allowRoles("Teacher"), updateAttendance);
router.delete("/:id", auth, allowRoles("Admin"), deleteAttendance);

module.exports = router;
