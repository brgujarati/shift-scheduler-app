const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  createShift,
  getAllShifts,
  updateShift,
  deleteShift,
  getShiftsByEmployee,
} = require("../controllers/shiftController");

// Create
router.post("/", verifyToken, verifyAdmin, createShift);
router.get("/", verifyToken, verifyAdmin, getAllShifts);
router.put("/:id", verifyToken, verifyAdmin, updateShift);
router.delete("/:id", verifyToken, verifyAdmin, deleteShift);
router.get("/employee/:id", verifyToken, getShiftsByEmployee);

module.exports = router;
