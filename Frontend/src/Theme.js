import { createTheme } from "@material-ui/core/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00F"
    }
  },
  typography: {
    body1: {
      fontFamily: "Comic Sans"
    }
  },
  custom: {
    myOwnComponent: {
      margin: "10px 10px",
      backgroundColor: "lightgreen"
    }
  }
});

module.exports = theme;