// src/utils/auth.js

// Kullanıcı + token kaydet
export function saveUser(user, token) {
  localStorage.setItem("beauty_user", JSON.stringify(user));
  localStorage.setItem("beauty_token", token);
}

// Kaydedilen kullanıcıyı getir
export function getCurrentUser() {
  const userData = localStorage.getItem("beauty_user");
  if (!userData) return null;

  try {
    return JSON.parse(userData);
  } catch (e) {
    return null;
  }
}

// Token getir
export function getToken() {
  return localStorage.getItem("beauty_token");
}

// Çıkış yap
export function logout() {
  localStorage.removeItem("beauty_user");
  localStorage.removeItem("beauty_token");
  window.location.href = "/"; // isteğe bağlı yönlendirme
}
