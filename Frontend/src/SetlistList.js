/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { List, Paper, makeStyles, Typography, Box } from "@material-ui/core";
import SetlistListItem from "./SetlistListItem";
import GDApi from "./api";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    width: "100%",
    maxWidth: 800,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(2),
  },
  list: {
    padding: theme.spacing(2),
  },
}));

function SetlistList({ today }) {
  const classes = useStyles();
  let filters;
  let search = useLocation().search;
  if (today) {
    filters = {
      month: today.month,
      day: today.day,
    };
  } else {
    filters = Object.fromEntries(new URLSearchParams(search).entries());
  }

  let pageSize = 20;
  const [numPages, setNumPages] = useState(null);
  const [page, setPage] = useState(0);
  const [setlists, setSetlists] = useState(null);

  useEffect(() => {
    async function getNumPagesOnMount() {
      let numPages = await GDApi.getNumPages(filters);
      setNumPages((pages) => Math.ceil(numPages / pageSize));
      setPage(0);
    }
    getNumPagesOnMount();
  }, [search]);

  useEffect(() => {
    async function getSetlistsByFilter() {
      filters.limit = pageSize;
      filters.offset = pageSize * page;
      let setlists = await GDApi.getSetlistsByFilter(filters);
      setSetlists(setlists);
    }
    getSetlistsByFilter();
  }, [search, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage - 1);
  };

  return (
    <div className={classes.root}>
      {!setlists ? (
        <h1>Loading ...</h1>
      ) : (
        <Paper className={classes.paper}>
          <Typography variant="h3">
            {!today
              ? Object.values(filters).join("-")
              : "Today In Grateful Dead History"}
          </Typography>
          <List className={classes.list}>
            {setlists.map((s) => (
              <SetlistListItem setlist={s} />
            ))}
          </List>
          <Box justifyContent="center" display="flex">
            <Pagination
              count={numPages}
              page={page + 1}
              onChange={handleChangePage}
              width="100%"
            />
          </Box>
        </Paper>
      )}
    </div>
  );
}
export default SetlistList;
