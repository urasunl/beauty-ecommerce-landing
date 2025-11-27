// src/pages/ProfileEdit.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../utils/auth";
import { updateProfile } from "../services/userApi";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const user = getCurrentUser();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] text-gray-600 px-4">
        Giriş yapmanız gerekiyor.
      </div>
    );
  }

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const data = await updateProfile(form);
      setSuccessMsg("Profiliniz güncellendi.");
      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setError(err.message || "Bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e2e2e2] flex justify-center items-start pt-24 pb-16 px-4 md:pt-32 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise.png')" }}
      />

      <div className="relative z-10 w-full max-w-lg bg-white/85 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10">
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ ACCOUNT
          </p>
          <h1 className="text-2xl md:text-3xl font-vogue tracking-[0.18em] mt-2">
            Edit Profile
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.28em] text-gray-600 mb-1">
              Ad Soyad
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-black/70 bg-white/60"
              placeholder="Adınız"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-[0.28em] text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm outline-none focus:border-black/70 bg-white/60"
              placeholder="ornek@mail.com"
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

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-black bg-black text-white text-[11px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/profile")}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-black/20 text-[11px] tracking-[0.35em] uppercase hover:bg-black hover:text-white transition-colors"
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
