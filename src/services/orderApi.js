// src/services/orderApi.js
import { getToken } from "../utils/auth";

const API_URL = "http://localhost:5000/api/orders";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.message || "Bir hata oluştu.");
  }

  return data;
}

export async function createOrder({ items, total }) {
  const token = getToken();
  if (!token) throw new Error("Giriş yapmanız gerekiyor.");

  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, total }),
  });

  return handleResponse(res);
}

export async function fetchMyOrders() {
  const token = getToken();
  if (!token) throw new Error("Giriş yapmanız gerekiyor.");

  const res = await fetch(`${API_URL}/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}

export async function fetchAllOrders() {
  const token = getToken();
  if (!token) throw new Error("Giriş yapmanız gerekiyor.");

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}
