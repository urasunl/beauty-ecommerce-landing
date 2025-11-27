import React from "react";
import { FiX } from "react-icons/fi";

export default function ProductStoryModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[200]">
      <div className="bg-white w-[90%] md:w-[70%] lg:w-[50%] max-h-[90vh] overflow-y-auto relative p-6">
        <button
          onClick={onClose}
          className="absolute top-1 right-1 text-black hover:opacity-50"
        >
          <FiX size={24} />
        </button>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-cover mb-6"
        />
        <h2 className="text-2xl font-light tracking-widest mb-2">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 mb-4">{product.description}</p>
        <p className="text-lg mb-4">{product.price}</p>
        <button className="border px-4 py-2 hover:bg-black hover:text-white transition text-sm tracking-widest">
          VIEW STORY
        </button>
      </div>
    </div>
  );
}
