// src/components/Footer.jsx
import React from "react";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-black text-zinc-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
        {/* Üst kısım */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand + kısa metin */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-semibold tracking-[0.25em] text-zinc-400">
                LUMIÈRE
              </span>
            </div>
            <p className="text-sm leading-relaxed text-zinc-400 max-w-xs">
              Cilt bakımından makyaja, zamansız güzellik rutinleri için seçilmiş
              koleksiyonlar. Her gün Vogue kapağına hazırlanmış gibi hisset.
            </p>

            {/* Sosyal ikonlar */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="text-sm text-zinc-400 transition hover:text-zinc-50"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-sm text-zinc-400 transition hover:text-zinc-50"
              >
                <FaTiktok className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-sm text-zinc-400 transition hover:text-zinc-50"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Link sütunları */}
          <div className="grid grid-cols-2 gap-6 text-sm sm:gap-10">
            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                MAĞAZA
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    Yeni Gelenler
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    Ruj Koleksiyonu
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    Ten Ürünleri
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    Bakım Setleri
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
                DESTEK
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    Sık Sorulan Sorular
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    İade & Değişim
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    Kargo Takibi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-zinc-400 transition hover:text-zinc-50"
                  >
                    İletişim
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold tracking-[0.2em] text-zinc-500">
              NEWSLETTER
            </h3>
            <p className="text-sm text-zinc-400">
              İlk alışverişinde özel indirim kodu ve yeni koleksiyonlara erken
              erişim için e-posta listemize katıl.
            </p>
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="E-posta adresin"
                className="w-full rounded-full border border-zinc-700 bg-zinc-900/60 px-4 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-zinc-300 focus:outline-none"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-medium tracking-wide bg-zinc-100 text-black hover:bg-zinc-200 transition"
              >
                Abone ol
              </button>
            </form>
          </div>
        </div>

        {/* Alt çizgi */}
        <div className="border-t border-zinc-800 pt-6 text-xs text-zinc-500 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Lumière Beauty. Tüm hakları saklıdır.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-end">
            <a href="#" className="hover:text-zinc-300 transition">
              KVKK & Gizlilik
            </a>
            <span className="hidden h-3 w-px bg-zinc-700 sm:inline-block" />
            <a href="#" className="hover:text-zinc-300 transition">
              Çerez Tercihleri
            </a>
            <span className="hidden h-3 w-px bg-zinc-700 sm:inline-block" />
            <a href="#" className="hover:text-zinc-300 transition">
              Kullanım Koşulları
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
