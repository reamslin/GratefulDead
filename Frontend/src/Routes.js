/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import SetlistList from "./SetlistList";
import SetlistDetail from "./SetlistDetail";
import TIGDH from "./TIGDH";

function Routes({ setMusic, openMusic }) {
  return (
    <Switch>
      <Route exact path="/">
        <TIGDH />
      </Route>
      <Route exact path="/setlists">
        <SetlistList />
      </Route>
      <Route path="/setlists/:id">
        <SetlistDetail setMusic={setMusic} openMusic={openMusic} />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
