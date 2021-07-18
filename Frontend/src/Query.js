import { ListItem, Typography, makeStyles, Button } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    listText: {
        color: theme.palette.text.secondary,
    },
    list: {
        width: 'inherit',
    }
}))

function Query({ queryType, query, setFilters, setExpanded }) {
    const classes = useStyles();
    function handleSelection() {
        setFilters(filters => ({ ...filters, [queryType]: query }));
        setExpanded(true)
    }
    return (
        <>
            <ListItem component={Button} onClick={handleSelection} className={classes.list} key={query}>
                <Typography noWrap className={classes.listText} variant='subtitle2'>{query}</Typography>
            </ListItem>
        </>
    )
}

export default Query;