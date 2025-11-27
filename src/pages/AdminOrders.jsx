// src/pages/AdminOrders.jsx
import React, { useEffect, useState } from "react";
import { fetchAllOrders } from "../services/orderApi";
import { getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminOrders() {
  const user = getCurrentUser();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/profile");
      return;
    }

    fetchAllOrders()
      .then((data) => {
        setOrders(data.orders || []);
      })
      .catch((err) => {
        setError(err.message || "Siparişler alınamadı.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f8f8] to-[#e2e2e2] pt-24 pb-16 px-4 md:pt-32">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-[11px] tracking-[0.35em] uppercase text-gray-500">
            BEAUTÉ BACKSTAGE
          </p>
          <h1 className="text-2xl md:text-3xl font-vogue tracking-[0.18em] mt-2">
            Admin Sipariş Paneli
          </h1>
        </div>

        {loading && <p className="text-sm text-gray-600">Yükleniyor...</p>}

        {error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        {!loading && !error && orders.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-6 flex items-center justify-center text-xs text-gray-500">
            Kayıtlı sipariş bulunmuyor.
          </div>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-black/5 bg-white/85 backdrop-blur-sm p-4 sm:p-5 shadow-sm"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-gray-500">
                    Sipariş #{order.id}
                  </p>
                  <p className="text-xs text-gray-600">
                    {order.user?.name || "-"} — {order.user?.email}
                  </p>
                  <p className="text-xs text-gray-500">
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
      </div>
    </div>
  );
}
