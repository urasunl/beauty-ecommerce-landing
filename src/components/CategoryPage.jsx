// src/components/CategoryPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../services/productApi";
import { motion } from "framer-motion";

const CATEGORY_CONFIG = {
  ruj: {
    eyebrow: "BEAUTE CATEGORY · RUJ",
    title: "Ruj Koleksiyonu",
    description: "Velvet Rouge tonlariyla dudaklara couture dokunusu.",
    badge: "RUJ",
  },
  "fondöten": {
    eyebrow: "BEAUTE CATEGORY · FONDOTEN",
    title: "Fondoten Koleksiyonu",
    description: "Cilt tonunu esitleyen, runway etkili fondoten dokulari.",
    badge: "FONDOTEN",
  },
  oje: {
    eyebrow: "BEAUTE CATEGORY · OJE",
    title: "Oje Koleksiyonu",
    description: "Eller icin haute couture renk paleti.",
    badge: "OJE",
  },
  mascara: {
    eyebrow: "BEAUTE CATEGORY · MASCARA",
    title: "Mascara Koleksiyonu",
    description: "Bakislara editorial hacim kazandiran maskaralar.",
    badge: "MASCARA",
  },
};

export default function CategoryPage({ addToCart }) {
  const { slug } = useParams();
  const config = CATEGORY_CONFIG[slug] || CATEGORY_CONFIG["ruj"];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    fetchProducts(slug)
      .then((data) => {
        setProducts(data.products || []);
      })
      .catch((err) => {
        console.error("Kategori urunleri hata:", err);
        setError(err.message || "Urunler yuklenemedi.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#f5f5f5] to-[#e9e9e9] pt-24 pb-16 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Baslik */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            {config.eyebrow}
          </p>
          <h1 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-vogue tracking-[0.18em]">
            {config.title}
          </h1>
          <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            {config.description}
          </p>
        </div>

        {loading && (
          <p className="text-center text-sm text-gray-600">
            Urunler yukleniyor...
          </p>
        )}

        {error && (
          <p className="text-center text-sm text-red-600 mb-4">
            {error}
          </p>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center text-xs text-gray-500 border border-dashed border-gray-300 rounded-3xl py-10">
            Bu kategoride henuz bir urun yok. Admin panelden urun ekleyebilirsin.
          </div>
        )}

        {/* Urun grid'i */}
        <div className="grid gap-6 md:gap-8 md:grid-cols-3">
          {products.map((product) => {
            const imgSrc =
              product.imageUrl && product.imageUrl.trim() !== ""
                ? product.imageUrl
                : "/images/placeholder.jpg";

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white/90 rounded-3xl shadow-sm border border-black/5 overflow-hidden flex flex-col"
              >
                {/* Karta tiklayinca detay */}
                <Link
                  to={`/product/${product.id}`}
                  className="block flex-1"
                >
                  <div className="relative w-full h-64 md:h-72 overflow-hidden">
                    <img
                      src={imgSrc}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="px-5 pt-4 pb-3">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-1">
                      {config.badge}
                    </p>
                    <h3 className="text-base font-medium text-gray-900">
                      {product.name}
                    </h3>
                    {product.description && (
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </Link>

                {/* Fiyat + Sepete Ekle */}
                <div className="px-5 pb-4 flex items-center justify-between gap-3">
                  <div className="text-sm font-semibold text-gray-900">
                    ₺{Number(product.price || 0).toFixed(2)}
                  </div>
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="text-[10px] tracking-[0.25em] uppercase border border-black rounded-full px-4 py-1.5 hover:bg-black hover:text-white transition-colors"
                  >
                    Sepete Ekle
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
