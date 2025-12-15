const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllTimetables,
  addTimetable,
  updateTimetable,
  deleteTimetable
} = require("../controllers/timetableController");

router.get("/", auth, allowRoles("Admin", "Teacher", "Student"), getAllTimetables);
router.post("/", auth, allowRoles("Admin"), addTimetable);
router.put("/:id", auth, allowRoles("Admin"), updateTimetable);
router.delete("/:id", auth, allowRoles("Admin"), deleteTimetable);

module.exports = router;
