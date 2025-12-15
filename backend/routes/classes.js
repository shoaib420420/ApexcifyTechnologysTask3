const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllClasses,
  addClass,
  updateClass,
  deleteClass
} = require("../controllers/classController");

router.get("/", auth, allowRoles("Admin", "admin", "Teacher", "teacher"), getAllClasses);
router.post("/", auth, allowRoles("Admin", "admin"), addClass);
router.put("/:id", auth, allowRoles("Admin", "admin"), updateClass);
router.delete("/:id", auth, allowRoles("Admin", "admin"), deleteClass);

module.exports = router;
