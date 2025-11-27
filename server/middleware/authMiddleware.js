// server/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Yetkisiz. Token bulunamadı." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "dev_secret");
    req.user = decoded; // { id, email, role ... }
    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Geçersiz token." });
  }
};
