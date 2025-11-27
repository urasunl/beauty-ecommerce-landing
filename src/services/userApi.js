// src/services/userApi.js


const API_URL = "http://localhost:5000/api/user";

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Bir hata oluştu.");
  }
  return data;
}

export async function fetchProfile() {
  const token = getToken();
  if (!token) throw new Error("Giriş yapılmamış.");

  const res = await fetch(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return handleResponse(res);
}

export async function updateProfile({ name, email }) {
  const token = getToken();
  if (!token) throw new Error("Giriş yapılmamış.");

  const res = await fetch(`${API_URL}/me`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, email }),
  });

  const data = await handleResponse(res);

  if (data.token) {
    saveToken(data.token); // yeni token
  }

  return data;
}
