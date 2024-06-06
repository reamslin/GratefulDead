/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    paddingTop: "125%",
    backgroundColor: "black",
  },

  responsiveIframe: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
}));
function Recording({ id }) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {!id ? (
        <> </>
      ) : (
        <iframe
          key={id}
          src={`https://archive.org/embed/${id}&playlist=1&autoplay=1`}
          className={classes.responsiveIframe}
          width="300"
          height="30"
          frameBorder="0"
        ></iframe>
      )}
    </div>
  );
}

export default Recording;
