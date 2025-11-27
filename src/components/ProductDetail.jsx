// src/components/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProductById } from "../services/productApi";
import { motion } from "framer-motion";

export default function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProductById(id)
      .then((data) => {
        setProduct(data.product);
      })
      .catch((err) => {
        console.error("Product detail error:", err);
        setError(err.message || "Urun detayi yuklenemedi.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5] text-gray-600">
        Urun yukleniyor...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] text-gray-600 px-4">
        <p className="mb-4">
          {error || "Urun bulunamadi."}
        </p>
        <Link
          to="/"
          className="text-[11px] tracking-[0.35em] uppercase border border-black/20 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors"
        >
          Ana Sayfaya Don
        </Link>
      </div>
    );
  }

  const imgSrc =
    product.imageUrl && product.imageUrl.trim() !== ""
      ? product.imageUrl
      : "/images/placeholder.jpg";

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-[#e9e9e9] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Ust Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to={-1}
            className="text-[11px] tracking-[0.35em] uppercase text-gray-500 hover:text-black"
          >
            ← Geri Don
          </Link>
          {product.category && (
            <p className="text-[10px] tracking-[0.28em] uppercase text-gray-500">
              {product.category}
            </p>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid gap-8 md:grid-cols-[1.2fr,1fr] items-start bg-white/90 rounded-3xl border border-black/5 shadow-xl overflow-hidden"
        >
          {/* Buyuk gorsel */}
          <div className="relative w-full h-[360px] md:h-[480px] overflow-hidden">
            <img
              src={imgSrc}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Detaylar */}
          <div className="p-6 md:p-8 flex flex-col gap-4">
            <div>
              <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
                BEAUTE PRODUCT DETAIL
              </p>
              <h1 className="mt-2 text-2xl md:text-3xl font-vogue tracking-[0.18em]">
                {product.name}
              </h1>
            </div>

            <div className="text-sm text-gray-600 leading-relaxed">
              {product.description || "Bu urun icin henuz aciklama eklenmemis."}
            </div>

            <div className="mt-2">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Fiyat
              </p>
              <p className="text-xl font-semibold">
                ₺{Number(product.price || 0).toFixed(2)}
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="w-full text-center text-[11px] tracking-[0.35em] uppercase border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white transition-colors"
              >
                Sepete Ekle
              </button>
              <p className="text-[11px] text-gray-500 leading-relaxed">
                BEAUTE koleksiyonundaki bu urun, editorial secimler ve runway
                ilhamli renk paletiyle hazirlandi.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
