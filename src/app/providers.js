"use client";
import React from "react";
import { Provider, useSelector } from "react-redux";
import { store } from "../redux/store";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "../theme/getTheme"; //  

// Sub-component to connect Redux theme with MUI
function MUIThemeProvider({ children }) {
  const themeMode = useSelector((state) => state.ui.theme); // light or dark from Redux
  console.log(themeMode)
  const theme = getTheme(themeMode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </Provider>
  );
}



// "use client";
// import { Provider } from "react-redux";
// import { store } from "../redux/store";

// export default function Providers({ children }) {
//    return <Provider store={store}>{children}</Provider>
// }