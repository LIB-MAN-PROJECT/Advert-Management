const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Middleware: Check for JWT token and decode it
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
        const user= await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // Now req.user._id is valid!
    next();
  } catch (err) {
    console.log("JWT error", err)
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