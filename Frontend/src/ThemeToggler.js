/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
import React from "react";
import Switch from "@material-ui/core/Switch";

export default function ThemeToggler({ isLight, toggleTheme }) {
  const handleChange = (event) => {
    toggleTheme(isLight);
  };

  return (
    <div>
      <Switch checked={!isLight} onChange={handleChange} />
    </div>
  );
}
