"use client";

import { createContext, useContext, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: "dark",
  toggle: () => {},
});

export function AdminThemeProvider({
  initial,
  children,
}: {
  initial: Theme;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme>(initial);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.cookie = `sildel-admin-theme=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      <div className={theme === "dark" ? "dark contents" : "contents"}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useAdminTheme() {
  return useContext(ThemeContext);
}