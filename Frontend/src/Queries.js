import React, { useState } from "react";
import {
    makeStyles,
    ListItem,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Chip,
    List,
    useTheme
} from "@material-ui/core";
import Query from "./Query";

const useStyles = makeStyles((theme) => ({
    menuOption: {
        width: '100%',
        '&$disabled': {
            backgroundColor: 'inherit',
        },
    },
    disabled: {},
    list: {
        width: '100%',
    },
    item: {
        padding: theme.spacing(0.5),
        paddingLeft: theme.spacing(2)
    },
    summary: {
        height: 50,
        padding: 0,
        display: 'flex',
        justifyContent: "center",
        textAlign: "center",
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: 'inherit'
    },
    chip: {

        marginTop: 0,
        marginBottom: 0
    },
    div: {
        display: "block"
    }

}))
function Queries({ filters, setFilters, queries, queryType, title }) {

    const classes = useStyles();
    const theme = useTheme();
    const [expanded, setExpanded] = useState(false);

    function handleDelete(key) {
        const { [key]: value, ...newFilters } = filters;
        setFilters(newFilters);
        setExpanded(false);
    }

    function handleChange() {
        if (!filters[queryType]) {
            setExpanded(!expanded)
        }
    }
    return (
        <ListItem divider classes={{ root: classes.item }} key={title}>
            <Accordion
                elevation={0}
                expanded={expanded}
                onChange={handleChange}
                disabled={!filters[queryType] ? false : true}
                transitionProps={{
                    timeout: 0
                }}
                classes={{ root: classes.menuOption, disabled: classes.disabled }}>
                <AccordionSummary
                    className={classes.summary}
                    aria-controls={`${title}-content`}
                    id={`${title}-header`}
                >
                    <Typography variant='h5'> {title} </Typography>

                </AccordionSummary>
                {!filters[queryType] ? <AccordionDetails>
                    <List className={classes.list}>
                        {queries[`${title.toLowerCase()}`].map(query => <Query queryType={queryType} query={query} key={query} setFilters={setFilters} setExpanded={setExpanded} />)}
                    </List>
                </AccordionDetails> :
                    <div style={{ marginLeft: theme.spacing(2), marginBottom: theme.spacing(1) }}>
                        <Chip
                            label={filters[queryType]}
                            onDelete={() => handleDelete(queryType)}
                            className={classes.chip} />
                    </div>}
            </Accordion>
        </ListItem>
    )
}

export default Queries;