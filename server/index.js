// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const productRoutes = require("./Routes/productRoutes");
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const orderRoutes = require("./Routes/orderRoutes");

const app = express();

// ÖNCE middleware
app.use(cors());
app.use(express.json());

// SONRA route'lar
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("API çalışıyor ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server ready on http://localhost:${PORT}`);
});
