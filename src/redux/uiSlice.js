import { createSlice } from "@reduxjs/toolkit";

const savedTheme = typeof window !== "undefined" ? localStorage.getItem("theme") : null;

const initialState = {
  theme: savedTheme || "light",
  createDialogOpen: false,
  moreDialogOpen: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";
      if (typeof window !== "undefined") localStorage.setItem("theme", state.theme);
      console.log("uiSlice: theme is now", state.theme);
    },
    openCreateDialog: (state) => {
      state.createDialogOpen = true;
    },
    closeCreateDialog: (state) => {
      state.createDialogOpen = false;
    },
    openMoreDialog: (state) => {
      state.moreDialogOpen = true;
    },
    closeMoreDialog: (state) => {
      state.moreDialogOpen = false;
    },

  },
});

export const {
  toggleTheme,
  openCreateDialog,
  closeCreateDialog,
  openMoreDialog,
  closeMoreDialog,
} = uiSlice.actions;

export default uiSlice.reducer;