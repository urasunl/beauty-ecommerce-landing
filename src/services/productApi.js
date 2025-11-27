// src/services/productApi.js
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api/products";

async function handleResponse(res) {
  let data = {};
  try {
    data = await res.json();
  } catch (e) {
    // body yoksa
  }

  if (!res.ok) {
    const msg = data.message || "Sunucu hatasi.";
    throw new Error(msg);
  }

  return data;
}

// Kategoriye göre ürün listesi
export async function fetchProducts(category) {
  const url = category
    ? `${API_URL}?category=${encodeURIComponent(category)}`
    : API_URL;

  const res = await fetch(url);
  return handleResponse(res);
}

// TEK ÜRÜN DETAYI (ProductDetail için)
export async function fetchProductById(id) {
  const res = await fetch(`${API_URL}/${id}`);
  return handleResponse(res);
}

// Admin – ürün oluştur
export async function createProduct(payload) {
  const token = getToken();
  if (!token) throw new Error("Giris yapmaniz gerekiyor.");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

// Admin – ürün güncelle
export async function updateProduct(id, payload) {
  const token = getToken();
  if (!token) throw new Error("Giris yapmaniz gerekiyor.");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(res);
}

// Admin – ürün sil
export async function deleteProduct(id) {
  const token = getToken();
  if (!token) throw new Error("Giris yapmaniz gerekiyor.");

  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}
