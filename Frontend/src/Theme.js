/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
import { createTheme } from "@material-ui/core/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#00F",
    },
  },
  typography: {
    body1: {
      fontFamily: "Comic Sans",
    },
  },
  custom: {
    myOwnComponent: {
      margin: "10px 10px",
      backgroundColor: "lightgreen",
    },
  },
});

module.exports = theme;
