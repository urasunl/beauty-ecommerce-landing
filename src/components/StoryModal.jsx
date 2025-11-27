// src/components/StoryModal.jsx
export default function StoryModal({ open, onClose, title, image, content }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex">
      <div className="relative bg-white dark:bg-black text-black dark:text-white w-full max-w-[1000px] mx-auto my-10 lg:my-16 p-8 overflow-auto">
        <button onClick={onClose} className="absolute right-4 top-4 text-sm tracking-widest">CLOSE</button>

        <h2 className="text-3xl font-light tracking-widest mb-6 uppercase">{title}</h2>
        <img src={image} alt="" className="w-full h-[380px] object-cover mb-6" />
        <div className="prose dark:prose-invert max-w-none">
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}
