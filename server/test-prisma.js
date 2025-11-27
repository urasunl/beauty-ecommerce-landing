// server/test-prisma.js
const prisma = require("./prisma");

async function main() {
  console.log("Prisma modelleri:", Object.keys(prisma));

  try {
    const products = await prisma.product.findMany();
    console.log("Product tablosu OK, ürün sayısı:", products.length);
  } catch (e) {
    console.error("findMany hatası:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
