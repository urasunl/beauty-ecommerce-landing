// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";

export default function Navbar({ cartCount = 0, onBagOpen }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuLink =
    "text-[11px] tracking-[0.35em] uppercase hover:text-black transition-colors text-gray-500";

  const handleMenuClick = () => setIsMobileOpen((prev) => !prev);
  const handleNavClick = () => setIsMobileOpen(false);

  const handleBagClick = () => {
    if (onBagOpen) onBagOpen();
    setIsMobileOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsMobileOpen(false);
    navigate("/");
  };

  const user = getCurrentUser();

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-black/5">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 grid grid-cols-3 items-center">

        {/* Logo */}
        <div className="flex items-center">
          <Link
            to="/"
            className="text-lg md:text-xl font-vogue tracking-[0.35em] uppercase"
            onClick={handleNavClick}
          >
            BEAUTÉ
          </Link>
        </div>

        {/* Menü (Desktop) */}
        <div className="hidden md:flex items-center justify-center gap-6 md:gap-8">
          <Link to="/category/ruj" className={menuLink} onClick={handleNavClick}>
            Ruj
          </Link>
          <Link to="/category/fondöten" className={menuLink} onClick={handleNavClick}>
            Fondöten
          </Link>
          <Link to="/category/oje" className={menuLink} onClick={handleNavClick}>
            Oje
          </Link>
          <Link to="/category/mascara" className={menuLink} onClick={handleNavClick}>
            Mascara
          </Link>
        </div>

        {/* Sağ kısım */}
        <div className="flex items-center justify-end gap-3">

          {/* Sepet */}
          <button
            type="button"
            aria-label="Sepet"
            onClick={handleBagClick}
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10 hover:border-black hover:bg-black/5 transition"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
              <path
                d="M7 7l-2 0 0 0M7 7l3 9h7l3-9H7zm3 9a2 2 0 11-4 0m11 0a2 2 0 11-4 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[1.1rem] h-[1.1rem] rounded-full bg-black text-white text-[9px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Kullanıcı */}
          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link
                to="/profile"
                onClick={handleNavClick}
                className="text-[11px] tracking-[0.35em] uppercase border border-black/10 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors"
              >
                {user.name || user.email.split("@")[0]}
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
              >
                Çıkış
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-block text-[11px] tracking-[0.35em] uppercase border border-black/10 rounded-full px-4 py-2 hover:bg-black hover:text-white transition-colors"
              onClick={handleNavClick}
            >
              Giriş Yap
            </Link>
          )}

          {/* Mobil Menü */}
          <button
            className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full border border-black/10"
            onClick={handleMenuClick}
          >
            <div className="space-y-1.5">
              <span className={`block h-[2px] w-5 bg-black transition-transform ${isMobileOpen ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`block h-[2px] w-5 bg-black transition-opacity ${isMobileOpen ? "opacity-0" : "opacity-100"}`} />
              <span className={`block h-[2px] w-5 bg-black transition-transform ${isMobileOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobil dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white border-t border-black/5 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-3">
            <div className="flex flex-col gap-2">

              <Link to="/category/ruj" className={menuLink} onClick={handleNavClick}>
                Ruj
              </Link>
              <Link to="/category/fondöten" className={menuLink} onClick={handleNavClick}>
                Fondöten
              </Link>
              <Link to="/category/oje" className={menuLink} onClick={handleNavClick}>
                Oje
              </Link>
              <Link to="/category/mascara" className={menuLink} onClick={handleNavClick}>
                Mascara
              </Link>

              {user ? (
                <>
                  <Link to="/profile" className={menuLink} onClick={handleNavClick}>
                    {user.name || user.email.split("@")[0]}
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left text-[11px] tracking-[0.35em] uppercase text-gray-500 hover:text-black"
                  >
                    Çıkış
                  </button>
                </>
              ) : (
                <Link to="/login" className={menuLink} onClick={handleNavClick}>
                  Giriş
                </Link>
              )}

            </div>
          </div>
        </div>
      )}
    </header>
  );
}
