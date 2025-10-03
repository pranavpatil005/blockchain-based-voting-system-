// src/hooks/useSessionState.js
import { useState, useEffect, useRef } from "react";
import { loadSession, saveSession, removeSession } from "../utils/session";

export default function useSessionState(key, initialValue, options = {}) {
  const { debounce = 250 } = options;
  const [state, setState] = useState(() => loadSession(key, initialValue));
  const timerRef = useRef(null);

  useEffect(() => {
    // debounce writes to avoid too frequent storage writes
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      try {
        saveSession(key, state);
      } catch (err) {
        console.error("Failed to save session:", err);
      }
    }, debounce);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [key, state, debounce]);

  const clear = () => {
    setState(initialValue);
    try { removeSession(key); } catch (e) { /* ignore */ }
  };

  return [state, setState, clear];
}
