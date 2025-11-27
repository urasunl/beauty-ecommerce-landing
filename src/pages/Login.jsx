// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loginUser } from "../services/authApi";
import { saveUser } from "../utils/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // API'ye login isteği
      const res = await loginUser({ email, password });

      // Kullanıcı + token'ı localStorage'a kaydet
      // (utils/auth içindeki saveUser fonksiyonu)
      saveUser(res.user, res.token);

      // Rol'e göre yönlendirme
      if (res.user.role === "admin") {
        navigate("/admin/products"); // 👑 Admin → Admin Paneli
      } else {
        navigate("/"); // 👤 Normal kullanıcı → Ana sayfa (istersen /profile yapabiliriz)
      }
    } catch (err) {
      setError(err.message || "Giriş yapılamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e2e2e2] flex justify-center items-start pt-24 pb-16 px-4 md:pt-32 relative overflow-hidden">
      {/* Soft noise */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise.png')" }}
      />

      {/* Kart */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-sm bg-white/90 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl p-6 sm:p-8"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ LOGIN
          </p>
          <h1 className="text-2xl font-vogue tracking-[0.18em] mt-2">
            Welcome Back
          </h1>
        </div>

        {/* Hata mesajı */}
        {error && (
          <p className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
              required
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 px-4 py-2.5 rounded-full border border-black bg-black text-white text-[11px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-60"
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
          </button>
        </form>

        {/* Register link */}
        <p className="mt-4 text-xs text-gray-500 text-center">
          Hesabın yok mu?{" "}
          <Link
            to="/register"
            className="underline underline-offset-4 hover:text-black"
          >
            Kayıt Ol
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
