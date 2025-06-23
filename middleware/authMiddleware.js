const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware: Check for JWT token and decode it
const authenticate = async (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ✅ Middleware: Allow only vendors
const authorizeVendor = (req, res, next) => {
  if (req.user.role !== "vendor") {
    return res.status(403).json({ message: "Access denied. Only vendors allowed." });
  }
  next();
};

module.exports = { authenticate, authorizeVendor };