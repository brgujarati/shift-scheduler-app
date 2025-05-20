const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");
const parser = require("../middleware/multer");

const {
  getMyProfile,
  updateMyProfile,
  uploadProfilePic,
  getAllEmployees,
} = require("../controllers/userController");

// 👇 Token is verified here
router.get("/profile", verifyToken, getMyProfile);
router.put("/profile", verifyToken, updateMyProfile);
router.post(
  "/profile/photo",
  verifyToken,
  parser.single("profilePic"),
  uploadProfilePic
);
router.get("/employees", verifyToken, verifyAdmin, getAllEmployees);

module.exports = router;
