// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import CategoryPage from "./components/CategoryPage";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CosmeticProductsSection from "./components/CosmeticProductsSection";
import VogueBanner from "./components/VogueBanner";
import EditorialGrid from "./components/EditorialGrid";
import VogueSplitSection from "./components/VogueSplitSection";
import StoryPage from "./components/StoryPage";
import Footer from "./components/Footer";
import CategoryEditorial from "./components/CategoryEditorial";
import BagPanel from "./components/BagPanel";
import ProductDetail from "./components/ProductDetail";
import AdminProducts from "./pages/AdminProducts";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProfileEdit from "./pages/ProfileEdit";
import AdminOrders from "./pages/AdminOrders";


<Route
  path="/admin/orders"
  element={
    <PageTransition>
      <AdminOrders />
    </PageTransition>
  }
/>


function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  const [cart, setCart] = useState([]);
  const [bagOpen, setBagOpen] = useState(false);

  // Sepet fonksiyonları
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );
  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar cartCount={cartCount} onBagOpen={() => setBagOpen(true)} />

      {/* Sepet Paneli */}
      <BagPanel
        isOpen={bagOpen}
        onClose={() => setBagOpen(false)}
        cart={cart}
        increase={increase}
        decrease={decrease}
        removeItem={removeItem}
        total={total}
      />

      <main className="flex-1 pt-20 md:pt-16">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Ana sayfa */}
            <Route
              path="/"
              element={
                <PageTransition>
                  <Hero />
                  <CosmeticProductsSection addToCart={addToCart} />
                  <CategoryEditorial />
                  <VogueSplitSection />
                  <VogueBanner />
                  <EditorialGrid />
                  
                  
                </PageTransition>
              }
            />

            {/* Profil */}
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              }
            />

            {/* Profil düzenleme */}
            <Route
              path="/profile/edit"
              element={
                <PageTransition>
                  <ProfileEdit />
                </PageTransition>
              }
            />

            {/* Login */}
            <Route
              path="/login"
              element={
                <PageTransition>
                  <Login />
                </PageTransition>
              }
            />

            {/* Register */}
            <Route
              path="/register"
              element={
                <PageTransition>
                  <Register />
                </PageTransition>
              }
            />

            {/* Ürün detay sayfası */}
            <Route
              path="/product/:id"
              element={
                <PageTransition>
                  <ProductDetail addToCart={addToCart} />
                </PageTransition>
              }
            />

            {/* Kategori sayfası */}
            <Route
              path="/category/:slug"
              element={
                <PageTransition>
                  <CategoryPage addToCart={addToCart} />
                </PageTransition>
              }
            />

            {/* Story sayfası */}
            <Route
              path="/story/:id"
              element={
                <PageTransition>
                  <StoryPage />
                </PageTransition>
              }
            />

            <Route
  path="/admin/products"
  element={
    <PageTransition>
      <AdminProducts />
    </PageTransition>
  }
/>

          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
