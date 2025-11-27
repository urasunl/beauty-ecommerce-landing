// src/pages/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authApi";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const data = await registerUser(form);

      // Token'ı localStorage'a koy (ileride kullanırız)
      if (data.token) {
        localStorage.setItem("beauty_token", data.token);
      }

      setSuccessMsg("Kayıt başarılı, yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setError(err.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-black/5">
        <div className="text-center mb-6">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ STUDIO
          </p>
          <h1 className="mt-2 text-2xl md:text-3xl font-vogue tracking-[0.18em]">
            Create Account
          </h1>
          <p className="mt-2 text-xs text-gray-500">
            Editoryal deneyimin için kişisel hesabını oluştur.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-gray-700 mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-black/70"
              placeholder="Adınız"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-black/70"
              placeholder="ornek@mail.com"
              required
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-black/70"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          {successMsg && (
            <p className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-3 py-2">
              {successMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 text-xs uppercase tracking-[0.25em] rounded-full border border-black bg-black text-white hover:bg-white hover:text-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-gray-500 text-center">
          Zaten hesabın var mı?{" "}
          <Link
            to="/login"
            className="underline underline-offset-4 decoration-gray-400 hover:decoration-black"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
