// src/components/CategoryEditorial.jsx
import React from "react";
import { motion } from "framer-motion";

const categories = [
  {
    id: "ruj",
    label: "Ruj",
    eyebrow: "LIP EDITORIAL",
    title: "Velvet Rouge Collection",
    description:
      "Yüksek pigmentli, kadife dokulu rujlarla geceyi yeniden tanımla.",
    image: "/images/lipstick.jpg",
  },
  {
    id: "fondöten",
    label: "Fondöten",
    eyebrow: "SKINCARE STORY",
    title: "Glow Skin Ritual",
    description:
      "Serum ve kremlerle cilde runway ışıltısı kazandıran bakım rutinleri.",
    image: "/images/foundation.jpg",
  },
  {
    id: "oje",
    label: "Krem",
    eyebrow: "HYDRATION EDIT",
    title: "Silk Touch Creams",
    description:
      "Yoğun nemlendirici kremler ile pürüzsüz bir cilt dokusu.",
    image: "/images/oje.jpg",
  },
  {
    id: "mascara",
    label: "Mascara",
    eyebrow: "NAIL LACQUER",
    title: "Runway Nails",
    description:
      "Parlak ve kalıcı ojelerle couture tarzını ellerine taşı.",
    image: "/images/mascara.jpg",
  },
];

const blockVariants = {
  hiddenLeft: { opacity: 0, y: 20, x: -40 },
  hiddenRight: { opacity: 0, y: 20, x: 40 },
  visible: { opacity: 1, y: 0, x: 0 },
};

export default function CategoryEditorial() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5f5f5] to-[#e8e8e8] py-20 md:py-28">
      {/* Noise / doku overlay (isteğe bağlı) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-soft-light"
        style={{ backgroundImage: "url('/images/noise.png')" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-24">
        {/* Üst başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-4"
        >
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ CATEGORIES
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl lg:text-4xl font-vogue tracking-[0.18em]">
            Curated Beauty Edits
          </h2>
          <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
            Ruj, bakım, krem ve oje koleksiyonları; runway’den ilham alan,
            günlük rutine uyarlanmış editoryal seçkiler.
          </p>
        </motion.div>

        {categories.map((cat, index) => {
          const fromLeft = index % 2 === 0;
          const isLast = index === categories.length - 1;

          return (
            <React.Fragment key={cat.id}>
              <motion.div
                id={cat.id}
                className="grid md:grid-cols-2 gap-10 md:gap-14 items-center"
                variants={blockVariants}
                initial={fromLeft ? "hiddenLeft" : "hiddenRight"}
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {/* Görsel */}
                <motion.div
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`relative rounded-3xl shadow-lg cursor-pointer ${
                    fromLeft ? "" : "md:order-2"
                  }`}
                  onClick={() => (window.location.href = `/category/${cat.id}`)}
                >
                  {/* Sadece görseli kırpan iç kap */}
                  <div className="rounded-3xl overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="w-full h-[240px] sm:h-[300px] md:h-[420px] object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* İmza kartı – mobilde içeride, desktop’ta yarısı dışarıda */}
                  <div
                    className="
    absolute bg-white/85 backdrop-blur-sm rounded-2xl border border-black/5 shadow-lg
    px-3 py-2 md:px-4 md:py-3
    left-4 bottom-4
    md:left-10 md:bottom-10 md:-translate-x-0
  "
>
                    <div className="font-signature text-xl sm:text-2xl md:text-3xl leading-none text-black">
                      Beauté
                    </div>
                    <div className="mt-1 text-[9px] sm:text-[10px] tracking-[0.28em] sm:tracking-[0.35em] uppercase text-gray-600">
                      Editorial Cover
                    </div>
                  </div>
                </motion.div>

                {/* Metin */}
                <div
                  className={`space-y-4 text-gray-800 ${
                    fromLeft ? "" : "md:order-1"
                  }`}
                >
                  <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
                    {cat.eyebrow}
                  </p>

                  <h3 className="text-2xl md:text-3xl font-vogue tracking-[0.12em] leading-tight">
                    {cat.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed max-w-md">
                    {cat.description}
                  </p>

                  <a
                    href={`/category/${cat.id}`}
                    className="inline-block text-[11px] tracking-[0.35em] uppercase border-b border-black/40 pb-1 hover:border-black transition-colors"
                  >
                    Koleksiyonu Gör
                  </a>
                </div>
              </motion.div>

              {/* Editorial bloklar arasındaki siyah yatay boşluk */}
              {!isLast && (
                <div className="my-10 md:my-14">
                  <div className="h-[2px] w-full bg-black/80 rounded-full" />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </section>
  );
}
