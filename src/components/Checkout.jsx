// src/pages/Checkout.jsx
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Checkout({ cart, onPlaceOrder }) {
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    city: "",
    line: "",
  });

  const total = useMemo(() => {
    return cart.reduce((s, x) => {
      const n = parseFloat((x.price || "0").replace(/[^\d.]/g, "")) || 0;
      return s + n * x.qty;
    }, 0);
  }, [cart]);

  const submit = (e) => {
    e.preventDefault();
    if (!cart.length) return;
    onPlaceOrder(address);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-24">
      <h1 className="text-3xl font-light tracking-widest mb-8">ÖDEME</h1>

      {cart.length === 0 ? (
        <div className="text-gray-500">
          Sepetiniz boş. <Link className="underline" to="/">Alışverişe dön</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-10">
          {/* Adres */}
          <form onSubmit={submit} className="space-y-4">
            <input
              placeholder="Ad Soyad"
              className="w-full border px-4 py-3 bg-transparent"
              value={address.name}
              onChange={(e) => setAddress({ ...address, name: e.target.value })}
            />
            <input
              placeholder="Telefon"
              className="w-full border px-4 py-3 bg-transparent"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            />
            <input
              placeholder="Şehir"
              className="w-full border px-4 py-3 bg-transparent"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
            <textarea
              placeholder="Adres satırı"
              className="w-full border px-4 py-3 bg-transparent h-28"
              value={address.line}
              onChange={(e) => setAddress({ ...address, line: e.target.value })}
            />
            <button className="w-full border border-black dark:border-white px-4 py-3 tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition">
              Siparişi Tamamla
            </button>
          </form>

          {/* Özet */}
          <div>
            <h2 className="tracking-widest uppercase mb-4 text-sm">Sipariş Özeti</h2>
            <div className="space-y-3">
              {cart.map((i) => (
                <div key={i.id} className="flex items-center justify-between">
                  <div className="flex gap-3 items-center">
                    <img src={i.image} className="w-14 h-14 object-cover" />
                    <div>
                      <p className="text-sm">{i.name}</p>
                      <p className="text-xs text-gray-500">Adet: {i.qty}</p>
                    </div>
                  </div>
                  <p className="text-sm">{i.price}</p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 flex justify-between">
              <span className="text-sm">TOPLAM</span>
              <span className="text-sm">₺{total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
