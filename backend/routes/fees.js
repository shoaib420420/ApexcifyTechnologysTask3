const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const allowRoles = require("../middleware/roles");
const {
  getAllFees,
  addFee,
  updateFee,
  deleteFee
} = require("../controllers/feeController");

router.get("/", auth, allowRoles("Admin"), getAllFees);
router.post("/", auth, allowRoles("Admin"), addFee);
router.put("/:id", auth, allowRoles("Admin"), updateFee);
router.delete("/:id", auth, allowRoles("Admin"), deleteFee);

module.exports = router;
