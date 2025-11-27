// src/components/CosmeticProductsSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { products } from "../data/products";

const cardVariants = {
  initial: { y: 0, opacity: 1, scale: 1 },
  hover: { y: -6, scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function CosmeticProductsSection({ addToCart }) {
  const navigate = useNavigate();

  return (
    <section
      id="collection-section"
      className="max-w-[1200px] mx-auto px-6 py-20"
    >
      <h2 className="text-3xl font-light tracking-wide uppercase mb-10">
        Beauty Collection
      </h2>

      {/* Ürün Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="group cursor-pointer"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* Resme tıklayınca ürün detay sayfasına git */}
            <div onClick={() => navigate(`/product/${product.id}`)}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-64 object-cover rounded-md group-hover:opacity-80 transition"
              />
            </div>

            <h3 className="mt-3 text-sm tracking-widest">{product.name}</h3>
            <p className="text-xs text-gray-500">₺{product.price}</p>

            {/* Sepete ekle */}
            <button
              onClick={() => addToCart(product)}
              className="mt-3 w-full text-[11px] tracking-widest uppercase border border-black py-2 
                         hover:bg-black hover:text-white transition-all duration-300"
            >
              Sepete Ekle
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
