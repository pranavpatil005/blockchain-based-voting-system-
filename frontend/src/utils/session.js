// src/utils/session.js
export const saveSession = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error("session save error:", err);
  }
};

export const loadSession = (key, defaultValue = null) => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultValue;
  } catch (err) {
    console.error("session load error:", err);
    return defaultValue;
  }
};

export const removeSession = (key) => {
  if (typeof window === "undefined") return;
  try { sessionStorage.removeItem(key); } catch (err) { /* ignore */ }
};

export const clearSession = () => {
  if (typeof window === "undefined") return;
  try { sessionStorage.clear(); } catch (err) { /* ignore */ }
};
