// server/routes/userRoutes.js
const express = require("express");
const prisma = require("../prisma");
const auth = require("../middleware/authMiddleware");
const jwt = require("jsonwebtoken");

const router = express.Router();

function createToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// GET /api/user/me
router.get("/me", auth, async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    return res.json({ user });
  } catch (err) {
    console.error("Get me error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

// PUT /api/user/me
router.put("/me", auth, async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email zorunludur." });
    }

    const existing = await prisma.user.findFirst({
      where: {
        email,
        NOT: { id: req.user.id },
      },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Bu email başka bir hesapta kayıtlı." });
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: {
        email,
        name,
      },
    });

    const token = createToken(updated);

    return res.json({
      message: "Profil güncellendi.",
      token,
      user: {
        id: updated.id,
        email: updated.email,
        name: updated.name,
        role: updated.role,
      },
    });
  } catch (err) {
    console.error("Update me error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

module.exports = router;
