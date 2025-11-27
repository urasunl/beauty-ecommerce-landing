import React from "react";
import { FiX } from "react-icons/fi";

export default function EditorialStoryModal({ story, onClose }) {
  if (!story) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white w-full md:w-[80%] lg:w-[70%] max-h-[90vh] overflow-y-auto rounded-md shadow-lg relative animate-fadeIn">
        
        {/* Kapat Butonu */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <FiX size={24} />
        </button>
        
        {/* Görsel */}
        <img 
          src={story.image} 
          alt={story.title}
          className="w-full h-[300px] md:h-[500px] object-cover"
        />

        {/* İçerik */}
        <div className="p-8 md:p-12">
          <h4 className="text-xs tracking-[0.3em] text-gray-500 uppercase">
            {story.subtitle}
          </h4>
          <h2 className="text-4xl md:text-5xl font-light tracking-wide mt-3">
            {story.title}
          </h2>
          <p className="mt-6 text-gray-600 leading-7 whitespace-pre-line">
            {story.content}
          </p>
        </div>
      </div>
    </div>
  );
}
