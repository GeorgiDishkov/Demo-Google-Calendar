import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      light: "#fff",
      main: "#fff",
      dark: "#fff",
      contrastText: "#000",
    },
    secondary: {
      light: "#039BE5",
      main: "#0364F9",
      dark: "#185ABC",
      contrastText: "#000",
    },
    background: {
      paper: "#fff",
      default: "#000",
    },
  },
  typography: {
    fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
    fontSize: 16,
    fontWeightLight: 200,
    fontWeightMedium: 400,
    fontWeightBold: 600,
  },
});

export default theme;
