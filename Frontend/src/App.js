/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Nav";
import ScrollToTop from "./ScrollToTop";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@material-ui/core/styles";

function App() {
  const dark = {
    palette: {
      type: "dark",
      primary: {
        main: "#872b96",
        dark: "#6a1b9a",
        light: "#9d71d2",
      },
      secondary: {
        main: "#50ef8e",
        dark: "#78767A",
      },
    },
    typography: {
      fontFamily: "Arvo",
      h2: {
        fontFamily: "Tourney",
      },
    },
  };

  const light = {
    palette: {
      type: "light",
      primary: {
        main: "#872b96",
        dark: "#6a1b9a",
        light: "#9d71d2",
      },
      secondary: {
        main: "#50ef8e",
        dark: "#DEDCDF",
      },
    },
    typography: {
      fontFamily: "Arvo",
      h2: {
        fontFamily: "Tourney",
      },
    },
  };

  const [isLight, setIsLight] = useState(true);
  const appliedTheme = responsiveFontSizes(createTheme(isLight ? light : dark));
  function toggleTheme(isLight) {
    setIsLight(!isLight);
  }
  return (
    <div>
      <ThemeProvider theme={appliedTheme}>
        <BrowserRouter>
          <ScrollToTop />
          <Nav isLight={isLight} toggleTheme={toggleTheme}></Nav>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
