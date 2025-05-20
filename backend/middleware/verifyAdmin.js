const User = require("../models/User");

const verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }
    next(); // ✅ allowed
  } catch (err) {
    return res.status(500).json({ message: "Access check failed" });
  }
};

module.exports = verifyAdmin;
