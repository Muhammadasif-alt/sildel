"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { setTheme, THEME_STORAGE_KEY, type Theme } from "./theme-slice";
import { hydrate, CART_STORAGE_KEY, type CartItem } from "./cart-slice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Theme: read on mount, sync class + localStorage on change.
  useEffect(() => {
    const store = storeRef.current!;
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
      const initial: Theme =
        saved === "dark" || saved === "light"
          ? saved
          : document.documentElement.classList.contains("dark")
            ? "dark"
            : "light";
      if (initial !== store.getState().theme.theme) {
        store.dispatch(setTheme(initial));
      }
    } catch {}

    let prev = store.getState().theme.theme;
    const applyTheme = (next: Theme) => {
      const root = document.documentElement;
      if (next === "dark") root.classList.add("dark");
      else root.classList.remove("dark");
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {}
    };
    applyTheme(prev);

    const unsubTheme = store.subscribe(() => {
      const next = store.getState().theme.theme;
      if (next !== prev) {
        prev = next;
        applyTheme(next);
      }
    });
    return unsubTheme;
  }, []);

  // Cart: hydrate from localStorage on mount, persist on change.
  useEffect(() => {
    const store = storeRef.current!;
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      let parsed: CartItem[] = [];
      if (raw) {
        const json = JSON.parse(raw);
        if (Array.isArray(json)) {
          parsed = json.filter(
            (x): x is CartItem =>
              !!x &&
              typeof x === "object" &&
              typeof x.slug === "string" &&
              typeof x.name === "string" &&
              typeof x.priceCents === "number" &&
              typeof x.image === "string" &&
              typeof x.quantity === "number"
          );
        }
      }
      store.dispatch(hydrate(parsed));
    } catch {
      store.dispatch(hydrate([]));
    }

    let prevItems = store.getState().cart.items;
    const unsubCart = store.subscribe(() => {
      const nextItems = store.getState().cart.items;
      if (nextItems !== prevItems) {
        prevItems = nextItems;
        try {
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(nextItems));
        } catch {}
      }
    });
    return unsubCart;
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
