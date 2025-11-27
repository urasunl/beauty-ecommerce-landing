// server/Routes/productRoutes.js
const express = require("express");
const prisma = require("../prisma"); 
const auth = require("../middleware/authMiddleware");




const router = express.Router();

/**
 * PUBLIC: Tüm ürünler (isteğe bağlı kategori filtresi)
 * GET /api/products?category=ruj
 */
router.get("/", async (req, res) => {
  try {
    const { category } = req.query;

    const where = {};
    if (category) {
      where.category = category;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return res.json({ products });
  } catch (err) {
    console.error("Get products error:", err);
    return res.status(500).json({ message: "Ürünler alınırken sunucu hatası." });
  }
});

/**
 * PUBLIC: Tek ürün
 * GET /api/products/:id
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Geçersiz ürün ID." });
    }

    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }

    return res.json({ product });
  } catch (err) {
    console.error("Get product error:", err);
    return res.status(500).json({ message: "Ürün alınırken sunucu hatası." });
  }
});

/**
 * ADMIN: Ürün oluştur
 * POST /api/products
 */
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Yalnızca admin erişebilir." });
    }

    const { name, slug, price, description, imageUrl, category } = req.body;

    if (!name || !slug || price == null) {
      return res
        .status(400)
        .json({ message: "Name, slug ve price alanları zorunludur." });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice)) {
      return res
        .status(400)
        .json({ message: "Price sayısal bir değer olmalıdır." });
    }

    const existing = await prisma.product.findUnique({
      where: { slug },
    });

    if (existing) {
      return res.status(409).json({ message: "Bu slug zaten kullanılıyor." });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        price: numericPrice,
        description: description || null,
        imageUrl: imageUrl || null,
        category: category || null,
      },
    });

    return res.status(201).json({ message: "Ürün oluşturuldu.", product });
  } catch (err) {
    console.error("Create product error:", err);
    return res.status(500).json({ message: "Ürün oluşturulurken sunucu hatası." });
  }
});

/**
 * ADMIN: Ürün güncelle
 * PUT /api/products/:id
 */
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Yalnızca admin erişebilir." });
    }

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Geçersiz ürün ID." });
    }

    const current = await prisma.product.findUnique({ where: { id } });
    if (!current) {
      return res.status(404).json({ message: "Ürün bulunamadı." });
    }

    const { name, slug, price, description, imageUrl, category } = req.body;

    if (slug && slug !== current.slug) {
      const existing = await prisma.product.findUnique({ where: { slug } });
      if (existing) {
        return res
          .status(409)
          .json({ message: "Bu slug başka üründe kullanılıyor." });
      }
    }

    let numericPrice = current.price;
    if (price != null) {
      const tmp = Number(price);
      if (Number.isNaN(tmp)) {
        return res
          .status(400)
          .json({ message: "Price sayısal bir değer olmalıdır." });
      }
      numericPrice = tmp;
    }

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: name ?? current.name,
        slug: slug ?? current.slug,
        price: numericPrice,
        description: description ?? current.description,
        imageUrl: imageUrl ?? current.imageUrl,
        category: category ?? current.category,
      },
    });

    return res.json({ message: "Ürün güncellendi.", product: updated });
  } catch (err) {
    console.error("Update product error:", err);
    return res.status(500).json({ message: "Ürün güncellenirken sunucu hatası." });
  }
});

/**
 * ADMIN: Ürün sil
 * DELETE /api/products/:id
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Yalnızca admin erişebilir." });
    }

    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: "Geçersiz ürün ID." });
    }

    await prisma.product.delete({
      where: { id },
    });

    return res.json({ message: "Ürün silindi." });
  } catch (err) {
    console.error("Delete product error:", err);
    return res.status(500).json({ message: "Ürün silinirken sunucu hatası." });
  }
});

module.exports = router;
