import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "sildel-theme";

interface ThemeState {
  theme: Theme;
}

// Default theme is "dark" — matches the no-flash <script> in app/layout.tsx
// which applies the .dark class to <html> on first paint unless the user
// previously opted into light.
const initialState: ThemeState = { theme: "dark" };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === "light" ? "dark" : "light";
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
