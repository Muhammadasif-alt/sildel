"use client";

import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, type AppStore } from "./index";
import { hydrate, CART_STORAGE_KEY, type CartItem } from "./cart-slice";

export function ReduxProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  // Single tan theme — make sure no stale `.dark` class survives from a
  // previous visit (we used to ship a dark mode). The CSS only defines the
  // tan `:root` palette now, so `.dark` would just be inert, but we strip
  // it anyway to keep the DOM honest.
  useEffect(() => {
    document.documentElement.classList.remove("dark");
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
