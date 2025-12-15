const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getUsers,
  createUser
} = require("../controllers/userController");

router.get("/", auth, allowRoles("Admin"), getUsers);
// router.put("/:id", auth, allowRoles("Admin"), updateUser);
// router.delete("/:id", auth, allowRoles("Admin"), deleteUser);

module.exports = router;
