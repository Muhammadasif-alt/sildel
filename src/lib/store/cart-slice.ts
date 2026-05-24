import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const CART_STORAGE_KEY = "sildel-cart";

export type CartItem = {
  slug: string;
  name: string;
  priceCents: number;
  image: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
  /** has the cart been hydrated from localStorage yet? prevents SSR flash */
  hydrated: boolean;
};

const initialState: CartState = {
  items: [],
  hydrated: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrate(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.hydrated = true;
    },
    addItem(
      state,
      action: PayloadAction<Omit<CartItem, "quantity"> & { quantity?: number }>
    ) {
      const { slug, name, priceCents, image, quantity = 1 } = action.payload;
      const existing = state.items.find((it) => it.slug === slug);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ slug, name, priceCents, image, quantity });
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ slug: string; quantity: number }>
    ) {
      const { slug, quantity } = action.payload;
      const item = state.items.find((it) => it.slug === slug);
      if (!item) return;
      if (quantity <= 0) {
        state.items = state.items.filter((it) => it.slug !== slug);
      } else {
        item.quantity = quantity;
      }
    },
    removeItem(state, action: PayloadAction<{ slug: string }>) {
      state.items = state.items.filter((it) => it.slug !== action.payload.slug);
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { hydrate, addItem, updateQuantity, removeItem, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

/* ───── Selectors */

import type { RootState } from "./index";

export const selectCartItems = (s: RootState) => s.cart.items;
export const selectCartHydrated = (s: RootState) => s.cart.hydrated;
export const selectCartCount = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartSubtotalCents = (s: RootState) =>
  s.cart.items.reduce((sum, i) => sum + i.priceCents * i.quantity, 0);
