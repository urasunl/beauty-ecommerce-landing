// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getCurrentUser, logout } from "../utils/auth";
import { fetchMyOrders } from "../services/orderApi";

export default function Profile() {
  const user = getCurrentUser();

  const [activeTab, setActiveTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    if (activeTab === "orders") {
      setOrdersLoading(true);
      setOrdersError("");

      fetchMyOrders()
        .then((data) => {
          setOrders(data.orders || []);
        })
        .catch((err) => {
          setOrdersError(err.message || "Siparişler alınamadı.");
        })
        .finally(() => {
          setOrdersLoading(false);
        });
    }
  }, [activeTab]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7] text-gray-600 px-4">
        Giriş yapmanız gerekiyor.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e2e2e2] flex justify-center items-start pt-24 pb-16 px-4 md:pt-32 relative overflow-hidden">
      {/* Soft noise */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: "url('/images/noise.png')" }}
      />

      {/* Ana kart - animasyonlu */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-xl bg-white/85 backdrop-blur-xl border border-black/5 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10"
      >
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ ACCOUNT
          </p>
          <h1 className="text-2xl md:text-3xl font-vogue tracking-[0.18em] mt-2">
            Your Editorial Space
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-6 md:mb-8">
          <div className="inline-flex bg-[#f3f3f3] rounded-full p-1">
            {["profile", "orders", "favorites"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] tracking-[0.25em] uppercase transition-all ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {tab === "profile" && "Profil"}
                {tab === "orders" && "Siparişlerim"}
                {tab === "favorites" && "Favorilerim"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab içerikleri */}
        <div className="space-y-6">
          {/* PROFİL TAB */}
          {activeTab === "profile" && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-1">
                  Ad Soyad
                </p>
                <p className="text-lg font-medium">{user.name || "—"}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-1">
                  Email
                </p>
                <p className="text-lg font-medium">{user.email}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-1">
                  Rol
                </p>
                <p className="text-lg font-medium capitalize">{user.role}</p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500 mb-1">
                  Kullanıcı ID
                </p>
                <p className="text-sm font-light text-gray-700">{user.id}</p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="/profile/edit"
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-black text-[11px] tracking-[0.35em] uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Profili Düzenle
                </a>
                <button
                  onClick={logout}
                  className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded-full border border-black/20 text-[11px] tracking-[0.35em] uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Çıkış Yap
                </button>
              </div>
            </motion.div>
          )}

          {/* SİPARİŞLERİM TAB */}
          {activeTab === "orders" && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {ordersLoading && (
                <p className="text-sm text-gray-600">
                  Siparişler yükleniyor...
                </p>
              )}

              {ordersError && (
                <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
                  {ordersError}
                </p>
              )}

              {!ordersLoading && !ordersError && orders.length === 0 && (
                <div className="rounded-2xl border border-dashed border-gray-300 py-6 flex items-center justify-center text-xs text-gray-500">
                  Henüz bir siparişin yok. İlk runway seçkini keşfet.
                </div>
              )}

              <div className="space-y-4">
                {orders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="rounded-2xl border border-black/5 bg-white/85 backdrop-blur-sm p-4 sm:p-5 shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                      <div>
                        <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
                          Sipariş #{order.id}
                        </p>
                        <p className="text-sm text-gray-700">
                          {new Date(order.createdAt).toLocaleString("tr-TR")}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                          Toplam
                        </p>
                        <p className="text-base font-medium">
                          ₺{order.total.toFixed(2)}
                        </p>
                        <p className="text-[10px] uppercase tracking-[0.22em] text-gray-500 mt-1">
                          {order.status}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-3 space-y-1.5">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between text-xs text-gray-700"
                        >
                          <span>
                            {item.name}{" "}
                            <span className="text-[10px] text-gray-500">
                              × {item.quantity}
                            </span>
                          </span>
                          <span>
                            ₺{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* FAVORİLER TAB */}
          {activeTab === "favorites" && (
            <motion.div
              key="favorites"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              <p className="text-sm text-gray-600">
                Favori ürünler için wishlist entegrasyonu daha sonra
                eklenecek. Şimdilik editoryal seçkiler üzerinde çalışıyoruz 💄
              </p>
              <div className="rounded-2xl border border-dashed border-gray-300 py-6 flex items-center justify-center text-xs text-gray-500">
                Favori ürünlerin burada listelenecek.
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
