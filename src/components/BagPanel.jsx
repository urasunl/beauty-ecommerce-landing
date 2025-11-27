import React, { useState } from "react";
import { FiX, FiTrash2, FiPlus, FiMinus } from "react-icons/fi";

export default function BagPanel({
  isOpen,
  onClose,
  cart,
  increase,
  decrease,
  removeItem,
  total
}) {
  const [confirmRemove, setConfirmRemove] = useState(null);
  const [confirmClear, setConfirmClear] = useState(false);

  return (
    <>
      {/* ✅ Sepet Paneli */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="uppercase tracking-widest text-sm font-light">Sepet</h2>
          <button onClick={onClose}>
            <FiX size={20} className="hover:text-red-500" />
          </button>
        </div>

        {/* ✅ Sepet boşsa */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 text-sm">
            <p>Sepetiniz boş</p>
          </div>
        ) : (
          <div className="p-4 space-y-4 overflow-y-auto h-[75%]">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                <div className="flex-1 ml-3">
                  <p className="text-sm font-light">{item.name}</p>
                  <p className="text-xs text-gray-500">₺{item.price}</p>

                  <div className="flex items-center mt-2 gap-2">
                    <button
                      onClick={() => decrease(item.id)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <FiMinus size={12} />
                    </button>
                    <span className="text-sm">{item.qty}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="p-1 border rounded hover:bg-gray-100"
                    >
                      <FiPlus size={12} />
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setConfirmRemove(item)}
                  className="text-gray-400 hover:text-red-600"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* ✅ Alt kısım - toplam & butonlar */}
        {cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="flex justify-between text-sm font-light mb-4">
              <span>Toplam:</span>
              <span>₺{total}</span>
            </div>

            <button
              onClick={() => setConfirmClear(true)}
              className="w-full text-xs border py-2 mb-2 hover:bg-gray-100 uppercase"
            >
              Sepeti Boşalt
            </button>
            <button className="w-full bg-black text-white text-xs py-2 uppercase">
              Ödeme Yap
            </button>
          </div>
        )}
      </div>

      {/* ✅ Ürünü silmeden önce Vogue Popup */}
      {confirmRemove && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center w-[300px]">
            <p className="text-sm mb-4">Bu ürünü sepetten kaldırmak istiyor musun?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  removeItem(confirmRemove.id);
                  setConfirmRemove(null);
                }}
                className="px-4 py-1 text-xs bg-red-500 text-white rounded"
              >
                Evet
              </button>
              <button
                onClick={() => setConfirmRemove(null)}
                className="px-4 py-1 text-xs border rounded"
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Sepeti boşalt uyarı popup */}
      {confirmClear && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-lg text-center w-[300px]">
            <p className="text-sm mb-4">Sepeti tamamen boşaltmak istiyor musun?</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  cart.forEach(item => removeItem(item.id));
                  setConfirmClear(false);
                }}
                className="px-4 py-1 text-xs bg-red-500 text-white rounded"
              >
                Evet
              </button>
              <button
                onClick={() => setConfirmClear(false)}
                className="px-4 py-1 text-xs border rounded"
              >
                Hayır
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
