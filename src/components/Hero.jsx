// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const heroSlides = [
  {
    id: 1,
    titleTop: "RUNWAY EDITORIAL",
    titleBig: "BEAUTÉ STUDIO",
    description: "Runway’den ilham alan seçkiler, günlük rutine uyarlanmış dokular.",
    image: "/images/1.jpg",
  },
  {
    id: 2,
    titleTop: "PARIS FASHION WEEK",
    titleBig: "HAUTE COUTURE BEAUTY",
    description: "Sahne ışıklarına göre tasarlanan formüller, şehir hayatına uyarlanıyor.",
    image: "/images/hero3.jpg",
  },
  {
    id: 3,
    titleTop: "LIMITED EDITION",
    titleBig: "NOIR LIP SCULPT",
    description: "Dramatik dudaklar için couture seviyesinde pigmentler.",
    image: "/images/3.jpg",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(
      () => setCurrent((prev) => (prev + 1) % heroSlides.length),
      7000
    );
    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="w-full bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        {/* Sol: metin */}
        <div className="space-y-4">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-400">
            {slide.titleTop}
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-vogue tracking-[0.18em] leading-tight">
            {slide.titleBig}
          </h1>
          <p className="text-sm md:text-base text-gray-200 max-w-md leading-relaxed">
            {slide.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => navigate(`/story/${slide.id}`)}
              className="text-[11px] tracking-[0.35em] uppercase border border-white px-6 py-2 hover:bg-white hover:text-black transition"
            >
              View Story
            </button>
            <button
              onClick={() =>
                document.getElementById("collection-section")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="text-[11px] tracking-[0.35em] uppercase border-b border-white pb-1"
            >
              Koleksiyonu Keşfet
            </button>
          </div>

          {/* Küçük pager */}
          <div className="flex items-center gap-2 pt-4">
            {heroSlides.map((s, index) => (
              <button
                key={s.id}
                onClick={() => setCurrent(index)}
                className={`h-[2px] w-6 ${
                  index === current ? "bg-white" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Sağ: büyük kapak görseli + imza kartı */}
        {/* Sağ: büyük kapak görseli + yarısı dışarıda imza kartı */}
<div className="relative">
  {/* Sadece görseli saran kabuk: overflow-hidden burada */}
  <div className="rounded-3xl overflow-hidden shadow-2xl">
    <img
      src={slide.image}
      alt={slide.titleBig}
      className="w-full h-[260px] md:h-[360px] lg:h-[420px] object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
  </div>

  {/* Yarı içeri / yarı dışarı görünen imza kartı */}
  <div
    className="
    absolute bg-white/85 backdrop-blur-sm rounded-2xl border border-black/5 shadow-lg
    px-3 py-2 md:px-4 md:py-3
    left-4 bottom-4
    md:left-10 md:bottom-10 md:-translate-x-0
  "
>
    <div className="font-signature text-2xl md:text-3xl leading-none text-black">
      Beauté
    </div>
    <div className="mt-1 text-[10px] tracking-[0.35em] uppercase text-gray-600">
      Editorial Cover
    </div>
  </div>
</div>

      </div>
    </section>
  );
}
