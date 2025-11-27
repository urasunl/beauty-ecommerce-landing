import React from "react";

const VogueBanner = () => {
  return (
    <section
      className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center bg-cover bg-center shadow-lg shine-gold"
      style={ { height:"500px",
        backgroundImage: "url('/images/3203.jpg')", // 📌 Arka plan resmini buraya ekle
      }}
    >
      {/* Koyu Overlay (isteğe bağlı hafif gölge efekti) */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Yazılar */}
      <div className="relative text-center text-white z-10 max-w-3xl px-4">
        <h4 className="tracking-[0.4em] text-xs md:text-sm mb-4">
          FASHION EDITORIAL
        </h4>
        <h1 className="text-4xl md:text-6xl font-light uppercase">
          Timeless <span className="italic font-serif">Beauty</span>
        </h1>
        <p className="mt-4 text-sm md:text-lg text-gray-200">
          Vogue estetiğiyle modern zarafeti buluşturduk. Minimal çizgiler, sade
          dokular ve güçlü duruş.
        </p>

        
      </div>
    </section>
  );
};

export default VogueBanner;
