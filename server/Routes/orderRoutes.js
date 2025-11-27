// server/routes/orderRoutes.js
const express = require("express");
const prisma = require("../prisma");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

// Kullanıcı: kendi siparişlerini getir
// GET /api/orders/my
router.get("/my", auth, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
      include: {
        items: true,
      },
    });

    return res.json({ orders });
  } catch (err) {
    console.error("Get my orders error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

// Kullanıcı: yeni sipariş oluştur
// POST /api/orders
// body: { items: [{ productId, name, price, quantity }], total }
router.post("/", auth, async (req, res) => {
  try {
    const { items, total } = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Sepet boş olamaz." });
    }

    const order = await prisma.order.create({
      data: {
        userId: req.user.id,
        total,
        items: {
          create: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return res.status(201).json({ message: "Sipariş oluşturuldu.", order });
  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

// Admin: tüm siparişler
// GET /api/orders (admin)
router.get("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Yalnızca admin erişebilir." });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: true,
        items: true,
      },
    });

    return res.json({ orders });
  } catch (err) {
    console.error("Get all orders error:", err);
    return res.status(500).json({ message: "Sunucu hatası." });
  }
});

module.exports = router;
