const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const { getAllStudents, addStudent, updateStudent, deleteStudent } = require("../controllers/studentController");

router.get("/", auth, allowRoles("Admin", "Teacher"), getAllStudents);
router.post("/", auth, allowRoles("Admin"), addStudent);
router.put("/:id", auth, allowRoles("Admin"), updateStudent);
router.delete("/:id", auth, allowRoles("Admin"), deleteStudent);

module.exports = router;
