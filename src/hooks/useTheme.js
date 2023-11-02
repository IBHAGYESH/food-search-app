import { useEffect, useContext } from "react";
import { ThemeContext } from "../theme/Provider";

function useTheme() {
  const { theme, setTheme } = useContext(ThemeContext);

  function toggle() {
    setTheme((mode) => (mode === "dark" ? "light" : "dark"));
  }
  useEffect(() => {
    localStorage.setItem("theme-mode", theme);
  }, [theme]);

  return [theme, toggle];
}

export default useTheme;
