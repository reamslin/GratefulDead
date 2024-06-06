/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
import React from "react";
import SetlistList from "./SetlistList";

function TIGDH() {
  const today = new Date();
  let month = (today.getMonth() + 1).toString();
  let day = today.getDate().toString();

  month = month.length === 1 ? "0" + month : month;
  day = day.length === 1 ? "0" + day : day;

  return <SetlistList today={{ month, day }} />;
}

export default TIGDH;
