// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-center py-16 border-t border-gray-200 dark:border-gray-800">
      {/* LOGO */}
      <h2 className="text-xl tracking-[0.3em] uppercase mb-6 dark:text-white">
        BEAUTÉ
      </h2>

      {/* SOSYAL MEDYA LİNKLERİ */}
      <div className="flex justify-center items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-6">
        <span className="text-gray-400">Bizi takip et :</span>
        <a href="#" className="hover:text-black dark:hover:text-white transition">TikTok</a>
        <a href="#" className="hover:text-black dark:hover:text-white transition">Instagram</a>
        <a href="#" className="hover:text-black dark:hover:text-white transition">X</a>
        <a href="#" className="hover:text-black dark:hover:text-white transition">Facebook</a>
        <a href="#" className="hover:text-black dark:hover:text-white transition">Snapchat</a>
      </div>

      {/* ALT METİN */}
      <p className="text-xs text-gray-500 dark:text-gray-500">
        © 2025 Beauté. Modern Fashion & Beauty Platform.
      </p>
    </footer>
  );
}
