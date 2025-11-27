import React, { useEffect } from "react";

export default function Toast({ message, show, setShow }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 2500);
      return () => clearTimeout(timer);
    }
  }, [show, setShow]);

  if (!show) return null;

  return (
    <div
      className="fixed bottom-10 left-1/2 transform -translate-x-1/2 
      bg-black text-white dark:bg-white dark:text-black 
      px-6 py-3 rounded-full text-sm shadow-lg 
      animate-fadeIn z-[1000]"
    >
      {message}
    </div>
  );
}
