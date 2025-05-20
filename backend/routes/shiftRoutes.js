const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const {
  createShift,
  getAllShifts,
  updateShift,
  deleteShift,
} = require("../controllers/shiftController");

// Create
router.post("/", verifyToken, verifyAdmin, createShift);
router.get("/", verifyToken, verifyAdmin, getAllShifts);
router.get("/:id", verifyToken, verifyAdmin, updateShift);
router.delete("/:id", verifyToken, verifyAdmin, deleteShift);

module.exports = router;
