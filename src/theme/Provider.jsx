import React, { createContext, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const ThemeContext = createContext({});

import themes from "./themes";

function synchronizeWithLocalStorage() {
  const storedTheme = localStorage.getItem("theme-mode");
  if (storedTheme) {
    return storedTheme;
  }
  localStorage.setItem("theme-mode", "light");
  return "light";
}

function CustomThemeProvider({ children }) {
  const [theme, setTheme] = useState(synchronizeWithLocalStorage());

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={createTheme(themes[theme])}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default CustomThemeProvider;
