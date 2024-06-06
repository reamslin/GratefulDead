/*
 * Copyright (c) 2024 Lindsey Reams
 * The Grateful Deadabase is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License.
 * For details, see the accompanying LICENSE.txt file or visit:
 * http://creativecommons.org/licenses/by-nc-sa/4.0/
 */

import React from "react";
import { SwipeableDrawer, makeStyles, Typography } from "@material-ui/core";
import MusicPlayer from "./MusicPlayer";
import skeleton from "./skeleton.png";
import stealie from "./stealie.png";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";

const drawerWidth = 400;
const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    textAlign: "center",
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  musicPlayer: {
    width: "100%",
    margin: theme.spacing(2),
  },
  chevron: {
    position: "fixed",
    top: 0,
    [theme.breakpoints.up("md")]: {
      left: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("sm")]: {
      left: 0,
    },
  },
  skeleton: {
    width: "90%",
    marginTop: "10px",
  },
  stealie: {
    width: "50%",
    margin: theme.spacing(2),
  },
}));

function MusicPlayerDrawer({ music, toggle, musicOpen, container }) {
  const classes = useStyles();
  const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
  return (
    <SwipeableDrawer
      disableBackdropTransition={!iOS}
      disableDiscovery={iOS}
      transitionDuration={0}
      container={container}
      variant="temporary"
      anchor="right"
      open={musicOpen}
      onClose={toggle}
      classes={{
        paper: classes.drawerPaper,
      }}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <div>
        <IconButton
          color="inherit"
          aria-label="close drawer"
          onClick={toggle}
          className={classes.chevron}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>

        {!music ? (
          <div>
            <Typography variant="subtitle1">
              Click a recording to play some jams!
            </Typography>
            <img className={classes.skeleton} alt="skeleton" src={skeleton} />
          </div>
        ) : (
          <div>
            <Typography variant="h3">
              {music.month}-{music.day}-{music.year}
            </Typography>
            <img src={stealie} className={classes.stealie} alt="stealie" />

            <MusicPlayer id={music.recording.identifier} />
          </div>
        )}
      </div>
    </SwipeableDrawer>
  );
}

export default MusicPlayerDrawer;
