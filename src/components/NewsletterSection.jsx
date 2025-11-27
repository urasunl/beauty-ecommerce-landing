// src/components/NewsletterSection.jsx
import React from "react";
import { motion } from "framer-motion";

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-black text-white py-16 md:py-20">
      {/* Hafif doku / noise (isteğe bağlı) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-soft-light"
        style={{ backgroundImage: "url('/images/1.jpg')" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-[11px] tracking-[0.35em] uppercase text-gray-400"
        >
          NEWSLETTER
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="mt-3 text-2xl md:text-3xl font-vogue tracking-[0.18em]"
        >
          Beauté Journal
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="mt-4 text-sm md:text-base text-gray-200 leading-relaxed"
        >
          Runway’den backstage’e, oradan günlük rutine… Yeni koleksiyonlar,
          editoryal hikayeler ve sadece abonelere özel içerikler için e-posta
          listemize katıl.
        </motion.p>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            // Şimdilik sadece console log, backend eklenince değiştirirsin
            console.log("Newsletter submit");
          }}
        >
          <input
            type="email"
            required
            placeholder="E-posta adresin"
            className="w-full sm:w-72 md:w-80 px-4 py-2.5 rounded-full bg-white/5 border border-white/30 text-sm outline-none focus:bg-white/10 focus:border-white/70 placeholder:text-gray-400"
          />
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-[11px] tracking-[0.35em] uppercase bg-white text-black hover:bg-gray-200 transition-colors"
          >
            Abone Ol
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
          className="mt-4 text-[10px] text-gray-400"
        >
          Abone olarak Beauté’nin iletişim şartlarını kabul etmiş olursun. Dilediğin
          zaman tek tıkla ayrılabilirsin.
        </motion.p>
      </div>
    </section>
  );
}
