const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllLeaves,
  addLeave,
  updateLeave,
  deleteLeave
} = require("../controllers/leaveController");

router.get("/", auth, allowRoles("Admin", "Teacher"), getAllLeaves);
router.post("/", auth, allowRoles("Student", "Teacher"), addLeave);
router.put("/:id", auth, allowRoles("Admin"), updateLeave);
router.delete("/:id", auth, allowRoles("Admin"), deleteLeave);

module.exports = router;
