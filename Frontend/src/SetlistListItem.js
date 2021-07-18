import React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemText, Typography, makeStyles, } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    link: {
        textDecoration: "none",
        color: theme.palette.text.primary,

    }
}))
function SetlistListItem({ setlist }) {
    const classes = useStyles();
    return (
        <ListItem divider button component={Link} to={`/setlists/${setlist.id}`}>
            <ListItemText className={classes.link}>
                <Typography variant='subtitle1'>
                    {setlist.month}-{setlist.day}-{setlist.year}: Live at {setlist.venue.name}

                </Typography>
            </ListItemText>
        </ListItem>
    )
}

export default SetlistListItem;