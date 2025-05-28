const express = require("express");
const { route } = require("./authRoutes");
const router = express.Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/shifts", require("./shiftRoutes"));

module.exports = router;
