// src/theme/getTheme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f9f9f9", paper: "#fff" },
            text: { primary: "#000" },
          }
        : {
            background: { default: "#121212", paper: "#1e1e1e" },
            text: { primary: "#fff" },
          }),
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            transition: "background-color 400ms ease, color 400ms ease",
          },
        },
      },
    },
  });
