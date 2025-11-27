// server/routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");
require("dotenv").config();

const router = express.Router();

// Ortak token oluşturucu
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

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email ve şifre zorunludur." });
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return res
        .status(409)
        .json({ message: "Bu email ile zaten kayıt var." });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
        name,
      },
    });

    const token = createToken(user);

    return res.status(201).json({
      message: "Kayıt başarılı.",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email ve şifre zorunludur." });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "Email veya şifre hatalı." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Email veya şifre hatalı." });
    }

    const token = createToken(user);

    return res.json({
      message: "Giriş başarılı.",
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

module.exports = router;
