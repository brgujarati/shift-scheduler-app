// /middleware/verifyToken.js
const jwt = require("jsonwebtoken");
require("dotenv").config(); // ✅ Load env variables

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // ✅ Token from cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id }; // ✅ Attach user ID to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }
};

module.exports = verifyToken;
