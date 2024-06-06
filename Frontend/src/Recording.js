/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import React from "react";
import { ListItem, makeStyles, Typography, Chip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: theme.spacing(1),
    marginRight: 0,
    marginBottom: 0,
    padding: "2px",
  },
  chipContainer: {
    width: "inherit",
    display: "flex",
    flexWrap: "wrap",
  },
}));

function parseSubject(subject) {
  let parsed = [];
  if (subject[0] === "{") {
    subject = subject.slice(1, subject.length - 1);
    let split = subject.split(",");
    parsed = split.map((s) => s.slice(1, s.length - 1));
  } else {
    parsed = [subject];
  }
  return parsed;
}

function getColor(subject) {
  if (subject.toLowerCase() === "soundboard") {
    return "primary";
  } else if (subject.toLowerCase() === "live concert") {
    return "secondary";
  } else {
    return "default";
  }
}

function Recording({ info, setMusic, openMusic }) {
  const classes = useStyles();
  const { subject } = info.recording;
  return (
    <ListItem
      divider
      button
      onClick={() => {
        setMusic(info);
        openMusic(true);
      }}
    >
      <Typography variant="subtitle1">Recording:</Typography>
      {subject ? (
        <div className={classes.chipContainer}>
          {parseSubject(subject).map((s) => (
            <Chip
              className={classes.chip}
              key={s}
              label={s}
              size="small"
              color={getColor(s)}
            />
          ))}
        </div>
      ) : (
        ""
      )}
    </ListItem>
  );
}

export default Recording;
