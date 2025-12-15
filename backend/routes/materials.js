const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllMaterials,
  addMaterial,
  updateMaterial,
  deleteMaterial
} = require("../controllers/materialController");

router.get("/", auth, allowRoles("Admin", "Teacher", "Student"), getAllMaterials);
router.post("/", auth, allowRoles("Teacher"), addMaterial);
router.put("/:id", auth, allowRoles("Teacher"), updateMaterial);
router.delete("/:id", auth, allowRoles("Admin"), deleteMaterial);

module.exports = router;
