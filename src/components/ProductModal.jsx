import React from "react";
import { FiX } from "react-icons/fi";

export default function ProductModal({ product, onClose, addToCart }) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white w-[90%] md:w-[600px] rounded-lg overflow-hidden shadow-xl relative animate-fadeIn">

        {/* Kapat Butonu */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          <FiX size={22} />
        </button>

        {/* İçerik */}
        <div className="flex flex-col md:flex-row">
          {/* Sol: Ürün Resmi */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 md:h-full object-cover"
          />

          {/* Sağ: Bilgi ve Buton */}
          <div className="p-6 md:w-1/2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-light tracking-wide mb-3">
                {product.name}
              </h2>
              <p className="text-gray-500 text-sm leading-6 mb-4">
                {product.description}
              </p>
              <p className="text-lg font-semibold mb-4">₺{product.price}</p>
            </div>

            <button
              className="w-full bg-black text-white text-sm py-2 tracking-widest hover:bg-gray-800 transition"
              onClick={() => {
                addToCart(product);
                onClose();
              }}
            >
              SEPETE EKLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
