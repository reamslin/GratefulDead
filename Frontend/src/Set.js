/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
import React from "react";
import Note from "./Note";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  list: {
    width: "90%",
  },
}));

function Set({ set }) {
  const classes = useStyles();
  return (
    <Accordion elevation={4}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography variant="h5">{set.name || `Setlist`}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List className={classes.list}>
          {set.notes.map((n) => (
            <Note note={n} key={n.id} />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}

export default Set;
