// src/pages/AdminProducts.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getCurrentUser } from "../utils/auth";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/productApi";

export default function AdminProducts() {
  const user = getCurrentUser();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/profile");
      return;
    }

    setLoading(true);
    setError("");
    fetchProducts()
      .then((data) => setProducts(data.products || []))
      .catch((err) => {
        console.error("Admin get products error:", err);
        setError(err.message || "Ürünler alınamadı.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== "admin") {
    return null;
  }

  const resetForm = () => {
    setEditingId(null);
    setForm({
      name: "",
      slug: "",
      price: "",
      description: "",
      imageUrl: "",
      category: "",
    });
    setPreviewImage("");
  };

  const handleEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      slug: product.slug || "",
      price: product.price?.toString() || "",
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      category: product.category || "",
    });
    setPreviewImage(product.imageUrl || "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Sadece frontend önizleme için:
    const url = URL.createObjectURL(file);
    setPreviewImage(url);

    // Gerçek upload backend'de olmadığı için veritabanına kaydedilecek alanı
    // şimdilik elle (Görsel URL inputundan) yönetiyoruz.
    // İstersen burada form.imageUrl'e de atanabilir, ama kalıcı olmayacak.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price || "0"),
      };

      if (!payload.category) {
        payload.category = null;
      }

      if (editingId) {
        const data = await updateProduct(editingId, payload);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? data.product : p))
        );
      } else {
        const data = await createProduct(payload);
        setProducts((prev) => [data.product, ...prev]);
      }

      resetForm();
    } catch (err) {
      console.error("Save product error:", err);
      setError(err.message || "Kayıt sırasında bir hata oluştu.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bu ürünü silmek istediğine emin misin?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete product error:", err);
      setError(err.message || "Silme sırasında bir hata oluştu.");
    }
  };

  const filteredProducts = products.filter((p) => {
    const term = search.toLowerCase();
    if (!term) return true;
    return (
      p.name?.toLowerCase().includes(term) ||
      p.slug?.toLowerCase().includes(term) ||
      p.category?.toLowerCase().includes(term)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e2e2e2] pt-24 pb-16 px-4 md:pt-32">
      <div className="max-w-5xl mx-auto">
        {/* Başlık */}
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ BACKSTAGE
          </p>
          <h1 className="text-2xl md:text-3xl font-vogue tracking-[0.18em] mt-2">
            Admin Ürün Yönetimi
          </h1>
        </div>

        {/* Ürün Formu */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 bg-white/85 backdrop-blur-xl border border-black/5 rounded-3xl shadow-xl p-4 sm:p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-gray-700">
              {editingId ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
            </h2>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-[10px] tracking-[0.25em] uppercase px-3 py-1 rounded-full border border-black/10 hover:bg-black hover:text-white transition-colors"
              >
                Yeni Ürün
              </button>
            )}
          </div>

          {error && (
            <p className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                Ürün Adı
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                Slug
              </label>
              <input
                type="text"
                name="slug"
                value={form.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
                placeholder="ornegin: velvet-rouge-01"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                Fiyat (₺)
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
                required
              />
            </div>

            {/* Kategori seçilebilir */}
            <div>
              <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                Kategori
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
              >
                <option value="">Seçiniz</option>
                <option value="ruj">Ruj</option>
                <option value="fondöten">Fondöten</option>
                <option value="oje">Oje</option>
                <option value="mascara">Mascara</option>
              </select>
            </div>

            {/* Görsel URL */}
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-3 items-start">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                  Görsel URL
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={form.imageUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70"
                  placeholder="/images/lipstick.jpg"
                />
                <p className="mt-1 text-[10px] text-gray-500">
                  Şimdilik /public/images altındaki bir dosya yolunu yazmalısın.
                </p>
              </div>

              {/* Resim seç butonu (sadece önizleme için) */}
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                  Resim Seç (önizleme)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className="w-full text-[11px]"
                />
                {previewImage && (
                  <div className="mt-2 rounded-xl overflow-hidden border border-gray-200">
                    <img
                      src={previewImage}
                      alt="Önizleme"
                      className="w-full h-24 object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-[10px] uppercase tracking-[0.25em] text-gray-600 mb-1">
                Açıklama
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm bg-white/70 outline-none focus:border-black/70 min-h-[60px]"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-1">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-full border border-black bg-black text-white text-[11px] tracking-[0.35em] uppercase hover:bg-white hover:text-black transition-colors disabled:opacity-60"
              >
                {saving
                  ? editingId
                    ? "Güncelleniyor..."
                    : "Ekleniyor..."
                  : editingId
                  ? "Güncelle"
                  : "Ekle"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-2.5 rounded-full border border-black/20 text-[11px] tracking-[0.35em] uppercase hover:bg-black hover:text-white transition-colors"
                >
                  İptal
                </button>
              )}
            </div>
          </form>
        </motion.div>

        {/* Ürün Listesi + Arama */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xs tracking-[0.28em] uppercase text-gray-600">
            Ürün Listesi
          </h2>
          <input
            type="text"
            placeholder="Ürünlerde ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-48 md:w-64 px-3 py-2 rounded-full border border-gray-300 text-xs bg-white/80 outline-none focus:border-black/70"
          />
        </div>

        <div className="space-y-3">
          {loading && <p className="text-sm text-gray-600">Yükleniyor...</p>}

          {!loading && filteredProducts.length === 0 && (
            <div className="rounded-2xl border border-dashed border-gray-300 py-6 flex items-center justify-center text-xs text-gray-500">
              Bu arama kriterine uygun ürün yok.
            </div>
          )}

          {filteredProducts.map((p) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-black/5 bg-white/85 backdrop-blur-sm p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                {p.imageUrl && (
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 hidden sm:block">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">{p.name}</p>
                  <p className="text-xs text-gray-500">
                    {p.slug} {p.category ? `• ${p.category}` : ""}
                  </p>
                  {p.description && (
                    <p className="mt-1 text-xs text-gray-600 line-clamp-2">
                      {p.description}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-3 sm:flex-row sm:text-right">
                <div className="text-sm font-semibold">
                  ₺{p.price.toFixed(2)}
                </div>
                <button
                  onClick={() => handleEdit(p)}
                  className="px-4 py-1.5 rounded-full border border-black/20 text-[10px] tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-4 py-1.5 rounded-full border border-red-300 text-[10px] tracking-[0.25em] uppercase text-red-600 hover:bg-red-600 hover:text-white transition-colors"
                >
                  Sil
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
