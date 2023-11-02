import { deepmerge } from "@mui/utils";

const sharedTheme = {
  palette: {},
  components: {},
}; // the reason for this casting is deepmerge return type

const themes = {
  light: deepmerge(sharedTheme, {
    palette: {
      mode: "light",
      background: {
        default: "#fafafa",
        paper: "#fff",
      },
      primary: {
        main: "#3f51b5",
      },
    },
  }),
  dark: deepmerge(sharedTheme, {
    palette: {
      mode: "dark",
      background: {
        default: "#111",
        paper: "#171717",
      },
      primary: {
        main: "#333",
      },
    },
  }),
};

export default themes;
