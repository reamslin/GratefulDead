/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Set from "./Set";
import GDApi from "./api";
import { Typography, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import RecordingAccordion from "./RecordingAccordion";
import stealie from "./gd.png";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    maxWidth: 800,
    padding: theme.spacing(1),
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(2),
    marginLeft: 0,
    marginRight: 0,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  bears: {
    marginTop: 20,
    marginBottom: 20,
    minWidth: 200,
  },
}));

function SetlistDetail({ setMusic, openMusic }) {
  const { id } = useParams();
  const classes = useStyles();

  const [setlist, setSetlist] = useState(null);

  useEffect(() => {
    async function getSetlistOnMount(id) {
      let setlist = await GDApi.getSetlistById(id);
      setSetlist(setlist);
    }

    getSetlistOnMount(id);
  }, []);

  return (
    <div className={classes.root}>
      {!setlist ? (
        <h1>Loading ... </h1>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="h2">
            {setlist.month}-{setlist.day}-{setlist.year}
          </Typography>
          <Typography variant="h4">{setlist.venue.name} </Typography>
          <Typography variant="h6">
            {" "}
            {setlist.venue.city}, {setlist.venue.state}{" "}
          </Typography>
          <img className={classes.bears} src={stealie} width="50%" />
          <div>
            {setlist.sets.map((s) => (
              <Set set={s} key={s.id} />
            ))}
            <RecordingAccordion
              recordings={setlist.recordings}
              setMusic={setMusic}
              openMusic={openMusic}
              setlistInfo={{
                month: setlist.month,
                day: setlist.day,
                year: setlist.year,
              }}
            />
          </div>
        </Paper>
      )}
    </div>
  );
}

export default SetlistDetail;
