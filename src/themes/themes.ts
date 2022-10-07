import { createTheme } from "@mui/material/styles";

const THEME_OPTIONS = {
  palette: {
    type: "light",
    primary: {
      main: "#282D33"
    },
    secondary: {
      main: "#e73c78"
    }
  }
};

const appTheme = createTheme(THEME_OPTIONS);

export { appTheme };
