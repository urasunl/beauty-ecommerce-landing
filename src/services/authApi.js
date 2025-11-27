// src/services/authApi.js
const API_URL = "http://localhost:5000/api/auth";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const message = data.message || "Bir hata oluştu.";
    throw new Error(message);
  }

  return data;
}

export async function registerUser({ name, email, password }) {
  const res = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return handleResponse(res);
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}
