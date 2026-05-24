"use client";

import { Moon, Sun } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { toggleTheme } from "@/lib/store/theme-slice";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useAppSelector((s) => s.theme.theme);
  const dispatch = useAppDispatch();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      className={cn(
        "relative inline-flex h-10 w-10 items-center justify-center text-muted-foreground hover:text-primary transition-colors",
        className
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      <Sun
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark ? "scale-0 -rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
        )}
        aria-hidden
      />
      <Moon
        className={cn(
          "absolute h-4 w-4 transition-all duration-300",
          isDark ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"
        )}
        aria-hidden
      />
    </button>
  );
}
