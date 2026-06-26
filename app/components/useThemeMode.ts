"use client";

import { useEffect, useState } from "react";

const THEME_STORAGE_KEY = "darkMode";

function getStoredThemeMode() {
  if (typeof window === "undefined") {
    return false;
  }

  return localStorage.getItem(THEME_STORAGE_KEY) === "true";
}

export function useThemeMode() {
  const [isDarkMode, setIsDarkMode] = useState(getStoredThemeMode);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, String(isDarkMode));
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return {
    isDarkMode,
    setIsDarkMode,
    themeToggleLabel: isDarkMode
      ? "Chuyển sang giao diện sáng"
      : "Chuyển sang giao diện tối",
  };
}
