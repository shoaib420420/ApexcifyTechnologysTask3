const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllNotifications,
  addNotification,
  updateNotification,
  deleteNotification
} = require("../controllers/notificationController");

router.get("/", auth, allowRoles("Admin", "Teacher", "Student"), getAllNotifications);
router.post("/", auth, allowRoles("Admin", "Teacher"), addNotification);
router.put("/:id", auth, allowRoles("Admin"), updateNotification);
router.delete("/:id", auth, allowRoles("Admin"), deleteNotification);

module.exports = router;
