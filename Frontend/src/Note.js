/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  listItem: {
    [theme.breakpoints.down("xs")]: {
      maxWidth: 290,
    },
    padding: 1,
  },
}));

function Note({ note }) {
  const transition =
    note.info &&
    (note.info[note.info.length - 1] === ">" ||
      note.info[note.info.length - 2] === ">")
      ? "  ->"
      : "";

  const classes = useStyles();

  return (
    <ListItem
      divider
      className={classes.listItem}
      button
      component={Link}
      to={`/setlists?song=${encodeURIComponent(note.song.title)}`}
    >
      <ListItemText
        className={classes.listItem}
        secondaryTypographyProps={{ variant: "subtitle2" }}
        primary={`${note.song.title}${transition}`}
        secondary={`${note.song.cover ? `Cover: ${note.song.cover}` : ""} ${
          note.with_artist ? `Performed with: ${note.with_artist}` : ""
        }`}
      ></ListItemText>
    </ListItem>
  );
}

export default Note;
